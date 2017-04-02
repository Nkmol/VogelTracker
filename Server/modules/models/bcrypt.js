let bcrypt = require('bcrypt'),
    config = require('../../config/config');

class Bcrypt {
    hash(toHash, saltRounds = config.bcrypt.saltRounds) {
        return bcrypt.hash(toHash, saltRounds);
    }

    compare(raw, hash) {
        return bcrypt.compare(raw, hash);
    }
}

module.exports = new Bcrypt();