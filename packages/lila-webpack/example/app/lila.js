const webpackPlugin = require('../../../lila-webpack/lib');

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
      devtool: isDev ? 'eval-source-map' : 'source-map',
      mode: isDev ? 'development' : 'production',
    };
  });

  setSetting(
    'servePath',
    (entry, srcDir) =>
      // console.log(`servePath/entry: ${entry}`);
      // console.log(`servePath/srcDir: ${srcDir}`);

      `${srcDir}/serve.js`
  );

  setSetting('getEntries', () =>
    // console.log(`getEntries/dir: ${dir}`);

    ['test']
  );

  webpackPlugin(lila);

  return () => ({
    // devMiddleware: { writeToDisk: !0, watchOptions: { ignored: /node_modules/ } },
    tasks: ['@lila/webpack'],
  });
};
