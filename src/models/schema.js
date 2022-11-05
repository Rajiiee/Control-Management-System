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
    }
});

var User = new mongoose.model('forms',formModel);

module.exports = User;