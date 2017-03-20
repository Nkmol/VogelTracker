let mongoose = require('../modules/models/mongoose'),
    chalk = require('chalk'),
    config = require('./config'),
    express = require('express');

module.exports.start = () => {
    // Connect mongoose
    mongoose.connect();

    // Setup listening
    let app = express();

    // set the port of our application
    // process.env.PORT lets the port be set by Heroku
    let port = process.env.PORT || config.port;
    app.listen(port, config.host, () => {
        console.log(chalk.green(`App is listening on port ${config.port}`))
    })
}