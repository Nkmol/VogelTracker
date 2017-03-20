var config = {};

// -- Promises --
config.promise = global.Promise;

// -- Glob* --
config.models = 'modules/**/model.js' // Used to automaticall load the models
config.seeds = 'modules/**/seed.js' // Used to automaticall load the seeds

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