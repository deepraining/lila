
'use strict';

var path = require('path');
var rd = require('rd');
var express = require('express');

var pathUtil = require('../util/path');
var checkConfigFile = require('../util/check_config_file');
var changeCwd = require('../util/change_cwd');

checkConfigFile();

var projectConfig = require('../project_config');
var serverPath = projectConfig.basePaths.buildRoot + '/data';
var webRootPath = projectConfig.basePaths.webRoot;
var serverPort = projectConfig.mockExpressServerPort;

changeCwd();

var app = express();

// add common header
app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// iterate files
rd.eachFileFilterSync(serverPath, (file) => {
    // not js file
    if (file.slice(-3) != '.js') return;

    var filePath = path.relative(webRootPath, file);

    /**
     * url
     *
     * example:
     *     /project/data/test/index/demo.js
     *     ->
     *     /data/test/index/demo
     *
     * @type {string}
     */
    var url = pathUtil.replaceBackSlash(filePath).slice(0, -3);

    app.all('/' + url, require(file));
});

app.listen(serverPort, () => {
    logger.success('');
    logger.success(`Lila start express mock server on port ${serverPort} successfully!`);
    logger.success('');
});