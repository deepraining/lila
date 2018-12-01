import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const babelLoader = ({
  babelImport,
  babelExclude,
  babelPresets,
  babelPlugins,
  flow,
  flowRuntime,
}) => ({
  loader: 'babel-loader',
  test: /\.(js|jsx)$/,
  options: {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      ...babelPresets,
      ...(flow ? ['@babel/preset-flow'] : []),
    ],
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-syntax-dynamic-import',
      ...(Array.isArray(babelImport) ? babelImport : [babelImport]).map(i => [
        'import',
        i,
      ]),
      ...babelPlugins,
      ...(flowRuntime ? [['flow-runtime', { assert: !0, annotate: !0 }]] : []),
    ],
  },
  exclude: babelExclude,
});

export const urlLoader = ({ extensions }) => ({
  loader: 'url-loader',
  options: {
    // 0 means infinite, put 1 here to disable base64.
    limit: 1,
  },
  test: new RegExp(`\\.(${extensions.join('|')})$`),
});

export const htmlLoader = () => ({
  loader: 'html-loader',
  test: /\.html$/,
  options: {
    attrs: ['img:src', 'link:href'],
    interpolate: 'require',
  },
});

export const vueLoader = () => ({
  loader: 'vue-loader',
  test: /\.vue$/,
});

export const cssLoader = ({
  cssModules,
  cssModulesName,
  cssModulesExclude,
  exclude,
  browsers,
  isBuild,
}) => ({
  test: /\.css$/,
  use: [
    {
      loader: isBuild ? MiniCssExtractPlugin.loader : 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules && exclude,
        localIdentName: cssModulesName,
      },
    },
    {
      loader: 'postcss-loader',
      options: { plugins: [autoprefixer({ browsers })] },
    },
  ],
  exclude: cssModules && exclude ? cssModulesExclude : undefined,
  include: cssModules && !exclude ? cssModulesExclude : undefined,
});

export const lessLoader = ({
  cssModules,
  cssModulesName,
  cssModulesExclude,
  exclude,
  browsers,
  isBuild,
}) => ({
  test: /\.less$/,
  use: [
    {
      loader: isBuild ? MiniCssExtractPlugin.loader : 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules && exclude,
        localIdentName: cssModulesName,
      },
    },
    {
      loader: 'postcss-loader',
      options: { plugins: [autoprefixer({ browsers })] },
    },
    {
      loader: 'less-loader',
    },
  ],
  exclude: cssModules && exclude ? cssModulesExclude : undefined,
  include: cssModules && !exclude ? cssModulesExclude : undefined,
});

export const sassLoader = ({
  cssModules,
  cssModulesName,
  cssModulesExclude,
  exclude,
  browsers,
  isBuild,
}) => ({
  test: /\.scss$/,
  use: [
    {
      loader: isBuild ? MiniCssExtractPlugin.loader : 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules && exclude,
        localIdentName: cssModulesName,
      },
    },
    {
      loader: 'postcss-loader',
      options: { plugins: [autoprefixer({ browsers })] },
    },
    {
      loader: 'sass-loader',
    },
  ],
  exclude: cssModules && exclude ? cssModulesExclude : undefined,
  include: cssModules && !exclude ? cssModulesExclude : undefined,
});
