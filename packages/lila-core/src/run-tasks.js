import gulp from 'gulp';
import app from './app';
import tasks from './tasks';

export default (pages, argv, cmd) => {
  const { lila } = app;
  const { makeConfig } = lila;

  const runTasks = [];

  pages.forEach(page => {
    const config = makeConfig({ page, cmd }, argv);

    const importTasks = config[`${cmd}Tasks`];

    if (!importTasks) return;

    importTasks.forEach(task => {
      let taskName = task;
      let args = [];

      if (Array.isArray(task)) {
        taskName = task[0]; // eslint-disable-line prefer-destructuring
        args = task.slice(1);
      }

      const taskGenerator = tasks[taskName];

      if (!taskGenerator)
        throw new Error(`task ${taskName} has not been registered`);

      runTasks.push(taskGenerator({ page, args }, lila));
    });
  });

  if (runTasks.length) gulp.task(`@lila/${cmd}`, gulp.series(...runTasks));
};
