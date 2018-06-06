
const _ = require('lodash');

const projectConfig = require('../../project_config');
const distDel = require('./del');
const distCopy = require('./copy');
const distChange = require('./change');
const distAdjust = require('./adjust');
const distNext = require('./next');
const distMin = require('../dist/min');
const distHtml = require('../dist/html');
const webpackBuild = require('../dist/webpack');
const name = require('./name');
const distData = require('./data');

module.exports = (gulp) => {

    const copyToStore = distCopy.copyToStore;

    const findChangedBase = distChange.findChangedBase(gulp);

    const adjustHtml = distAdjust.adjustHtml(gulp);

    const minCss = distMin.minCss(gulp);
    const minJs = distMin.minJs(gulp);
    const minHtml = distMin.minHtml(gulp);

    const htmlHandle = distHtml(gulp);

    const nameHtml = name.nameHtml;

    const nextModule = distNext.nextModule;

    const delTasks = [
        distDel.delDist, distDel.delTmp
    ];

    const getTask = () => {
        return _.concat([],
            delTasks,
            [
                webpackBuild,
                nameHtml,
                findChangedBase,
                minCss,
                minJs,
                adjustHtml,
                minHtml,
                copyToStore,
                htmlHandle,
                nextModule
            ]);
    };

    const moduleTasks = [],
        tasks;

    if (!projectConfig.multiple) {
        moduleTasks.push(getTask());
    }
    else {
        for (const i = 0, il = projectConfig.allModules.length; i < il; i++) {
            moduleTasks.push(getTask());
            distData.nextModule();
        }
    }

    moduleTasks.push(delTasks);
    tasks = _.flatten(moduleTasks);

    return tasks;
};
