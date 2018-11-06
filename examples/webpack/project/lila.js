const tasksPlugin = require('../../../packages/lila-tasks/lib');
const webpackPlugin = require('../../../packages/lila-webpack/lib');
const webpackConfigPlugin = require('../../../packages/lila-webpack-config/lib');

module.exports = lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return ({ entry, argv, cmd }) => {
    console.log(entry);
    console.log(argv);
    console.log(cmd);
    return {};
  };
};
