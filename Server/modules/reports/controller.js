'use strict'

let mongoose = require('mongoose'),
    Report = mongoose.model('Report'),
    BaseController = require('../models/base_controller');

class ReportController extends BaseController {
    constructor() {
        super();
        this.Model = Report;
    }
};

module.exports = new ReportController();