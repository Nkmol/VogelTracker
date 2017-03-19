'use strict'

let mongoose = require('mongoose'),
    Bird = mongoose.model('Bird'),
    chalk = require('chalk');

exports.create = body => {
    var bird = new Bird(body);

    return bird.save()
        .then(console.log(chalk.blue(`Saved bird ${bird.name}`)))
        .catch(err => {
            console.error(chalk.red('Something went wrong saving a Bird'));
            console.error(err); 
        });
}

exports.remove = conditions => {
    return Bird.remove(conditions)
        .then(removed => console.log(chalk.blue(`Removed ${removed} birds`)))
        .catch(err => {
            console.error(chalk.red('Something went wrong removing Bird(s)'));
            console.error(err); 
        })
}