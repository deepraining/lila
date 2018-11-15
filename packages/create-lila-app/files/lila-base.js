/* eslint-disable import/no-unresolved */
const tasksPlugin = require('lila-tasks');

module.exports = lila => {
  tasksPlugin(lila);

  return () => ({
    tasks: [],
  });
};
