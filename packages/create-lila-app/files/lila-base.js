/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack';
import webpackConfigPlugin from 'lila-webpack-config';

export default lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
