const mongoose = require('mongoose')

const Accountant = mongoose.model('accountant', {
    name: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required: true,
        unique: true

    },

    cost:{
        type:String,
        required: true

    },

    qualification: {
        type: String,
        required: true,
        },

    experience: {
        type: String,
        required : true
    },

    image:{
        type: String
    },

    number: {
        type: String,
        required : true
    },

    description: {
        type: String,
        required : true
    }

})

module.exports = Accountant