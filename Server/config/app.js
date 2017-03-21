let mongoose = require('../modules/models/mongoose'),
    chalk = require('chalk'),
    config = require('./config'),
    express = require('express'),
    util = require('../modules/utilities')

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

            app.use('/birds', require('../modules/birds/router'))

            app.get('*', (req, res)=> res.send('Sorry, this is an invalid URL.'));

            // set the port of our application
            // process.env.PORT lets the port be set by Heroku
            let port = process.env.PORT || config.port;
            app.listen(port, config.host, () => {
                console.log(chalk.green(`App is listening on port ${config.port}`))
            })
        });
}