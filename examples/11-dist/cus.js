/**
 * Created by senntyou on 2017/12/6.
 */

var projectConfig = require('./demo/lilacs.config');

projectConfig.basePaths = {
    buildRoot: "./project",
    webRoot: "./"
};

projectConfig.directoriesToSync = {
    images: 'project/images',
    fonts: 'project/fonts'
};