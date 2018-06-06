
const fs = require('fs');
const fsExtra = require('fs-extra');
const _ = require('lodash');

const projectConfig = require('../../project_config');

module.exports = {
    // rename html after building
    renameHtml: (cb) =>  {
        if (!projectConfig.renameHtml) {
            cb();
            return;
        }

        _.forEach(projectConfig.renameHtml, (targetModule, sourceModule) => {
            const targetPath = projectConfig.buildPaths.dist.html + '/' + targetModule + '.html';
            const sourcePath = projectConfig.buildPaths.dist.html + '/' + sourceModule + '.html';

            if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath))
                fsExtra.moveSync(sourcePath, targetPath, {overwrite: !0});

            // html to jsp, php ...
            if (projectConfig.htmlExtension) {
                const targetPath2 = projectConfig.buildPaths.dist.html + '/' + targetModule + '.' + projectConfig.htmlExtension;
                const sourcePath2 = projectConfig.buildPaths.dist.html + '/' + sourceModule + '.' + projectConfig.htmlExtension;

                if (fs.existsSync(sourcePath2) && !fs.existsSync(targetPath2))
                    fsExtra.moveSync(sourcePath2, targetPath2, {overwrite: !0});
            }
        });

        cb();
    }
};
