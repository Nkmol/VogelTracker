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

// -- password-github
config.github = {};
config.github.options = {
    clientID: '665c1f28bf25d911d9df',
    clientSecret: 'd1c5046cae49f5aca6ef63982fe89d9aa54a8d0f',
    callbackURL: 'http://localhost:3000/auth/github/callback'
}

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