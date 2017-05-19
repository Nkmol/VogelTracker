let reportController = require('./controller'),
    userController = require('../users/controller'),
    birdController = require('../birds/controller');

// Export the promise so we can catch it with the require()
module.exports = reportController.remove({})
    .then(() => Promise.all([
            userController.findOne({username: 'test'}),
            birdController.findOne({name: 'Alk'}) 
        ]
    ))
    .then(res => reportController.create({
            user_id: res[0]._id,
            bird_id: res[1]._id,
            // submitter
            description: "Toevallig gezien opzoek naar iets anders",
            image: ['sample.jpg'],
            lat: 51.697816,
            long: 5.303675,
            date: Date.now()
        })
    );