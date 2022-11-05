const mongoose = require("mongoose")

const formModel = mongoose.Schema({
    "username":{
        type:String,
        required: true,
    },
    "email":{
        type:String,
        required: true,
        unique:true,
    },
    "password":{
        type:String,
        required: true,
    },
    "phone_number":{
        type : Number,
        min: 10,
        unique: true,
    },
    "about_me":{
        type: String,
    }

});

var User = new mongoose.model('forms',formModel);

module.exports = User;