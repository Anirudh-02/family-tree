const mongoose = require('mongoose')

const familySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    spouse: {
        type: String,
    },
    location: {
        type: String
    },
    birth_year: {
        type: Number
    },
    address: {
        type: String
    },
    image: {
        type: String
    },
    parent: {
        type: mongoose.Types.ObjectId,
        default: null
    }
})

module.exports =  mongoose.model('Family', familySchema)