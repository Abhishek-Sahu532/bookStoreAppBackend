const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required : true
    },
    genre:{
        type: String,
        required: true

    },
    dateOfRelease:{
        type: String,
        required: true
    },
    bookImage:{
        type: String
    },
    rating:{
        type: Number,
        required: true
    },
    price:{
        type : Number,
        required: true
    }
})


module.exports = mongoose.model('storeSchema', storeSchema)