let router = require('express').Router(),
    controller = require('./controller');


router.route('/')

    /**
     * @api {post} /create/ Create a Report
     * @apiName CreateReport
     * @apiGroup Report
     *
     * @apiHeader Content-Type application/x-www-form-urlencoded
     * 
     * @apiParam {String} bird_id lat long user_id date
     * 
     * @apiError {text} 400/BadRequest Please provide 'proper report info'
     * 
     * @apiSuccess {JSON} - JSON wrapper
     * @apiSuccess {text} -.message "ok"
     * 
     */
    .post(controller.create.bind(controller))
    .get(controller.get.bind(controller))





module.exports = router;