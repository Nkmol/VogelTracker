var config = {};

// -- Promises --
config.promise = global.Promise;

// -- Glob* --
config.models = 'modules/**/model.js' // Used to automaticall load the models
config.seeds = 'modules/**/seed.js' // Used to automaticall load the seeds

// -- password-jwt
config.jwt = {};
config.jwt.options = {
    secretOrKey: "VogelTrackerSecret",
    jwtFromRequest: require('passport-jwt').ExtractJwt.fromAuthHeader()
};

// -- BCrypt --
config.bcrypt = {};
config.bcrypt.saltRounds = 10;
config.bcrypt.secret = config.jwt.options.secretOrKey;

module.exports = ((() => {
    switch(process.env.NODE_ENV) {
        case 'development':
            return Object.assign(require('./config.dev.js'), config);
        case 'production':
            return Object.assign(require('./config.prod.js'), config);
        default:
            throw Error(`Enviroment ${process.env.NODE_ENV} not supported`);
    }
})());