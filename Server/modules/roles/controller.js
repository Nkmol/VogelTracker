'use strict'

let mongoose = require('mongoose'),
    Role = mongoose.model('Role'),
    BaseController = require('../models/base_controller');

class RoleController extends BaseController {
    constructor() {
        super();
        this.Model = Role;
    }
};

module.exports = new RoleController();