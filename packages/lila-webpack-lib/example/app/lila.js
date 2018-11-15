const webpackPlugin = require('../../lib');

module.exports = lila => {
  const { setSetting } = lila;

  setSetting('webpackConfigGenerator', () => options => {
    const { cmd } = options;

    // console.log('webpackConfigGenerator/webpack', webpack);
    // console.log('webpackConfigGenerator/entry', options.entry);
    // console.log('webpackConfigGenerator/args', options.args);
    // console.log('webpackConfigGenerator/argv', options.argv);
    // console.log('webpackConfigGenerator/cmd', options.cmd);
    // console.log('webpackConfigGenerator/config', options.config);
    // console.log('webpackConfigGenerator/lila', options.lila);

    const isDev = cmd === 'start';
    const dir = isDev ? 'dev' : 'lib';

    return {
      entry: [`${__dirname}/src/index.js`],
      output: {
        path: `${__dirname}/${dir}/`,
        filename: 'index.js',
        publicPath: `/${dir}/`,
      },
      devtool: isDev ? 'eval-source-map' : 'source-map',
      mode: isDev ? 'development' : 'production',
    };
  });

  setSetting('getEntries', () =>
    // console.log(`getEntries/dir: ${dir}`);

    ['test']
  );

  webpackPlugin(lila);

  return () => ({
    tasks: ['@lila/webpack'],
  });
};
