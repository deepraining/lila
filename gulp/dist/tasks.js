
var _ = require('lodash');

var projectConfig = require('../../project_config');
var distDel = require('./del');
var distCopy = require('./copy');
var distExtract = require('./extract');
var distConcat = require('./concat');
var distChange = require('./change');
var distAdjust = require('./adjust');
var distAdjustBase = require('./adjust_base');
var distRevision = require('./revision');
var distNextBase = require('./next_base');
var distMin = require('../dist/min');
var distHtml = require('../dist/html');
var distFind = require('../dist/find');
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

    var concatJs = distConcat.concatJs(gulp);
    var concatCss = distConcat.concatCss(gulp);
    var concatCssForImport = distConcat.concatCssForImport(gulp);

    var adjustHtmlForConcatJs = distAdjust.adjustHtmlForConcatJs;
    var adjustHtmlForConcatCss = distAdjust.adjustHtmlForConcatCss;
    var adjustHtmlForRequireJs = distAdjust.adjustHtmlForRequireJs;
    var adjustHtmlForInCss = distAdjust.adjustHtmlForInCss;
    var adjustHtmlForInCssToTagLoad = distAdjust.adjustHtmlForInCssToTagLoad;
    var adjustHtmlForRequireJsToTagLoad = distAdjust.adjustHtmlForRequireJsToTagLoad;

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
                adjustHtmlForRequireJsToTagLoad,
                adjustHtmlForInCssToTagLoad,
                extractResourcesToConcat
            ],
            _.fill(new Array(distData.currentConfig.needConcatJs ? _.keys(distData.currentConfig.concatJsPriority).length : 0), concatJs),
            _.fill(new Array(distData.currentConfig.needConcatCss ? _.keys(distData.currentConfig.concatCssPriority).length : 0), concatCss),
            _.fill(new Array(distData.currentConfig.hasExtraJsEntryModules ? distData.currentConfig.extraJsEntryModules.length : 0), copyExtraJs),
            [
                adjustHtmlForConcatJs,
                adjustHtmlForConcatCss,
                revisionJs,
                adjustHtmlForRequireJs,
                findChangedJs,
                revisionCss,
                adjustHtmlForInCss,
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