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
  information: {type: String, validate: [textvalidator, 'Description should be longer than 5 characters'] },  //TODO: Description
  trend_and_amount: String // TODO: history
});

function textvalidator (v) {
  return v.length > 5;
};

mongoose.model('Bird', birdSchema);

