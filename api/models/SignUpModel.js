const mongoose = require("mongoose");

const SignupSchema = new mongoose.Schema({
    fullName: {
        required: true,
        type: String
    },
    userName: {
        required: true,
        type:String
    },
    email: {
        required: true,
        type: String
    },
    userType: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    joined: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('usersignup', SignupSchema);;

