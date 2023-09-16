const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    role:{
        type : String ,
        enum:["ADMIN", "USER", "SELLER"],
        default:"USER"
    },
    wishlist:[{type: mongoose.Schema.Types.ObjectId, ref:"Book"}],
    cart:[{
        book:{type: mongoose.Schema.Types.ObjectId, ref:"Book"},
        qty: {type: Number}
    }]
})

userSchema.statics.signup = async function(body){
    const email = body.email
    const password = body.password

    if(!email || !password){
        throw Error('Please fill in all the details');
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter valid email');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please use Stronger Password')
    }

    const exists = await this.findOne({email});
    if(exists){
        throw Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({
        email,password:hash,
        lastname:body.lastname,
        firstname:body.firstname,
        mobile : body.mobile,
    })
    return user;    
}

//static method for user login
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('Please fill in all the details');
    }
    
    const user = await this.findOne({email});

    if(!user){
        throw Error("user doesn't exist")
    }

    const match = await bcrypt.compare(password,user.password);

    if(!match){
        throw Error('Incorrect password');
    }

    return user;
}

module.exports = mongoose.model('User',userSchema);