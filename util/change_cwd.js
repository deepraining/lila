
"use strict";

var vars = require('../data/vars');

module.exports = () => {
    // change current working directory
    process.chdir(vars.lilaRoot);
};