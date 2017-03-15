'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let userSchema = new Schema ({
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    user_role: {
        type: Schema.Types.ObjectId, ref: 'Role'
    }
});

mongoose.model('User', userSchema);
