
var _ = require('lodash');

var projectConfig = require('../../project_config');
var distDel = require('./del');
var distCopy = require('./copy');
var distExtract = require('./extract');
var distChange = require('./change');
var distAdjustBase = require('./adjust_base');
var distRevision = require('./revision');
var distNextBase = require('./next_base');
var distMin = require('../dist/min');
var distHtml = require('../dist/html');
var webpackBuild = require('../dist/webpack');
var distData = require('./data');

module.exports = (gulp) => {

    var findRequireJsModules = distFind.findRequireJsModules;

    var copyJs = distCopy.copyJs(gulp);
    var copyCss = distCopy.copyCss(gulp);
    var copyExtraJs = distCopy.copyExtraJs(gulp);
    var copyDirectoriesToBuild = distCopy.copyDirectoriesToBuild(gulp);
    var copyDirectoriesToBuildForInCss = distCopy.copyDirectoriesToBuildForInCss(gulp);
    var copyDirectoriesOfBuildAfterDist = distCopy.copyDirectoriesOfBuildAfterDist(gulp);

    var extractResources = distExtract.extractResources(gulp);
    var extractResourcesToConcat = distExtract.extractResourcesToConcat;

    var revisionBase = distRevision.revisionBase(gulp);
    var revisionJs = distRevision.revisionJs(gulp);
    var revisionCss = distRevision.revisionCss(gulp);

    var findChangedBase = distChange.findChangedBase(gulp);
    var findChangedJs = distChange.findChangedJs(gulp);
    var findChangedCss = distChange.findChangedCss(gulp);

    var adjustCss = distAdjustBase.adjustCss(gulp);
    var adjustHtml = distAdjustBase.adjustHtml(gulp);


    var minCss = distMin.minCss(gulp);
    var minJs = distMin.minJs(gulp);
    var minHtml = distMin.minHtml(gulp);

    var htmlHandle = distHtml.htmlHandle(gulp);

    var nextModule = distNextBase.nextModule;

    var delTasks = [
        distDel.delExtract, distDel.delExtractJs, distDel.delExtractCss,
        distDel.delDist, distDel.delDistTmp, distDel.delDistHandleHtml
    ];

    var getTask = () => {
        return _.concat([],
            delTasks,
            [
                webpackBuild,
                findRequireJsModules,
                extractResources,
                copyDirectoriesToBuild,
                copyJs,
                copyCss,
                copyDirectoriesToBuildForInCss,
                extractResourcesToConcat,
                revisionJs,
                findChangedJs,
                revisionCss,
                findChangedCss,
                revisionBase,
                findChangedBase,
                adjustCss,
                minCss,
                minJs,
                adjustHtml,
                copyDirectoriesOfBuildAfterDist,
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