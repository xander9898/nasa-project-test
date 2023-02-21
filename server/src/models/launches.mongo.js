const mongoose = require('mongoose');

const launchesSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    customers: {
        type: [String],
    },
    target: {
        type: String,
        required: false,
    },
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
        default: true,
    }

})

// First Argument should always be single name
// mongo will lowercased it and pluralise it
module.exports = mongoose.model('Launch', launchesSchema);