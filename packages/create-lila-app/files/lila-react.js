/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack';
import { forReact as reactWebpackConfigPlugin } from 'lila-webpack-config';

export default lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  reactWebpackConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
