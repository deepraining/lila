/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */
import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack';
import webpackVuePlugin from 'lila-webpack-vue';

export default lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackVuePlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
