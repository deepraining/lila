import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const vueLoader = () => ({
  loader: 'vue-loader',
  test: /\.vue$/,
});

const baseBabelLoader = ({
  babelExclude,
  babelPresets,
  babelPlugins,
  test,
  presets,
  plugins,
}) => ({
  loader: 'babel-loader',
  test,
  options: {
    presets: [
      '@babel/preset-env',
      ...presets,
      ...babelPresets,
    ],
    plugins: [
      ...plugins,
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
      ...babelPlugins,
    ],
  },
  exclude: babelExclude,
});

export const babelLoader = ({
  babelExclude,
  babelPresets,
  babelPlugins,
}) => {
  return [
    baseBabelLoader({
      babelExclude,
      babelPresets,
      babelPlugins,
      test: /\.js$/,
      presets: [],
      plugins: [],
    }),
    vueLoader()
  ];
};

export const urlLoader = ({ extensions }) => ({
  test: new RegExp(`\\.(${extensions.join('|')})$`),
  type: 'asset/resource',
    generator: {
      filename: '[hash][ext][query]',
    },
});

export const htmlLoader = () => ({
  loader: 'html-loader',
  test: /\.html$/,
});

export const cssLoader = ({
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
    },
    {
      loader: 'postcss-loader',
      options: { postcssOptions: {plugins: [autoprefixer({ browsers })] }},
    },
  ],
});

export const lessLoader = ({
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
    },
    {
      loader: 'postcss-loader',
      options: { postcssOptions: {plugins: [autoprefixer({ browsers })] }},
    },
    {
      loader: 'less-loader',
    },
  ],
});

export const sassLoader = ({
  browsers,
  isBuild,
  sassResources,
}) => {
  const loaders = {
    test: /\.scss$/,
    use: [
      {
        loader: isBuild ? MiniCssExtractPlugin.loader : 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
        options: { postcssOptions: {plugins: [autoprefixer({ browsers })] }},
      },
      {
        loader: 'sass-loader',
      },
    ],
  };

  if (sassResources) {
    loaders.use.push({
      loader: 'sass-resources-loader',
      options: {
        resources: sassResources,
      },
    });
  }
  return loaders;
};
