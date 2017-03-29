let userController = require('./controller');

// Export the promise so we can catch it with the require()
module.exports = userController.remove({})
    .then(() => userController.create({role: "admin"}))
    .then(() => userController.create({role: "user"}))