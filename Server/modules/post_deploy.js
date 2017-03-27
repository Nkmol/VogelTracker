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

    // Make seeds chainable so we can establish dependencies with files
    let loadSeed = model => util.requireAll(`./modules/${model}/**/seed.js`);
    return loadSeed('roles')
        .then(() => loadSeed('users'))
        .then(() => loadSeed('birds'))
        .then(() => loadSeed('reports'))
        .then(() => console.log(chalk.green('Completed PostDeployement seeds!')))
        .catch(err => console.error(chalk.red(`Something went wrong loading the seeds: ${err}`)))
}