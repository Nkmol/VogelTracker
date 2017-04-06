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

        mongoose.model('User').find({username: req.body.user_id})
            .then(userDoc => req.body.user_id = doc._id)
            .then(super.create(req.body))
            .then(reportDoc => this.populate(doc, {path: "bird_id"}))
            .then(reportDoc => this.populate(doc, {path: "user_id"}))
            .then(reportDoc => res.json({message: "ok", data: doc}));
    }

    get(req, res, next) {
        return super.get(req, res, next, [{path: "user_id"}, {path: "bird_id"}]);
    }
};

module.exports = new ReportController();