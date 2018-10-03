import { defaultStaticServer } from './defaults';
import devConfig from './dev-config';
import analyzeConfig from './analyze-config';

export default lila => {
  const { setSetting, getSettings } = lila;

  setSetting('webpackConfigGenerator', webpack => ({ page, cmd, config }) => {
    if (cmd === 'dev') return devConfig(lila, webpack, { page, cmd, config });
    if (cmd === 'analyze')
      return analyzeConfig(lila, webpack, { page, cmd, config });

    const [srcDir, buildDir, appDir] = getSettings([
      'srcDir',
      'buildDir',
      'appDir',
    ]);
    const { staticServer = defaultStaticServer } = config;

    // build, sync, analyze
    const entry = [`${appDir}/${srcDir}/${page}/index.js`];

    // build, sync
    const output = {
      path: `${appDir}/${buildDir}`,
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      publicPath: `${staticServer}/${buildDir}/`,
    };

    return {
      entry,
      output,
    };
  });
};
