import runTasks from './run-tasks';

export default (pages, argv) => {
  runTasks(pages, argv, 'sync');
};
