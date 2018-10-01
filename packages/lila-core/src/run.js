import gulp from 'gulp';
import { info, debug, error } from '../../../util/logger';

// format error thrown by gulp
const formatError = e => {
  if (!e.error) return e.message;

  // PluginError
  if (typeof e.error.showStack === 'boolean') return e.error.toString();

  // Normal error
  if (e.error.stack) return e.error.stack;

  // Unknown (string, number, etc.)
  return new Error(String(e.error)).stack;
};

// task start
gulp.on('start', e => {
  const { name, branch } = e;
  const log = branch ? debug : info;
  log(`starting task ${name}...`);
});

// task finish
gulp.on('stop', e => {
  const { name, branch } = e;
  const log = branch ? debug : info;
  log(`finished task ${name}`);
});

// task error
gulp.on('error', e => {
  const { name, branch } = e;
  const log = branch ? debug : error;
  log(`error task ${name}`);

  error(formatError(e));
});

export default (taskName, successCB, errorCB) => {
  try {
    gulp.series(taskName)(err => {
      if (err) {
        if (errorCB) errorCB(err);
      } else if (successCB) successCB();
    });
  } catch (err) {
    if (errorCB) errorCB(err);
  }
};
