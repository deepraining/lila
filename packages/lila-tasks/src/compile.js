import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import less from 'gulp-less';
import sass from 'gulp-sass';

/**
 * compile es6 to es5
 *
 * @example
 *
 * ```
 * ['@lila/compile-js', {src, dest, options, modules, transformRuntime}]
 * ```
 *
 * @param args
 * @param gulp
 * @returns {function()}
 */
export const compileJs = ({ args, gulp }) => () => {
  const { src, dest, options = {}, modules = !1, transformRuntime = !0 } =
    (args && args[0]) || {};

  if (!src) throw new Error('src not configured');
  if (!dest) throw new Error('dest not configured');

  let globs = src;
  let srcOptions = {};

  if (Array.isArray(src) && typeof src[1] === 'object') {
    [globs, srcOptions] = src;
  }

  const babelOptions = { ...options };
  if (!babelOptions.presets) babelOptions.presets = [];
  if (!babelOptions.plugins) babelOptions.plugins = [];

  babelOptions.presets.unshift(
    ['@babel/preset-env', { modules }],
    '@babel/preset-react',
    '@babel/preset-flow'
  );

  babelOptions.plugins.unshift(
    '@babel/plugin-transform-react-jsx',
    '@babel/plugin-syntax-dynamic-import',
    ...(transformRuntime ? ['@babel/plugin-transform-runtime'] : [])
  );

  return gulp
    .src(globs, srcOptions)
    .pipe(sourcemaps.init())
    .pipe(babel(babelOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
};

/**
 * compile less to css
 *
 * @example
 *
 * ```
 * ['@lila/compile-less', {src, dest, options}]
 * ```
 *
 * @param args
 * @param gulp
 * @returns {function()}
 */
export const compileLess = ({ args, gulp }) => () => {
  const { src, dest, options = {} } = (args && args[0]) || {};

  if (!src) throw new Error('src not configured');
  if (!dest) throw new Error('dest not configured');

  let globs = src;
  let srcOptions = {};

  if (Array.isArray(src) && typeof src[1] === 'object') {
    [globs, srcOptions] = src;
  }

  return gulp
    .src(globs, srcOptions)
    .pipe(sourcemaps.init())
    .pipe(less(options))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
};

/**
 * compile scss to css
 *
 * @example
 *
 * ```
 * ['@lila/compile-scss', {src, dest, options}]
 * ```
 *
 * @param args
 * @param gulp
 * @returns {function()}
 */
export const compileScss = ({ args, gulp }) => () => {
  const { src, dest, options = {} } = (args && args[0]) || {};

  if (!src) throw new Error('src not configured');
  if (!dest) throw new Error('dest not configured');

  let globs = src;
  let srcOptions = {};

  if (Array.isArray(src) && typeof src[1] === 'object') {
    [globs, srcOptions] = src;
  }

  return gulp
    .src(globs, srcOptions)
    .pipe(sourcemaps.init())
    .pipe(sass(options))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest));
};
