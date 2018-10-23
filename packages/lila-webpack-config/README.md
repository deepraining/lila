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

### `analyze`: temporary directory for command `analyze`, default `analyze`

### `getPages`: see [getPages](./src/settings.js#L11)

### `servePath`: see [servePath](./src/settings.js#L26)

## extended configs

### `babelImport`: [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config, default `[]`

### `babelExclude`: [babel-loader](https://github.com/babel/babel-loader) exclude, default `[/node_modules/]`

### `extensions`: [url-loader](https://github.com/webpack-contrib/url-loader) file extensions, default `['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`

### `provide`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) config, default `{}`

### `define`: [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) config, default `{}`

### `alias`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) config, default `{}`

### `cssModules`: whether to use [css-modules](https://github.com/css-modules/css-modules), default `false`

### `cssModulesName`: [css-loader#localidentname](https://github.com/webpack-contrib/css-loader#localidentname), default `undefined`

### `cssModulesExclude`: [css-loader](https://github.com/webpack-contrib/css-loader) `css-modules` exclude, default `[/node_modules/]`

### `flow`: whether to use [flow](https://github.com/facebook/flow), default `false`

### `flowRuntime`: whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime), default `false`

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

- `/dir`: a directory
- `http://www.static.com`: a standalone static server
- `https://www.static.com/dir`: a sub directory of a standalone static server
- `//www.static.com/dir/sub_dir`: another sub directory of a standalone static server

### `minHtml`: whether minify html, default `true`

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

### `minCss`: whether minify css, default `true`

### `minJs`: whether minify js, default `true`

### `splitJs`: split one bundle js to many pieces, default `{}`

### `devtool`: [devtool](https://webpack.js.org/configuration/devtool/) config, default:

- `cmd: dev, serve`: `cheap-module-eval-source-map`
- `cmd: build, sync, start`: `module-source-map`

### `rules`: extra webpack rules, default `[]`

### `plugins`: extra webpack plugins, default `[]`

## files of a page

A page has a standalone directory(`src/home/about/` if page `home/about`), also called workspace, and at least a `index.html` file and a `index.js` file under the workspace.

```
|-- src/
    |-- home/
        |-- about/
            |-- index.html
            |-- index.js

            |-- other files and directories
```

It's recommended to place all files of a page to its workspace.

## built-in rules

- [babel-loader](https://github.com/babel/babel-loader)
- [url-loader](https://github.com/webpack-contrib/url-loader)
- [html-loader](https://github.com/webpack-contrib/html-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
- [less-loader](https://github.com/webpack-contrib/less-loader)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)
