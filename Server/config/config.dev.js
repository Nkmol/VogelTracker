let config = {};

config.port = 3000;
config.host = 'localhost';

// -- DB -- 
config.db = {};
config.db.uri = `mongodb://127.0.0.1:27017/birdsdb`;
config.db.options = {
    
};

module.exports = config;
