'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    endpoints: [{
        type: String,
        required: true,
        trim: true,
        unique: true,
    }],
    value: {
        type: Object,
        trim: true
    },
    lastUpdate: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Service-Route', schema);