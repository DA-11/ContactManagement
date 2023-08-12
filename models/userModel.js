const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'Provide a username'],
    },
    email:{
        type:String,
        required:[true,'Provide a email address'],
        unique:[true,'Unique email address needed']
    },
    password:{
        type:String,
        required:[true,"Please provide a password, :) don't worry we don't read your passwords"]
    }
},{
    timestamps:true
});

module.exports = mongoose.model('User',userSchema);