let config = require('../../config/config'),
    JwtStrategy = require('passport-jwt').Strategy,
    passport = require('passport');

class Passwordjwt {
    constructor(validate) {
        passport.use(new JwtStrategy(config.jwt.options, validate));
    }

    initialize() {
        return passport.initialize();
    }

    authenticate(req, res, next) {
        if(req.path == '/login' || req.path == '/register') return next();
        return passport.authenticate('jwt', {session: false});
    }
}

module.exports = Passwordjwt;