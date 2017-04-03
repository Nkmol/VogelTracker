let userController = require('./controller'),
    roleController = require('../roles/controller');

// Export the promise so we can catch it with the require()
module.exports = userController.remove({})
    .then(() => roleController.findOne({role: 'admin'}))
    .then(res => userController.create({
            username: 'test',
            password: 'test',
            email: "s.mol@avans.nl",
            user_role: res._id
        })
    )