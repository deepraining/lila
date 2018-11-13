# lila-webpack-lib-config

Config generator for lila webpack-lib plugin.

## install

```
npm install --save-dev lila-webpack-lib-config
```

## use

In `lila.js`:

```
const webpackConfigPlugin = require('lila-webpack-lib-config');

module.exports = lila => {
  webpackConfigPlugin(lila);

  ...
};
```

## extended settings

### `webpackConfigGenerator`: see [webpackConfigGenerator](./src/index.js#L8)

### `getEntries`: see [getEntries](./src/settings.js#L6)

`all, *` means all entries under `src`.

## extended configs

### `babelImport`: [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config

`type: []/{}` `default: []`

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

### `banner`: [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/) config

`type: string` `default: empty string`

### `alias`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) config

`type: {}` `default: {}`

### `flow`: whether to use [flow](https://github.com/facebook/flow)

`type: bool` `default: false`

### `flowRuntime`: whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime)

`type: bool` `default: false`

### `minJs`: whether minify js

`type: bool` `default: true`

### `minCss`: whether minify css

`type: bool` `default: true`

### `devtool`: [devtool](https://webpack.js.org/configuration/devtool/) config

`type: string`

`default:`

- `cmd: start`: `eval-source-map`
- `cmd: build`: `source-map`

### `filename`: library file name

`type: string` `default: empty string`

### `library`: library exported global name, see [output-library](https://webpack.js.org/configuration/output/#output-library)

`type: string` `default: Index`

### `externals`: see [externals](https://webpack.js.org/configuration/externals/#externals)

### `rules`: extra webpack rules

`type: []` `default: []`

### `plugins`: extra webpack plugins

`type: []` `default: []`

## files of an entry

A entry has a standalone directory, also called workspace.

### for `build` command

For `build` command, an entry has at least a `index.js` file.

If entry is not provided, `index` will be used as default.

If entry is `index`, its workspace is `src`:

```
|-- src/
    |-- index.js

    |-- other files and directories
```

Others(entry is `main`), its workspace is `src/main`:

```
|-- src/
    |-- main/
        |-- index.js

        |-- other files and directories
```

### for `start` command

For `start` command, an entry has at least a `index.html` file and a `index.js` file.

If entry is `example`, its workspace is `example`:

```
|-- src/
|-- example/
    |-- index.html
    |-- index.js

    |-- other files and directories
```

## built-in rules

- [babel-loader](https://github.com/babel/babel-loader)
- [url-loader](https://github.com/webpack-contrib/url-loader)
- [html-loader](https://github.com/webpack-contrib/html-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
- [less-loader](https://github.com/webpack-contrib/less-loader)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)
