const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const signupSchema = new Schema({
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
        unique: true,
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

const UserSignup = mongoose.model('user_signup_info', signupSchema);
module.exports = UserSignup;

