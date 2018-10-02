import HtmlWebpackPlugin from 'html-webpack-plugin';
import getStaticServer from './static-server';
import {
  babelLoader,
  urlLoader,
  htmlLoader,
  cssLoader,
  lessLoader,
  sassLoader,
} from './loader';

export default lila => {
  const { setSetting, getSettings } = lila;

  setSetting('webpackConfigGenerator', webpack => ({ page, cmd, config }) => {
    const { ProvidePlugin, DefinePlugin, HotModuleReplacementPlugin } = webpack;
    const [
      srcDir,
      devDir,
      buildDir,
      appDir,
      tmpDir,
      analyzeDir = 'analyze',
    ] = getSettings([
      'srcDir',
      'devDir',
      'buildDir',
      'appDir',
      'tmpDir',
      'analyzeDir',
    ]);
    const {
      staticServer = '',
      provide,
      define,
      babelImport = [],
      babelExclude = [/node_modules/],
      fileSuffixes = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'ico',
        'svg',
        'eot',
        'ttf',
        'woff',
        'woff2',
      ],
      cssModules = !1,
      cssModulesName,
      cssModulesExclude = [/node_modules/],
      alias = {},
    } = config;
    const staticServerInfo = getStaticServer(staticServer);
    const isBuild = cmd === 'build' || cmd === 'sync';
    const isDev = cmd === 'dev';
    const isAnalyze = cmd === 'analyze';

    // build, sync, analyze
    const entry = [`${appDir}/${srcDir}/${page}/index.js`];

    // build, sync
    let output = {
      path: `${appDir}/${buildDir}`,
      filename: '[chunkhash].js',
      hashDigestLength: 32,
      publicPath: `${staticServerInfo.dir}/${buildDir}/`,
    };

    const plugins = [];
    if (provide) plugins.push(new ProvidePlugin(provide));
    if (define) plugins.push(new DefinePlugin(define));
    plugins.push(
      new HtmlWebpackPlugin({
        template: `${appDir}/${srcDir}/${page}/index.html`,
      })
    );

    const rules = [
      babelLoader({ babelImport, babelExclude }),
      urlLoader({
        fileSuffixes,
        isBuild,
        buildDir,
        staticServerDir: staticServerInfo.dir,
      }),
      htmlLoader(),
    ];

    if (cssModules) {
      const options = {
        cssModules: !0,
        localIdentName: cssModulesName,
        match: cssModulesExclude,
      };
      const excludeOptions = { ...options, exclude: !0 }; // eslint-disable
      const includeOptions = { ...options, exclude: !1 }; // eslint-disable
      rules.push(
        cssLoader(excludeOptions),
        cssLoader(includeOptions),
        lessLoader(excludeOptions),
        lessLoader(includeOptions),
        sassLoader(excludeOptions),
        sassLoader(includeOptions)
      );
    } else {
      const options = { cssModules: !1 };

      rules.push(cssLoader(options), lessLoader(options), sassLoader(options));
    }

    const resolve = {
      modules: [`${appDir}/${srcDir}`, 'node_modules'],
      alias,
    };

    if (isBuild) {
      // todo: split js, css standalone
      // rules.push();
    }

    // dev
    if (isDev) {
      entry.unshift('webpack-hot-middleware/client?reload=true');
      output = {
        path: `${appDir}/${devDir}`,
        filename: 'index.js',
        publicPath: `/${devDir}/`,
      };
      plugins.push(new HotModuleReplacementPlugin());
    }

    // analyze
    if (isAnalyze) {
      output = {
        path: `${tmpDir}/${analyzeDir}`,
        filename: 'index.js',
      };
    }

    return {
      entry,
      output,
      module: { rules },
      resolve,
    };
  });
};
