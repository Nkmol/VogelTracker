let birdController = require('./controller');

// Export the promise so we can catch it with the require()
module.exports = birdController.remove({}) 
    .then(() => birdController.create({
            name: 'test bird',
            latin_name: 'birdia'
        })
    );