const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./router/app')

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = 4000;
const DATABASE_URL =`mongodb+srv://asahu532:abhishek1@cluster0.g7tlyoi.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection;
db.on('err',(err)=>{console.log(err)});
db.once('open',()=>{console.log('Connected to the database')})



app.listen(PORT,()=>{
    console.log('App is running on port ', PORT)
})

app.use(router)