let router = require('express').Router(),
    controller = require('./controller');

router.route('/')
    /**
     * @apiDefine BirdModel
     * 
     * @apiSuccess {Object[]} - array of Birds
     * @apiSuccess {String} -.name name of the Bird.
     * @apiSuccess {String} -.latinname latin_name of the Bird.
     * @apiSuccess {String} -.information some information about the bird
     * @apiSuccess {String} -.trend_and_amount trends and history about the bird.
     */


    /**
     * @api {get} /birds/ Request Bird Collecton
     * @apiName GetBirds
     * @apiGroup Bird
     *
     *
     * @apiuse JwtHeader
     * @apiUse BirdModel
     */
    .get(controller.get.bind(controller));

module.exports = router;