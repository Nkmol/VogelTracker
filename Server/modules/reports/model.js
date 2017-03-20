'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let reportSchema = new Schema ({
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    bird_id: {
        type: Schema.Types.ObjectId, ref: 'Bird',
        required: true
    },
    submitter: String,
    description: {
        type: String,
        required: true
    },
    image: [String],
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    }    
});

mongoose.model('Report', reportSchema);