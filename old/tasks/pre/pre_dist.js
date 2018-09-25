const fill = require('lodash/fill');
const concat = require('lodash/concat');

const projectConfig = require('../../project_config');

const delDist = require('../dist/del/dist');
const delStore = require('../dist/del/store');
const delAnalyze = require('../dist/del/analyze');
const delDev = require('../dist/del/dev');

const copyManifests = require('../dist/copy/manifests');
const copyToDist = require('../dist/copy/to_dist');

const logFirstModule = require('../dist/misc/log_first_module');
const renameHtml = require('../dist/html/rename');
const backupHtml = require('../dist/html/backup');

const syncDirChanged = require('../dist/changed/sync_dir');
const distTasks = require('../dist/tasks');

module.exports = gulp => {
  const syncDirChangedTasks = fill(
    new Array((projectConfig.processing.syncDirKeys && projectConfig.processing.syncDirKeys.length) || 0),
    syncDirChanged
  );

  const tasks = concat(
    [],
    [delAnalyze, delDev, delDist, copyManifests, logFirstModule],
    distTasks(gulp),
    syncDirChangedTasks,
    [copyToDist, renameHtml, backupHtml, delStore]
  );

  // Register task.
  gulp.task('pre_dist', gulp.series.apply(null, tasks));
};
