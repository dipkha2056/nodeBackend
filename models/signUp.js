const mongoose = require('mongoose')

const SignUp = mongoose.model('signUp', {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    userName: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    profileImage:{
        type:String,
        default:"1618564139910thankyou.jpg"
    },

    loginfrom: {
        type: String,
        required: true,
        enum: ['Client', 'Accountant'],
        default: "Client"
    }
})

module.exports = SignUp