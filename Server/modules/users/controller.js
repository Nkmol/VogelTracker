'use strict'

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    BaseController = require('../models/base_controller');

class UserController extends BaseController {
    constructor() {
        super();
        this.Model = User;
    }
};

module.exports = new UserController();