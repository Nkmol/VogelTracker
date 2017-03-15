'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let roleSchema = new Schema ({
    role: {
        type: String,
        required: true,
        unique: true
    }
})

mongoose.model('Role', roleSchema);