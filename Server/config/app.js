let mongoose = require('mongoose'),
    chalk = require('chalk'),
    config = require('./config'),
    express = require('express'),
    glob = require('glob');

module.exports.start = () => {
    // Connect mongoose
    mongoose.Promise = config.promise;
    mongoose.connect(config.db.uri, config.db.options).then(
        () => { console.log(chalk.green('Connected with MongoDB!'))},
        err => {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.error(chalk.red(config.db.uri));
            console.log(err);
        }
    );

    // Load models
    glob(config.models, {relative: true}, (err, files) => {
        if(err) {
            console.error(chalk.red("Something went wrong when loading models: " + config.models));
            console.log(err);
        } else {
            files.forEach(x => {
                let relPath = '../' + x;
                require(relPath);

                console.log(chalk.green('   Loaded ' + x));
            });
            console.log(chalk.green('Loaded all models!'));
        }
    });

    // Setup listening
    let app = express();

    // set the port of our application
    // process.env.PORT lets the port be set by Heroku
    let port = process.env.PORT || config.port;
    app.listen(port, config.host, () => {
        console.log(chalk.green(`App is listening on port ${config.port}`))
    })
}