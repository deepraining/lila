/* eslint-disable import/no-unresolved */
const tasksPlugin = require('lila-tasks');
const webpackPlugin = require('lila-webpack-lib');
const webpackConfigPlugin = require('lila-webpack-lib-config');

module.exports = lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
