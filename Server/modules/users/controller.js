'use strict'

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    BaseController = require('../models/base_controller'),
    config = require('../../config/config');

class UserController extends BaseController {


    constructor() {
        super();
        this.Model = User;
    }

    login(req, res, next) {
        if(!(req.body.username && req.body.password))
            return res.status(400).json({message: "Please provide 'username' and 'password'"});

        return this.Model.findOne({username: req.body.username, password: req.body.password})
            .then(doc => {
                if(!doc)
                    return res.status(401).json({message: "Password and/or username did not match"});

                if(doc.password === req.body.password) {
                    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                    var payload = {_id: doc._id};
                    var token = require('jsonwebtoken').sign(payload, config.jwt.options.secretOrKey);
                    return res.json({message: "ok", token: token});
                }
            });
    }

    // JWT validation
    validate(jwt_payload, done) {
        this.Model.find({_id: jwt_payload._id})
            .then(doc => {
                if(doc)
                    return done(null, {id: jwt_payload.id});
                else 
                    return done(null, false);
            })
    }
};

module.exports = new UserController();