let config = {};

config.port = 3000;
config.host = 'localhost';

// -- DB -- 
config.db = {};
config.db.uri = `mongodb://localhost:27017/birdsdb`;
config.db.options = {
    
};

module.exports = config;
