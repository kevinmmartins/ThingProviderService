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
    }],
    value: {
        type: Object,
        trim: true
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    method: {
        type: String,
        enum: ['GET', 'PUT'],
        default: 'GET'
    }
});

module.exports = mongoose.model('Service-Route', schema);