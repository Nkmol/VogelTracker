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
    .get(controller.get.bind(controller))

/**
     * @api {get} /birds/:id Request Bird
     * @apiName GetBird
     * @apiGroup Bird
     *
     *
     * @apiParam (body) {ObjectId} id bird ID `match(/^[0-9a-fA-F]{24}$/)`
     * 
     * @apiError {text} 400/BadRequest Please provide a valid '_id'
     * 
     * @apiuse JwtHeader
     * @apiUse BirdModel
     */
router.route('/:_id')
        .get(controller.get.bind(controller))
        .delete(controller.delete.bind(controller))
        .put(controller.put.bind(controller))
        .patch(controller.patch.bind(controller))

module.exports = router;