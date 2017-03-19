//RUN: npm run-script seed

let mongoose = require('mongoose'),
    config = require('../config/config'),
    chalk = require('chalk')
    util = require('./utilities');

// Intro Message
console.log();
console.log(chalk.green("   [Loading seed script]   "));
console.log(chalk.green("---------------------------"));

// Connect mongoose
mongoose.Promise = config.promise;
mongoose.connect(config.db.uri, config.db.options).then(
    () => { 
        console.log(chalk.green('Connected with MongoDB!'));  
        loadModels();
    },
    err => {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.error(chalk.red(config.db.uri));
        console.log(err);
    }
);

function loadModels() {
    // Load models
    return util.requireAll(config.models)
        .then(() => createPostDeployement())
        .catch(() => mongoose.connection.close()) // Finally close connection
        .then(() => mongoose.connection.close()) // Finally close connection
}

function createPostDeployement() {
    // Load seeds
    return util.requireAll(config.seeds)
        .then(() => console.log(chalk.green('Completed PostDeployement seeds!')))

    let Bird = mongoose.model('Bird');
    let User = mongoose.model('User');
    let Role = mongoose.model('Role');

    // let role  = new Role;
    // role.role = 'admin';
    // role.save();

    let user = new User;
    user.username = "user";
    user.password = "test123";
    user.email = "jwitwit@avans.nl";
    user.user_role = '58c912770bafbc13ec0da5f9';
    user.save();
}