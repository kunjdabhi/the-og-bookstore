const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    publisher:{
        type: String,
        required: true,
    },
    genre:{
        type:String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    numOfPages:{
        type: Number,
    },
    inStock:{
        type: String,
        required:true,
    },
    thumbnail:{
        type: String,
        required:true,
        
    },
    price:{
        type: Number,
        required:true,
    }
},{timestamps:true})

module.exports = mongoose.model('Book',bookSchema);