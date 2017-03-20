//RUN: npm run seed

let mongoose = require('./models/mongoose'),
    config = require('../config/config'),
    chalk = require('chalk')
    util = require('./utilities');

// Intro Message
console.log();
console.log(chalk.green("   [Loading seed script]   "));
console.log(chalk.green("---------------------------"));

// Connect mongoose
mongoose.connect().then(() => loadModels());

function loadModels() {
    // Load models
    console.log(chalk.green('Loading models...'));  
    return util.requireAll(config.models)
        .then(() => createPostDeployement())
        .catch(() => mongoose.disconnect()) // Finally close connection
        .then(() => mongoose.disconnect()) // Finally close connection
}

function createPostDeployement() {
    // Load seeds
    console.log(chalk.green('Loading seeds...'));  
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