# lila-webpack-config

Config generator for lila webpack plugin.

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

### `webpackConfigGenerator`: see [webpackConfigGenerator](./src/index.js#L9)

### `getEntries`: see [getEntries](./src/settings.js#L12)

### `servePath`: a `serve.js` file under its workspace, see [servePath](./src/settings.js#L27)

### `analyze`: temporary directory for command `analyze`

`type: string` `default: analyze`

## extended configs

### `babelImport`: [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config

`type: []/{}` `default: []`

`example:`

```
{ "libraryName": "antd" }
=>
["import", { "libraryName": "antd" }]


[[{ "libraryName": "antd"}, "ant"]]
=>
["import", { "libraryName": "antd"}, "ant"],


[{ "libraryName": "antd"}, { "libraryName": "antd-mobile"}]
=>
["import", { "libraryName": "antd"}]
["import", { "libraryName": "antd-mobile"}]


[
  [{ "libraryName": "antd"}, "ant"],
  [{ "libraryName": "antd-mobile"}, "antd-mobile"]
]
=>
["import", { "libraryName": "antd"}, "ant"]
["import", { "libraryName": "antd-mobile"}, "antd-mobile"]
```

### `babelComponent`: [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component) config

`type: []/{}` `default: []`

`example:`

```
{ "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }
=>
["component", { "libraryName": "element-ui", "styleLibraryName": "theme-chalk" }]


[[{ "libraryName": "element-ui" }, "element-ui"]]
=>
["component", { "libraryName": "element-ui"}, "element-ui"],


[{ "libraryName": "element-ui"}, { "libraryName": "test-module"}]
=>
["component", { "libraryName": "element-ui"}]
["component", { "libraryName": "test-module"}]


[
  [{ "libraryName": "element-ui"}, "element-ui"],
  [{ "libraryName": "test-module"}, "test-module"]
]
=>
["component", { "libraryName": "element-ui"}, "element-ui"]
["component", { "libraryName": "test-module"}, "test-module"]
```

### `babelExclude`: [babel-loader](https://github.com/babel/babel-loader) exclude

`type: []` `default: [/node_modules/]`

### `babelPresets`: extra babel presets

`type: []` `default: []`

### `babelPlugins`: extra babel plugins

`type: []` `default: []`

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

### `flow`: whether to use [flow](https://github.com/facebook/flow)

`type: bool` `default: false`

### `flowRuntime`: whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime)

`type: bool` `default: false`

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

### `splitJs`: split one bundle js to many pieces

`type: {}` `default: {}`

```
{
  lib1: ['react', 'react-dom'],
  lib2: ['jquery'],
}
```

### `devtool`: [devtool](https://webpack.js.org/configuration/devtool/) config

`type: string`

`default:`

- `cmd: dev, serve`: `eval-source-map`
- `cmd: build, sync, start`: `source-map`

### `rules`: extra webpack rules

`type: []` `default: []`

### `plugins`: extra webpack plugins

`type: []` `default: []`

## files of an entry

A entry has a standalone directory(`src/home/about/` if entry `home/about`), also called workspace, and at least a `index.html` file and a `index.js` file under the workspace.

If `entry` is not provided, `@lila/index` will be used as default.

If entry is `@lila/index`, its workspace is `src`:

```
|-- src/
    |-- index.html
    |-- index.js

    |-- other files and directories
```

Others(entry is `home/about`), its workspace is `src/home/about`:

```
|-- src/
    |-- home/
        |-- about/
            |-- index.html
            |-- index.js

            |-- other files and directories
```

It's recommended to place all files of an entry to its workspace.

## built-in rules

- [babel-loader](https://github.com/babel/babel-loader)
- [url-loader](https://github.com/webpack-contrib/url-loader)
- [html-loader](https://github.com/webpack-contrib/html-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
- [less-loader](https://github.com/webpack-contrib/less-loader)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)
