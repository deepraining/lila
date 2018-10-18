import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const babelLoader = ({ babelImport, babelExclude }) => ({
  loader: 'babel-loader',
  test: /\.(js|jsx)$/,
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-syntax-dynamic-import',
      ['import', babelImport],
    ],
  },
  exclude: babelExclude,
});

export const urlLoader = ({ fileSuffixes }) => ({
  loader: 'url-loader',
  options: {
    // 0 means infinite, put 1 here to disable base64.
    limit: 1,
  },
  test: new RegExp(`\\.(${fileSuffixes.join('|')})$`),
});

export const htmlLoader = () => ({
  loader: 'html-loader',
  test: /\.html$/,
  options: {
    attrs: ['img:src', 'link:href'],
    interpolate: 'require',
  },
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
