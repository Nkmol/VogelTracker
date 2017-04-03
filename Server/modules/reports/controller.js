'use strict'

let mongoose = require('mongoose'),
    Report = mongoose.model('Report'),
    BaseController = require('../models/base_controller');

class ReportController extends BaseController {
    constructor() {
        super();
        this.Model = Report;
    }

    create(req, res, next) {

        if(!(req.body.bird_id && req.body.description && req.body.lat && req.body.long && req.body.user_id && req.body.date))
            return res.status(400).json({message: "Please provide the right info"});

            return super.create(req.body)
                .then(doc => this.populate(doc, {path: "bird_id"}))
                .then(doc => this.populate(doc, {path: "user_id"}))
                .then(doc => res.json({message: "ok"}));
    }
};

module.exports = new ReportController();