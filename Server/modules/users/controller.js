'use strict'

let mongoose = require('mongoose'),
    User = mongoose.model('User'),
    BaseController = require('../models/base_controller'),
    config = require('../../config/config'),
    bcrypt = require('../models/bcrypt');

class UserController extends BaseController {
    constructor() {
        super();
        this.Model = User;
    }

    registrate(req, res, next) {
        if(!(req.body.username && req.body.password && req.body.email))
            return res.status(400).json({message: "Please provide 'username', 'password' and 'email'"});

        // check email exists
        return this.exists({email: req.body.email})
        .then(exists => {
            let msg = "An account has already been registrated to this mailadress.";
            return this.errorResponse(msg, res, 409, exists)
        })
        // Check username exists
        .then(() => this.exists({username: req.body.username}))
        .then(exists => {
            let msg = "This username is already in use.";
            return this.errorResponse(msg, res, 409, exists)
        })
        // Async hasing
        .then(() => bcrypt.hash(req.body.password))
        .then(result => { 
            req.body.password = result;

            // Populate "user_role" to translate _id to actual object
            return this.create(req.body).then(doc => this.populate(doc, {path: "user_role"}))
                .then(doc => res.json({message: "ok"}));
        })
        // Supress "UnhandledPromiseRejectionWarning" of Node
        .catch(() => {})
    }

    login(req, res, next) {
        if(!(req.body.username && req.body.password))
            return res.status(400).json({message: "Please provide 'username' and 'password'"});

        return this.Model.findOne({username: req.body.username})
            .then(doc => {
                let msg = "Password and/or username did not match";
                return this.errorResponse(msg, res, 401, !doc)
                    .then(() => doc); // return 'doc' to next chain
            })
            .then(doc => {
                return bcrypt.compare(req.body.password, doc.password)
                    .then(result => {
                        if(result) {
                            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
                            var payload = {_id: doc._id};
                            var token = require('jsonwebtoken').sign(payload, config.jwt.options.secretOrKey);
                            return res.json({message: "ok", token: token});
                        }
                        else 
                            return this.errorResponse("Password and/or username did not match", res, 401)
                    })
            })
            // Supress "UnhandledPromiseRejectionWarning" of Node
            .catch(() => {})
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