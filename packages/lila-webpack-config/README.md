# lila-webpack-config

Lila webpack config.

## install

```
npm install --save-dev lila-webpack-config
```

## use

In `lila.js`:

```
const webpackConfigPlugin = require('lila-webpack-config');

module.exports = lila => {
  webpackConfigPlugin(lila);

  ...
};
```

## extended settings

### `analyzeDir`: temporary directory for command `analyze`, default `analyze`

## extended configs

### `babelImport`: [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config, default `[]`

### `babelExclude`: [babel-loader](https://github.com/babel/babel-loader) exclude, default `[/node_modules/]`

### `extensions`: [url-loader](https://github.com/webpack-contrib/url-loader) file extensions, default `['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`

### `provide`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) config, default `{}`

### `define`: [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) config, default `{}`

### `alias`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) config, default `{}`

### `cssModules`: whether use [css-modules](https://github.com/css-modules/css-modules), default `false`

### `cssModulesName`: [css-loader#localidentname](https://github.com/webpack-contrib/css-loader#localidentname), default `undefined`

### `cssModulesExclude`: [css-loader](https://github.com/webpack-contrib/css-loader) `css-modules` exclude, default `[/node_modules/]`

### `browsers`: [autoprefixer](https://github.com/postcss/autoprefixer#browsers) browsers, default:

```
[
  '> 1%',
  'last 2 versions',
  'Android >= 3.2',
  'Firefox >= 20',
  'iOS 7',
]
```

### `staticServer`: a static server to place bundle resources to, default empty string

### `minHtml`: whether minify html, default `false`

### `minHtmlOptions`: [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference) config, default:

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

### `minJs`: whether minify js, default `false`

### `minCss`: whether minify css, default `false`

### `splitJs`: split one bundle js to many pieces, default `{}`

### `rules`: extra webpack rules, default `[]`

### `plugins`: extra webpack plugins, default `[]`
