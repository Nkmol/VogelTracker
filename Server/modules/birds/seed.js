let birdController = require('./controller');

birdController.remove({}) // removeAll
    .then(() =>
        birdController.create({
            name: 'test bird',
            latin_name: 'birdia'
        })
    );