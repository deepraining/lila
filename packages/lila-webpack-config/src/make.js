import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  babelLoader,
  cssLoader,
  htmlLoader,
  lessLoader,
  sassLoader,
  urlLoader,
} from './loader';
import {
  defaultAlias,
  defaultBabelExclude,
  defaultBabelImport,
  defaultCssModules,
  defaultCssModulesExclude,
  defaultDefine,
  defaultFileSuffixes,
  defaultProvide,
  defaultMinHtmlOptions,
} from './defaults';

const { join } = path;

export const basePlugins = (lila, webpack, { page, cmd, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, appDir] = getSettings(['cwd', 'srcDir', 'appDir']);
  const { ProvidePlugin, DefinePlugin } = webpack;
  const {
    provide = defaultProvide,
    define = defaultDefine,
    minHtmlOptions = defaultMinHtmlOptions,
  } = config;

  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);

  const isBuild = cmd === 'build' || cmd === 'sync';

  return [
    new ProvidePlugin(provide),
    new DefinePlugin(define),
    new HtmlWebpackPlugin({
      template: `${realSrcDir}/${page}/index.html`,
      minify: isBuild ? minHtmlOptions : false,
    }),
  ];
};

export const baseLoaders = (lila, webpack, { config }) => {
  const {
    babelImport = defaultBabelImport,
    babelExclude = defaultBabelExclude,
    fileSuffixes = defaultFileSuffixes,
  } = config;

  return [
    babelLoader({ babelImport, babelExclude }),
    urlLoader({ fileSuffixes }),
    htmlLoader(),
  ];
};

export const makeStyleLoaders = (lila, webpack, { config }) => {
  const {
    cssModules = defaultCssModules,
    cssModulesName,
    cssModulesExclude = defaultCssModulesExclude,
  } = config;
  const rules = [];

  if (cssModules) {
    const options = {
      cssModules: !0,
      localIdentName: cssModulesName,
      match: cssModulesExclude,
    };
    const excludeOptions = { ...options, exclude: !0 };
    const includeOptions = { ...options, exclude: !1 };
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
};

export const makeResolve = (lila, webpack, { config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, appDir] = getSettings(['cwd', 'srcDir', 'appDir']);
  const { alias = defaultAlias } = config;
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);

  return {
    modules: [realSrcDir, 'node_modules'],
    alias,
  };
};
