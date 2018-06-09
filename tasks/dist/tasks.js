
const concat = require('lodash/concat');
const flatten = require('lodash/flatten');

const projectConfig = require('../../project_config');

const delDist = require('./del/dist');
const delTmp = require('./del/tmp');

const webpack = require('../dist/misc/webpack');
const renameHtml = require('../dist/misc/rename_html');

const distCopy = require('./copy');
const distChange = require('./change');
const distAdjust = require('./adjust');
const distNext = require('./next');
const distMin = require('../dist/min');
const distHtml = require('../dist/html');
const data = require('./current');

const delTasks = [delDist, delTmp];

module.exports = (gulp) => {

    const copyToStore = distCopy.copyToStore;

    const findChangedBase = distChange.findChangedBase(gulp);

    const adjustHtml = distAdjust.adjustHtml(gulp);

    const minCss = distMin.minCss(gulp);
    const minJs = distMin.minJs(gulp);
    const minHtml = distMin.minHtml(gulp);

    const htmlHandle = distHtml(gulp);

    const nextModule = distNext.nextModule;

    const getTask = () => {
        return concat([],
            delTasks,
            [
                webpack,
                renameHtml,
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

    const tasks = [];

    if (!projectConfig.multiple) {
        tasks.push(getTask());
    }
    else {
        for (let i = 0, il = projectConfig.allModules.length; i < il; i++) {
            tasks.push(getTask());
            data.nextModule();
        }
    }

    tasks.push(delTasks);

    return flatten(tasks);
};
