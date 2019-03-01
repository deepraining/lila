/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import tasksPlugin from 'lila-tasks';
import rollupPlugin from 'lila-rollup';
import rollupConfigPlugin from 'lila-rollup-config';

export default lila => {
  tasksPlugin(lila);
  rollupPlugin(lila);
  rollupConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/rollup'],
  });
};
