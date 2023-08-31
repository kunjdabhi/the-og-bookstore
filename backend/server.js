
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const libRouter = require('./routes/libRoutes');
const userRouter = require('./routes/userRoutes');
// const cartRouter = require('./routes/cartRoutes');
const cartRouter = require('./routes/cartRoutes');

app.use(express.json());

mongoose.connect(process.env.DB_URI,()=>{
    console.log('connected to db');
    app.listen(process.env.PORT,()=>{
        console.log('listening on '+ process.env.PORT);
    })
})

app.use('/api/books/',libRouter);   
app.use('/api/user/',userRouter);
app.use('/api/',cartRouter)
