import path from 'path';
import gulp from 'gulp';
import app from './app';
import tasks from './tasks';
import run from './run';
import { log } from '../../../util/logger';

const { join } = path;

export default (pages, argv, cmd) => {
  const { lila } = app;
  const { makeConfig, getSettings, getSetting } = lila;
  const [getPages, srcDir, appDir] = getSettings([
    'getPages',
    'srcDir',
    'appDir',
  ]);

  const srcPath = join(appDir, srcDir);
  const realPages = [];

  pages.forEach(page => {
    if (page === '*' || page === 'all')
      realPages.push(...(getPages(srcPath) || []));
    else if (page.slice(-2) === '/*')
      realPages.push(...(getPages(join(srcPath, page.slice(0, -2))) || []));
    else if (page.slice(-4) === '/all')
      realPages.push(...(getPages(join(srcPath, page.slice(0, -4))) || []));
    else realPages.push(page);
  });

  const runTasks = [];

  realPages.forEach(page => {
    const config = makeConfig({ page, cmd, argv });

    const importTasks = config[`${cmd}Tasks`];

    if (!importTasks) return;

    importTasks.forEach(task => {
      let taskName = task;
      let args = [];

      if (Array.isArray(task)) {
        taskName = task[0]; // eslint-disable-line prefer-destructuring
        args = task.slice(1);
      }

      const definedTask = tasks[taskName];

      if (!definedTask)
        throw new Error(`task ${taskName} has not been registered`);

      const { generator } = definedTask;
      const realTaskName = `${page}:${taskName}`;

      gulp.task(
        realTaskName,
        generator({ page, args, argv, cmd, config, lila, gulp })
      );

      runTasks.push(realTaskName);
    });
  });

  if (runTasks.length) {
    const cmdTaskName = `@lila/${cmd}`;
    gulp.task(cmdTaskName, gulp.series(...runTasks));
    run(cmdTaskName, () => {
      log(getSetting('doneMessage'));
    });
  }
};
