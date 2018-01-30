
var fs = require('fs');
var fsExtra = require('fs-extra');
var _ = require('lodash');

var projectConfig = require('../../project_config');

module.exports = {
    // rename html after building
    renameHtml: (cb) =>  {
        if (!projectConfig.renameHtmlMap) {
            cb();
            return;
        }

        _.forEach(projectConfig.renameHtmlMap, (targetModule, sourceModule) => {
            var targetPath = projectConfig.buildPaths.dist.html + '/' + targetModule + '.html';
            var sourcePath = projectConfig.buildPaths.dist.html + '/' + sourceModule + '.html';

            if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath))
                fsExtra.moveSync(sourcePath, targetPath, {overwrite: !0});

            // html to jsp, php ...
            if (projectConfig.htmlToSpecifiedExt) {
                var targetPath2 = projectConfig.buildPaths.dist.html + '/' + targetModule + '.' + projectConfig.htmlToSpecifiedExt;
                var sourcePath2 = projectConfig.buildPaths.dist.html + '/' + sourceModule + '.' + projectConfig.htmlToSpecifiedExt;

                if (fs.existsSync(sourcePath2) && !fs.existsSync(targetPath2))
                    fsExtra.moveSync(sourcePath2, targetPath2, {overwrite: !0});
            }
        });

        cb();
    }
};