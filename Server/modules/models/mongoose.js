let mongoose = require('mongoose'),
    config = require('../../config/config'),
    chalk = require('chalk');

class Mongoose {
    constructor() {
        mongoose.Promise = config.promise;
    }

    connect() {
        return mongoose.connect(config.db.uri, config.db.options)
            .then(() => console.log(chalk.green('Connected with MongoDB!')))
            .catch(err => { 
                console.error(chalk.red('Could not connect to MongoDB!'));
                console.error(chalk.red(config.db.uri));
                console.log(err); 
            })
    }

    disconnect() {
        return mongoose.connection.close();
    }

    model(modelName) {
        return mongoose.model(modelName);
    }
}

module.exports = new Mongoose();