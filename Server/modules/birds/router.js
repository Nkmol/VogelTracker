let express = require('express'), 
    router = express.Router(),
    birdController = require('./controller');

let mongoose = require('mongoose');
let Bird = mongoose.model('Bird');

router.route('/')
    .get(birdController.get.bind(birdController));

module.exports = router;