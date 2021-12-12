const mongoose = require('mongoose');
const Accountant = require('./AccountantModel')


const Book = mongoose.model('Book', {

    accountantId: {
        type: String,
        ref: Accountant,

    },

    userId: {
        type: String

    },

    bookDays: {
        type: Number,
        default: 1
    },

    accountantCost: {
        type: Number
    }

})

module.exports = Book