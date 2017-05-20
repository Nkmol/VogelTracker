let mongoose = require('../modules/models/mongoose'),
    chalk = require('chalk'),
    config = require('./config'),
    express = require('express'),
    util = require('../modules/utilities'),
    path = require('path'),
    JwtStrategy = require('passport-jwt').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    passport = require('passport');

module.exports.start = () => {
    // Connect mongoose
    mongoose.connect()
        .then(() => {
            // Load models
            console.log(chalk.green('Loading models...'));
            return util.requireAll(config.models);
        })
        .then(() => {
            console.log(chalk.green('Setup routers...'));
            // Setup listening
            let app = express();
            let unless = (paths, middleware) => 
                (req, res, next) => 
                    // Skip Authentication on OPTIONS for angularjs, it is used as preflight
                    paths.indexOf(req.path) > -1|| req.method === 'OPTIONS'
                        ? next() 
                        : middleware(req, res, next);

            // Add headers
            app.use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization');

                next();
            })

            // Setup express middleware
            let bodyParser = require('body-parser') 
            app.use(bodyParser.json());       // to support JSON-encoded bodies
            app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
                extended: true
            })); 
      
            app.use(express.static('doc')); // Set doc map as default folder to look for index

            // Setup Authentication
            let loginController = require('../modules/users/controller');
            passport.use(new JwtStrategy(config.jwt.options, loginController.validate.bind(loginController)))
                     
            passport.use(new GitHubStrategy(config.github.options,
            function(accessToken, refreshToken, profile, cb) {
                User.findOrCreate({ githubId: profile.id }, function (err, user) {
                return cb(err, user);
                });
            }
            ));

            passport.serializeUser(function(user, done) {
            // placeholder for custom user serialization
            // null is for errors
            done(null, user);
            });

            passport.deserializeUser(function(user, done) {
            // placeholder for custom user deserialization.
            // maybe you are going to get the user from mongo by id?
            // null is for errors
            done(null, user);
            });
            
            app.use(passport.initialize())  
            // Skip authentication of certain routes
            app.use(unless([
                "/login", 
                "/register",
                "/auth/github"
            ], passport.authenticate('jwt', {session: false})));

            app.post("/login", loginController.login.bind(loginController));
            app.post("/register", loginController.registrate.bind(loginController));

            app.use('/birds', require('../modules/birds/router'));
            app.use('/users', require('../modules/users/router'));
            app.use('/reports', require('../modules/reports/router'));

            app.get('/auth/github', passport.authenticate('github'),
            function(req, res){});

            app.get('/auth/github/callback', 
            passport.authenticate('github', { failureRedirect: '/' }),
            function(req, res) {
                // Successful authentication, redirect home.
                console.log("success");
                res.redirect('/');
            });

            app.get('*', (req, res) => res.send('Sorry, this is an invalid URL.'));

            // set the port of our application
            // process.env.PORT lets the port be set by Heroku
            let port = process.env.PORT || config.port;
            app.listen(port, () => {
                console.log(chalk.green(`App is listening on port ${config.port}`))
            })
        });
}