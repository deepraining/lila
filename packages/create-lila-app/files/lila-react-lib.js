/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack-lib';
import { forReact } from 'lila-webpack-lib-config';

export default lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  forReact(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
