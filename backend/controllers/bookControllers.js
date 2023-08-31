const Book = require('../Models/Book');
const User = require('../Models/User');
const mongoose = require('mongoose');

const getBooks = async (req,res)=>{
    const books = await Book.find({}).sort({createdAt:-1});
    res.status(200).json(books);
}

const getBookById = async (req,res)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId(id)){
        return res.status(400).json({error:"Not found the book"})
    }
    try{
        const book = await Book.find({_id:id});
        res.status(200).json(book);
    } catch(e) {
        res.status(400).json({error:'Not found the book'});
    }
}


const postBook = async(req,res)=>{
    try{
    const body = req.body;
    const role = await User.findById(req.user).select('role');
    if(role.role !== 'ADMIN'){
        throw new Error('Not allowed');
    }
    const {title,author,publisher,genre,price,description,numOfPages,inStock,thumbnail} = body;
    const book = await Book.create({title,author,publisher,genre,description,numOfPages,price,inStock,thumbnail});
    res.status(200).json(book);
    } catch(e){
        res.status(400).json({error:e.message})
    }
    

}

const deleteBook = async(req,res)=>{
    const id = req.params.id;
    try{
        const role = await User.findById(req.user).select('role');
        if(role.role !== 'ADMIN'){
            throw new Error('Not allowed');
        }
        if(!mongoose.Types.ObjectId(id)){
            return res.status(400).json({error:"Not found the book"})
        }
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            throw new Error('Book Not fount');
        }
        res.status(200).json(book);   
    } catch(e){
        res.status(400).json({
            msg: e.message
        })
    }
    
}

const updateBook = async (req,res)=>{
    const id = req.params.id;
    try{
        const role = await User.findById(req.user).select('role');
        if(role.role !== 'ADMIN'){
            throw new Error('Not allowed');
        }
        if(!mongoose.Types.ObjectId(id)){
            return res.status(400).json({error:"Not found the book"})
        }
        const book = await Book.findOneAndUpdate({_id:id},{...req.body});
        if(!book){
            throw new Error('Book Not fount');
        }
        res.status(200).json(book);
    } catch(e){
        res.status(400).json({
            msg:e.message
        })
    }   


}





module.exports = {
    getBooks,
    getBookById,
    postBook,
    deleteBook,
    updateBook,
}