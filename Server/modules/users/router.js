let router = require('express').Router(),
    controller = require('./controller');

/**
 * app.post("/login", loginController.login.bind(loginController));
 * app.post("/register", loginController.registrate.bind(loginController));
 */


/**
 * @api {post} /login/ Request JWT Token
 * @apiName Validation
 * @apiGroup User
 *
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * 
 * @apiParam {String} username username login
 * @apiParam {String} password password login
 * 
 * @apiError {text} 400/BadRequest Please provide 'username' and 'password'
 * @apiError {text} 401/Unauthorized Password and/or username did not match
 * 
 * @apiSuccess {JSON} - JSON wrapper
 * @apiSuccess {text} -.message "ok"
 * @apiSuccess {text} -.token JWT token
 * 
 */

/**
 * @api {post} /register/ Create a User
 * @apiName Register
 * @apiGroup User
 *
 * @apiHeader Content-Type application/x-www-form-urlencoded
 * 
 * @apiParam {String} username username login
 * @apiParam {String} password password login
 * @apiParam {String} email emailadress for you account
 * 
 * @apiError {text} 400/BadRequest Please provide 'username', 'password' and 'email'
 * @apiError {text} 409/Conflict An account has already been registrated to this mailadress.
 * @apiError {text} 409/Conflict This username is already in use.
 * 
 * @apiSuccess {JSON} - JSON wrapper
 * @apiSuccess {text} -.message "ok"
 */

module.exports = router;