/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import tasksPlugin from 'lila-tasks';

export default lila => {
  tasksPlugin(lila);

  return () => ({
    tasks: [],
  });
};
