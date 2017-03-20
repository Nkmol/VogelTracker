var config = {};

config.port = 3000;
config.host = 'localhost';

// -- DB -- 
config.db = {};
config.db.user = 'user';
config.db.password = 'user';
config.db.uri = `mongodb://${config.db.user}:${config.db.password}@ds145369.mlab.com:45369/birdsdb`;
config.db.options = {
    
};

// -- Promises --
config.promise = global.Promise;

// -- Glob* --
config.models = 'modules/**/model.js' // Used to automaticall load the models
config.seeds = 'modules/**/seed.js' // Used to automaticall load the seeds

module.exports = config;