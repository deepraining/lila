import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  babelLoader,
  cssLoader,
  htmlLoader,
  lessLoader,
  sassLoader,
  urlLoader,
} from './rules';
import {
  defaultFileSuffixes,
  defaultMinHtmlOptions,
  defaultBrowsers,
} from './defaults';

const { join } = path;

export const basePlugins = (lila, webpack, { page, config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, appDir] = getSettings(['cwd', 'srcDir', 'appDir']);
  const { ProvidePlugin, DefinePlugin } = webpack;
  const {
    provide = {},
    define = {},
    minHtml = !1,
    minHtmlOptions = defaultMinHtmlOptions,
  } = config;

  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);

  return [
    new ProvidePlugin(provide),
    new DefinePlugin(define),
    new HtmlWebpackPlugin({
      template: `${realSrcDir}/${page}/index.html`,
      minify: minHtml ? minHtmlOptions : false,
    }),
  ];
};

export const baseLoaders = (lila, webpack, { config }) => {
  const {
    babelImport = [],
    babelExclude = [/node_modules/],
    fileSuffixes = defaultFileSuffixes,
  } = config;

  return [
    babelLoader({ babelImport, babelExclude }),
    urlLoader({ fileSuffixes }),
    htmlLoader(),
  ];
};

export const styleLoaders = (lila, webpack, { config }, isBuild = !1) => {
  const {
    cssModules = !1,
    cssModulesName,
    cssModulesExclude = [/node_modules/],
    browsers = defaultBrowsers,
  } = config;
  const rules = [];

  if (cssModules) {
    const options = {
      cssModules,
      cssModulesName,
      cssModulesExclude,
      browsers,
      isBuild,
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
    const options = {
      cssModules,
      cssModulesName,
      cssModulesExclude,
      browsers,
      isBuild,
    };

    rules.push(cssLoader(options), lessLoader(options), sassLoader(options));
  }
};

export const makeResolve = (lila, webpack, { config }) => {
  const { getSettings } = lila;
  const [cwd, srcDir, appDir] = getSettings(['cwd', 'srcDir', 'appDir']);
  const { alias = {} } = config;
  const realAppDir = join(cwd, appDir);
  const realSrcDir = join(realAppDir, srcDir);

  return {
    modules: [realSrcDir, 'node_modules'],
    alias,
  };
};
