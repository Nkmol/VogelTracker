let birdController = require('../controller'),
    chalk = require('chalk');

// Export the promise so we can catch it with the require()
module.exports = birdController.remove({}) 
    .then(() => { 
        let data = require('./bird_data.json');

        return birdController.Model.collection.insertMany(data)
    })
    .then(res => console.log(chalk.blue(`Inserted ${res.insertedCount} Bird(s)`)));