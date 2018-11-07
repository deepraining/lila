const tasksPlugin = require('../../../lila-tasks/lib');
const webpackPlugin = require('../../../lila-webpack/lib');
const webpackConfigPlugin = require('../../../lila-webpack-config/lib');

module.exports = lila => {
  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  return ({ entry, argv, cmd }) => {
    console.log(entry);
    console.log(argv);
    console.log(cmd);
    return {
      alias: {
        base: 'alias/base',
        common: 'alias/common',
      },
    };
  };
};
