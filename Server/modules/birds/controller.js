'use strict'

let mongoose = require('mongoose'),
    Bird = mongoose.model('Bird'),
    BaseController = require('../models/base_controller');

class BirdController extends BaseController {
    constructor() {
        super();
        this.Model = Bird;
    }
};

module.exports = new BirdController();