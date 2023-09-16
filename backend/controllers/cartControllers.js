const { default: mongoose } = require("mongoose");
const User = require('../Models/User');

const addToWishlist =async (req, res)=>{
    const bookId = req.params.id;
    const userId = req.user;
    try{
        if(!mongoose.isValidObjectId(bookId)){
            throw new Error("Not a valid book id");
        }

        const user = await User.findById(req.user);
        if(user.wishlist.find((id)=> id.toString() === bookId)){
            let user1 = await User.findByIdAndUpdate(userId , {
                $pull : {wishlist : bookId}
            })
            return res.status(200).json(user1);
            
        } else {
            let user2  = await User.findByIdAndUpdate(userId, {
                $push : {wishlist : bookId}
            })
            return res.status(200).json(user2);
        }

    } catch(e){
        res.status(400).json({
            msg: e.message
        })
    }

}


const getWishlist = async (req, res)=>{
    const userId = req.user;
    try{
        const wishlist = await User.findById(userId).populate({
            path: 'wishlist',
        }).select('wishlist');
        
        return res.status(200).json(wishlist);
    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
}

const getCart = async(req, res)=>{
    const userId = req.user;
    try{
        const cart = await User.findById(userId).populate({
            path:'cart.book'
        }).select('cart');

        return res.status(200).json(cart);
    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
}

const addToCart = async(req,res)=>{
    const userId = req.user;
    const bookId = req.params.id;
    const qty = req.params.qty;
    try{
        const cart = await User.findByIdAndUpdate(userId, {
            $push:{ cart:{book:bookId, qty:qty}}    
        })
        return res.status(200).json(cart);
    } catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }

}

const removeFromCart = async(req, res)=>{
    const userId = req.user;
    const bookId = req.params.id;
    try{
        const cart = await User.findByIdAndUpdate(userId, {
            $pull:{cart:{book:bookId}}
        })
        return res.status(200).json(cart);
    }catch(e){
        return res.status(400).json({
            msg:e.message
        })
    }
}

module.exports = { addToWishlist, getWishlist, getCart, addToCart, removeFromCart }