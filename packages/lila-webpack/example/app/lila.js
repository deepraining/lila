import fse from 'fs-extra';
import webpackPlugin from '../../lib';

const { outputFileSync } = fse;

export default lila => {
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

  setSetting('beforeCommand', ({ cmd }) => {
    console.log(`\ncmd: ${cmd}\n`);

    outputFileSync(
      `${__dirname}/.tmp/print.js`,
      `
      export default () => {console.log('cmd: ${cmd}')};
    `
    );
  });

  webpackPlugin(lila);

  return () => ({
    // devMiddleware: { writeToDisk: !0, watchOptions: { ignored: /node_modules/ } },
    tasks: ['@lila/webpack'],
  });
};
