'use strict';

/**
 * Module dependencies
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Bird Schema
 */
let birdSchema = new Schema({
  name: {
    type: String,
    required: 'A birdname is required',
    unique: true
  },
  latin_name: String,
  url: String,
  status: String, // TODO: Should be 'kind'?
  information: String, //TODO: Description
  trend_and_amount: String // TODO: history
});

mongoose.model('Bird', birdSchema);