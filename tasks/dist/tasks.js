
const concat = require('lodash/concat');
const flatten = require('lodash/flatten');

const projectConfig = require('../../project_config');

const delDist = require('./del/dist');
const delTmp = require('./del/tmp');

const webpack = require('../dist/misc/webpack');
const placeHtml = require('./html/place');
const getAdjustHtml = require('../dist/html/adjust');

const changedBase = require('../dist/changed/base');

const getMinJs = require('../dist/min/js');
const getMinCss = require('../dist/min/css');
const getMinHtml = require('../dist/min/html');

const copyToStore = require('../dist/copy/to_store');

const getHandleHtml = require('../dist/html/handle');

const nextModule = require('./misc/next_module');

const next = require('./util/next');

const delTasks = [delDist, delTmp];

module.exports = (gulp) => {

    const adjustHtml = getAdjustHtml(gulp);

    const minCss = getMinCss(gulp);
    const minJs = getMinJs(gulp);
    const minHtml = getMinHtml(gulp);

    const handleHtml = getHandleHtml(gulp);

    const getTask = () => {
        return concat([],
            delTasks,
            [
                webpack,
                placeHtml,
                changedBase,
                minCss,
                minJs,
                adjustHtml,
                minHtml,
                copyToStore,
                handleHtml,
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
            next();
        }
    }

    tasks.push(delTasks);

    return flatten(tasks);
};
