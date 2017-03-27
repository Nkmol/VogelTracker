'use strict'

let mongoose = require('mongoose'),
    Bird = mongoose.model('Bird'),
    BaseController = require('../models/base_controller');

class BirdController extends BaseController {
    constructor() {
        super();
        this.Model = Bird;
    }
    
    get(req, res, next) {
        return this.Model.find().exec()
            .then(doc => res.json(doc));
    }
};

module.exports = new BirdController();