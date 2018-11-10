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

### `babelImport`: `type: []/{}` `default: []` [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config

### `babelExclude`: `type: []` `default: [/node_modules/]` [babel-loader](https://github.com/babel/babel-loader) exclude

### `babelPresets`: `type: []` `default: []` extra babel presets

### `babelPlugins`: `type: []` `default: []` extra babel plugins

### `extensions`: `type: []` `default: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']` [url-loader](https://github.com/webpack-contrib/url-loader) file extensions

### `provide`: `type: {}` `default: {}` [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) config

### `define`: `type: {}` `default: {}` [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) config

### `banner`: `type: string` default empty string, [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/) config

### `alias`: `type: {}` `default: {}` [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) config

### `flow`: `type: bool` `default: false` whether to use [flow](https://github.com/facebook/flow)

### `flowRuntime`: `type: bool` `default: false` whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime)

### `minJs`: `type: bool` `default: true` whether minify js

### `minCss`: `type: bool` `default: true` whether minify css

### `devtool`: `type: string` [devtool](https://webpack.js.org/configuration/devtool/) config, default:

- `cmd: start`: `cheap-module-eval-source-map`
- `cmd: build`: `module-source-map`

### `filename`: `type: string` `default: empty string` library file name

### `library`: `type: string` `default: Index` library exported global name, see [output-library](https://webpack.js.org/configuration/output/#output-library)

### `externals`: see [externals](https://webpack.js.org/configuration/externals/#externals)

### `rules`: `type: []` `default: []` extra webpack rules

### `plugins`: `type: []` `default: []` extra webpack plugins

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
