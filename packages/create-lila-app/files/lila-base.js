/* eslint-disable import/no-unresolved */
import tasksPlugin from 'lila-tasks';

export default lila => {
  tasksPlugin(lila);

  return () => ({
    tasks: [],
  });
};
