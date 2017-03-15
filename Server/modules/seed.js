//RUN: npm run-script seed

let mongoose = require('mongoose'),
    config = require('../config/config'),
    chalk = require('chalk')
    glob = require('glob');

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

        createPostDeployement();
        mongoose.connection.close();
    }
});

function createPostDeployement() {
    let Bird = mongoose.model('Bird');

    let bird = new Bird;
    bird.name = "test bird";
    bird.latin_name = "birdia";
    bird.save();

    console.log(chalk.green('Completed PostDeployement seeds!'));
}