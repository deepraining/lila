
var _ = require('lodash');

var projectConfig = require('../../project_config');
var distDel = require('./del');
var distExtract = require('./extract');
var distChange = require('./change');
var distAdjust = require('./adjust');
var distRevision = require('./revision');
var distNext = require('./next');
var distMin = require('../dist/min');
var distHtml = require('../dist/html');
var webpackBuild = require('../dist/webpack');
var distData = require('./data');

module.exports = (gulp) => {

    var extractResources = distExtract.extractResources(gulp);

    var revisionBase = distRevision.revisionBase(gulp);

    var findChangedBase = distChange.findChangedBase(gulp);

    var adjustCss = distAdjust.adjustCss(gulp);
    var adjustHtml = distAdjust.adjustHtml(gulp);


    var minCss = distMin.minCss(gulp);
    var minJs = distMin.minJs(gulp);
    var minHtml = distMin.minHtml(gulp);

    var htmlHandle = distHtml.htmlHandle(gulp);

    var nextModule = distNext.nextModule;

    var delTasks = [
        distDel.delExtract, distDel.delDist, distDel.delDistTmp, distDel.delDistHandleHtml
    ];

    var getTask = () => {
        return _.concat([],
            delTasks,
            [
                webpackBuild,
                extractResources,
                revisionBase,
                findChangedBase,
                adjustCss,
                minCss,
                minJs,
                adjustHtml,
                minHtml,
                htmlHandle,
                nextModule
            ]);
    };

    var moduleTasks = [],
        tasks;

    if (!projectConfig.multiModules) {
        moduleTasks.push(getTask());
    }
    else {
        for (var i = 0, il = projectConfig.modules.length; i < il; i++) {
            moduleTasks.push(getTask());
            distData.nextModule();
        }
    }

    moduleTasks.push(delTasks);
    tasks = _.flatten(moduleTasks);

    return tasks;
};