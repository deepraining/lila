/* eslint-disable import/no-unresolved */
import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack-lib';
import webpackConfigPlugin from 'lila-webpack-lib-config';

export default lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
