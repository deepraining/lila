/* eslint-disable import/no-unresolved */
const tasksPlugin = require('lila-tasks');
const rollupPlugin = require('lila-rollup');
const rollupConfigPlugin = require('lila-rollup-config');

module.exports = lila => {
  tasksPlugin(lila);
  rollupPlugin(lila);
  rollupConfigPlugin(lila);

  return () => ({
    tasks: ['@lila/rollup'],
  });
};
