'use strict';

/**
 * Module dependencies.
 */
// Attach to global scope
global.objIsEmpty = obj => Object.keys(obj).length === 0 && obj.constructor === Object;

let app = require('./config/app');
let server = app.start();