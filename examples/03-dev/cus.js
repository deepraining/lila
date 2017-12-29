
var projectConfig = require('./demo/lila.config');

projectConfig.basePaths = {
    buildRoot: "./project",
    webRoot: "./"
};

projectConfig.directoriesToSync = {
    images: 'project/images',
    fonts: 'project/fonts'
};