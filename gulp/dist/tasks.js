
var _ = require('lodash');

var projectConfig = require('../../project_config');
var distDel = require('./del');
var distCopy = require('./copy');
var distChange = require('./change');
var distAdjust = require('./adjust');
var distNext = require('./next');
var distMin = require('../dist/min');
var distHtml = require('../dist/html');
var webpackBuild = require('../dist/webpack');
var name = require('./name');
var distData = require('./data');

module.exports = (gulp) => {

    var copyToStore = distCopy.copyToStore;

    var findChangedBase = distChange.findChangedBase(gulp);

    var adjustCss = distAdjust.adjustCss(gulp);
    var adjustHtml = distAdjust.adjustHtml(gulp);

    var minCss = distMin.minCss(gulp);
    var minJs = distMin.minJs(gulp);
    var minHtml = distMin.minHtml(gulp);

    var htmlHandle = distHtml(gulp);

    var nameHtml = name.nameHtml;

    var nextModule = distNext.nextModule;

    var delTasks = [
        distDel.delDist, distDel.delTmp
    ];

    var getTask = () => {
        return _.concat([],
            delTasks,
            [
                webpackBuild,
                nameHtml,
                findChangedBase,
                adjustCss,
                minCss,
                minJs,
                adjustHtml,
                minHtml,
                copyToStore,
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