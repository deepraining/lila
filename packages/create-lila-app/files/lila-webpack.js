/* eslint-disable import/no-unresolved */
const tasksPlugin = require('lila-tasks');
const webpackPlugin = require('lila-webpack');
const webpackConfigPlugin = require('lila-webpack-config');

module.exports = lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return ({ entry }) => ({
    tasks: [
      '@lila/webpack',
      [
        '@lila/move',
        { source: 'build/index.html', target: `build/${entry}.html` },
      ],
    ],
  });
};
