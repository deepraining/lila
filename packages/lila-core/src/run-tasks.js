import gulp from 'gulp';
import app from './app';
import tasks from './tasks';
import run from './run';

export default ({ entries, argv, cmd }, successCB, errorCB) => {
  const { lila } = app;
  const { makeConfig, getSettings } = lila;
  const [beforeTasks, afterTasks, errorTasks] = getSettings([
    'beforeTasks',
    'afterTasks',
    'errorTasks',
  ]);

  const runTasks = [];

  entries.forEach(entry => {
    const config = makeConfig({ entry, argv, cmd });

    const { tasks: importTasks } = config;
    const taskCount = {};

    if (!importTasks) return;

    importTasks.forEach(task => {
      let taskName = task;
      let args = [];

      if (Array.isArray(task)) {
        taskName = task[0]; // eslint-disable-line prefer-destructuring
        args = task.slice(1);
      }

      const generator = tasks[taskName];

      if (!generator)
        throw new Error(`task ${taskName} has not been registered`);

      if (taskCount[taskName]) taskCount[taskName] += 1;
      else taskCount[taskName] = 1;

      // maybe one task executed multiple times in one entry
      const realTaskName = `${entry}:${taskName}${
        taskCount[taskName] > 1 ? `:${taskCount[taskName]}` : ''
      }`;

      gulp.task(
        realTaskName,
        generator({ entry, args, argv, cmd, config, lila, gulp })
      );

      runTasks.push(realTaskName);
    });
  });

  if (runTasks.length) {
    if (typeof beforeTasks === 'function')
      beforeTasks({ entries, argv, cmd, lila, gulp });

    run(
      runTasks,
      () => {
        if (typeof afterTasks === 'function')
          afterTasks({ entries, argv, cmd, lila, gulp });

        if (successCB) successCB();
      },
      err => {
        if (typeof errorTasks === 'function')
          errorTasks({ entries, argv, cmd, lila, gulp, error: err });

        if (errorCB) errorCB(err);
      }
    );
  }
};
