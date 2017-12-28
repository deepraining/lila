
var _ = require('lodash');
var handle = require('./handle');
var originConfig = require('./origin');
var config = handle(_.cloneDeep(originConfig));

module.exports = config;