let mongoose = require('../modules/models/mongoose'),
    chalk = require('chalk'),
    config = require('./config'),
    express = require('express'),
    util = require('../modules/utilities');

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

            // Setup express middleware
            let bodyParser = require('body-parser') 
            app.use(bodyParser.json());       // to support JSON-encoded bodies
            app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
                extended: true
            })); 
            
            let loginController = require('../modules/users/controller'),
                jwtpassport = new (require('../modules/models/password-jwt'))(loginController.validate.bind(loginController));

            app.use(jwtpassport.initialize())  

            app.post("/login", loginController.login.bind(loginController));

            // Authenticate on all routes
            app.all('*', jwtpassport.authenticate());

            app.use('/birds', require('../modules/birds/router'));
            app.use('/users', require('../modules/users/router'));

            app.get('*', (req, res) => res.send('Sorry, this is an invalid URL.'));

            // set the port of our application
            // process.env.PORT lets the port be set by Heroku
            let port = process.env.PORT || config.port;
            app.listen(port, () => {
                console.log(chalk.green(`App is listening on port ${config.port}`))
            })
        });
}