# lila-webpack-config

[中文文档](./README.md)

Built-in webpack config generator for `lila-webpack`.

## install

```
npm install --save-dev lila-webpack-config
```

## use

In `lila.init.js`:

```
import webpackPlugin from 'lila-webpack';
import webpackConfigPlugin, {
  forReact as reactWebpackConfigPlugin,
  forVue as vueWebpackConfigPlugin,
  forReactVue as reactVueWebpackConfigPlugin,
} from 'lila-webpack-config';

export default lila => {
  webpackPlugin(lila);
  webpackConfigPlugin(lila);                // for normal project
  // reactWebpackConfigPlugin(lila);        // for react project
  // vueWebpackConfigPlugin(lila);          // for vue project
  // reactVueWebpackConfigPlugin(lila);     // React + Vue project

  ...
};
```

## extended configs

### `babelExclude`: [babel-loader](https://github.com/babel/babel-loader) exclude

`type: []` `default: [/node_modules/]`

### `babelPresets`: extra babel presets

`type: []` `default: []`

Lila provided following presets internally:

1. for `.{js,vue}` files:

- `@babel/preset-env`
- `@babel/preset-flow`

2. for `.jsx` files:

- `@babel/preset-env`
- `@babel/preset-flow`
- `@babel/preset-react`

### `babelPlugins`: extra babel plugins

`type: []` `default: []`

Lila provided following plugins internally:

1. for `.js` files:

- `@babel/plugin-syntax-dynamic-import`
- `@babel/plugin-proposal-class-properties`
- `@babel/plugin-transform-runtime`

2. for `.jsx` files:

- `@babel/plugin-syntax-dynamic-import`
- `@babel/plugin-proposal-class-properties`
- `@babel/plugin-transform-runtime`
- `@babel/plugin-transform-react-jsx`

3. for `.vue` files:

- `@babel/plugin-syntax-dynamic-import`
- `@babel/plugin-proposal-class-properties`
- `@babel/plugin-transform-runtime`
- `babel-plugin-transform-vue-jsx`

### `extensions`: [url-loader](https://github.com/webpack-contrib/url-loader) file extensions

`type: []` `default: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`

### `provide`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) config

`type: {}` `default: {}`

### `define`: [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) config

`type: {}` `default: {}`

### `alias`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) config

`type: {}` `default: {}`

### `cssModules`: whether to use [css-modules](https://github.com/css-modules/css-modules)

`type: bool` `default: false`

### `cssModulesName`: [css-loader#localidentname](https://github.com/webpack-contrib/css-loader#localidentname)

`type: string`

### `cssModulesExclude`: [css-loader](https://github.com/webpack-contrib/css-loader) `css-modules` exclude

`type: []` `default: [/node_modules/]`

### `browsers`: [autoprefixer](https://github.com/postcss/autoprefixer#browsers) browsers

`type: []`

`default:`

```
[
  '> 1%',
  'last 2 versions',
  'Android >= 3.2',
  'Firefox >= 20',
  'iOS 7',
]
```

### `staticServer`: a static server to place bundle resources to

`type: string` `default: empty string`

- `/dir`: a directory
- `http://www.static.com`: a standalone static server
- `https://www.static.com/dir`: a sub directory of a standalone static server
- `//www.static.com/dir/sub_dir`: another sub directory of a standalone static server

### `minHtml`: whether minify html

`type: bool` `default: true`

### `minHtmlOptions`: [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference) config

`type: {}`

`default:`

```
{
  removeComments: !0,
  collapseWhitespace: !0,
  collapseBooleanAttributes: !0,
  removeEmptyAttributes: !0,
  removeScriptTypeAttributes: !0,
  removeStyleLinkTypeAttributes: !0,
  removeRedundantAttributes: !0,
  minifyJS: !0,
  minifyCSS: !0,
}
```

### `minCss`: whether minify css

`type: bool` `default: true`

### `minJs`: whether minify js

`type: bool` `default: true`

### `devtool`: [devtool](https://webpack.js.org/configuration/devtool/) config

`type: string`

`default:`

- `cmd: dev, serve`: `eval-source-map`
- `cmd: build, sync, start`: `source-map`

### `splitChunks`: [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) config

`type: {}` `default: {chunks: 'all'}`

### `sassResources`: [sass-resources-loader](https://github.com/shakacode/sass-resources-loader#resources) `resources` option

`type: string/array`

### `extra`: extra webpack config options

`type: {}/function` `default: {}`

```
extra: { ... }
extra: webpack => ({ ... })
```

### `rules`: extra webpack rules

`type: []` `default: []`

### `plugins`: extra webpack plugins

`type: []` `default: []`

### `rebuildWebpackConfig`: rebuild webpack config when you want more handling of webpack config

`type: function`

```
({ webpackConfig, lila, webpack, entry, cmd, config, argv }) => newWebpackConfig;
```

## files of an entry

An entry has a standalone directory(`src/home/about/` if entry is `home/about`), also called workspace, and has at least a `index.html` file and a `index.js` file under the workspace.

If `entry` is not provided, `@lila/index` will be used as default.

If entry is `@lila/index`, its workspace is `src`:

```
- src/
  - index.html
  - index.js

  - other files and directories
```

Others(entry is `home/about`), its workspace is `src/home/about`:

```
- src/
  - home/
    - about/
      - index.html
      - index.js

      - other files and directories
```

It's recommended to place all files of an entry to its workspace.

## built-in rules

- [babel-loader](https://github.com/babel/babel-loader)
- [url-loader](https://github.com/webpack-contrib/url-loader)
- [html-loader](https://github.com/webpack-contrib/html-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
- [less-loader](https://github.com/webpack-contrib/less-loader)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)
- [sass-resources-loader](https://github.com/shakacode/sass-resources-loader)
- [vue-loader](https://github.com/vuejs/vue-loader)

## file extensions

- `.js`: pure JavaScript code
- `.jsx`: React component code
- `.vue`: Vue component code
