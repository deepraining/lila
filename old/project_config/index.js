const cloneDeep = require('lodash/cloneDeep');

const origin = require('./origin');
const format = require('./format');

const config = format(cloneDeep(origin));

/**
 *
 * Indexing project config.
 *
 */
module.exports = config;
