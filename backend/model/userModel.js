const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'email is a must!']
    },
    lastName:{
        type:String,
        required: [true, 'email is a must!']
    },
    email: {
        type: String,
        required: [true, 'email is a must!'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'Password is a must!']
    },
    confirmed:{
        type:Boolean,
        required:[true, "Confirmation is must"]
    }

})

module.exports = mongoose.model("c2cusers", userSchema)