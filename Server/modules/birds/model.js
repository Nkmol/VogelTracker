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
  avg_size: {
    type: Number,
    default: ''
  },
  food: {
      type: [String]
  },
  where: {
      type: [String]
  }
});

mongoose.model('Bird', birdSchema);