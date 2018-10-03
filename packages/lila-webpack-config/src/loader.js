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

export const cssLoader = ({ cssModules, localIdentName, match, exclude }) => ({
  test: /\.css$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules && exclude,
        localIdentName,
      },
    },
  ],
  exclude: cssModules && exclude ? match : undefined,
  include: cssModules && !exclude ? match : undefined,
});

export const lessLoader = ({ cssModules, localIdentName, match, exclude }) => ({
  test: /\.less$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules && exclude,
        localIdentName,
      },
    },
    {
      loader: 'less-loader',
    },
  ],
  exclude: cssModules && exclude ? match : undefined,
  include: cssModules && !exclude ? match : undefined,
});

export const sassLoader = ({ cssModules, localIdentName, match, exclude }) => ({
  test: /\.scss$/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        modules: cssModules && exclude,
        localIdentName,
      },
    },
    {
      loader: 'sass-loader',
    },
  ],
  exclude: cssModules && exclude ? match : undefined,
  include: cssModules && !exclude ? match : undefined,
});
