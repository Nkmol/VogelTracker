'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
let birdSchema = new Schema({
  name: {
    type: String,
    required: 'A birdname is required',
    unique: true
  },
  latin_name: String
});

mongoose.model('Bird', birdSchema);