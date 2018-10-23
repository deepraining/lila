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

### `analyze`: `string`, default `analyze`, temporary directory for command `analyze`

### `getPages`: see [getPages](./src/settings.js#L11)

### `servePath`: see [servePath](./src/settings.js#L26)

## extended configs

### `babelImport`: `[]`, default `[]`, [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config

### `babelExclude`: `[]`, default `[/node_modules/]`, [babel-loader](https://github.com/babel/babel-loader) exclude

### `extensions`: `[]`, default `['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`, [url-loader](https://github.com/webpack-contrib/url-loader) file extensions

### `provide`: `{}`, default `{}`, [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) config

### `define`: `{}`, default `{}`, [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) config

### `alias`: `{}`, default `{}`, [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) config

### `cssModules`: `bool`, default `false`, whether to use [css-modules](https://github.com/css-modules/css-modules)

### `cssModulesName`: `string`, [css-loader#localidentname](https://github.com/webpack-contrib/css-loader#localidentname)

### `cssModulesExclude`: `[]`, default `[/node_modules/]`, [css-loader](https://github.com/webpack-contrib/css-loader) `css-modules` exclude

### `flow`: `bool`, default `false`, whether to use [flow](https://github.com/facebook/flow)

### `flowRuntime`: `bool`, default `false`, whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime)

### `browsers`: `[]`, [autoprefixer](https://github.com/postcss/autoprefixer#browsers) browsers, default:

```
[
  '> 1%',
  'last 2 versions',
  'Android >= 3.2',
  'Firefox >= 20',
  'iOS 7',
]
```

### `staticServer`: `string`, a static server to place bundle resources to, default empty string

- `/dir`: a directory
- `http://www.static.com`: a standalone static server
- `https://www.static.com/dir`: a sub directory of a standalone static server
- `//www.static.com/dir/sub_dir`: another sub directory of a standalone static server

### `minHtml`: `bool`, default `true`, whether minify html

### `minHtmlOptions`: `{}`, [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference) config, default:

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

### `minCss`: `bool`, default `true`, whether minify css

### `minJs`: `bool`, default `true`, whether minify js

### `splitJs`: `{}`, default `{}`, split one bundle js to many pieces

### `devtool`: `string`, [devtool](https://webpack.js.org/configuration/devtool/) config, default:

- `cmd: dev, serve`: `cheap-module-eval-source-map`
- `cmd: build, sync, start`: `module-source-map`

### `rules`: `[]`, default `[]`, extra webpack rules

### `plugins`: `[]`, default `[]`, extra webpack plugins

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
