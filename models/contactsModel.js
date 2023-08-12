const mongoose = require('mongoose');

/* create a mongoose schema */

const contactSchema = mongoose.Schema({
    user_id:{
        type :mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    username:{
        type :String,
        required:[true,"Please provide a Name"]
        // we can simply say required:true but if we use required:[true,"message"] here the message will be displayed when user does not provide the field
    },
    email:{
        type:String,
        required:[true,"Please provide a email address"]
    },
    phone :{
        type:String,
        required:[true,"Please provide a contact no."]
    }
},
{
    timestamps : true
});


/*
mongoose.model function creates a COLLECTION of a particular database of MongoDB it takes in two argument 
1st : collection name
2nd : schema of the collection 
*/ 

module.exports = mongoose.model('contact',contactSchema);