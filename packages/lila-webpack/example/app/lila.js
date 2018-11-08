const webpackPlugin = require('../../../lila-webpack/lib');

module.exports = lila => {
  const { setSetting } = lila;

  webpackPlugin(lila);

  setSetting('webpackConfigGenerator', () => ({ cmd }) => {
    const isDev = cmd === 'dev' || cmd === 'serve';
    const isAnalyze = cmd === 'analyze';
    let dir = 'build';

    if (isDev) dir = 'dev';
    else if (isAnalyze) dir = 'analyze';

    return {
      entry: [`${__dirname}/src/index.js`],
      output: {
        path: `${__dirname}/${dir}/`,
        filename: 'index.js',
        publicPath: `/${dir}/`,
      },
    };
  });

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
