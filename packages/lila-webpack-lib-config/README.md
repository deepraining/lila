# lila-webpack-lib-config

Lila webpack config for building a library.

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

### `getPages`: see [getPages](./src/settings.js#L6)

`all, *` means all pages under `src`.

## extended configs

### `babelImport`: `[]`, default `[]`, [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config

### `babelExclude`: `[]`, default `[/node_modules/]`, [babel-loader](https://github.com/babel/babel-loader) exclude

### `extensions`: `[]`, default `['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`, [url-loader](https://github.com/webpack-contrib/url-loader) file extensions

### `provide`: `{}`, default `{}`, [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) config

### `define`: `{}`, default `{}`, [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) config

### `banner`: `string`, default empty string, [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/) config

### `alias`: `{}`, default `{}`, [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) config

### `flow`: `bool`, default `false`, whether to use [flow](https://github.com/facebook/flow)

### `flowRuntime`: `bool`, default `false`, whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime)

### `minJs`: `bool`, default `true`, whether minify js

### `minCss`: `bool`, default `true`, whether minify css

### `devtool`: `string`, [devtool](https://webpack.js.org/configuration/devtool/) config, default:

- `cmd: start`: `cheap-module-eval-source-map`
- `cmd: build`: `module-source-map`

### `filename`: `string`, default `index`, library file name

### `library`: `string`, default `Index`, library exported global name, see [output-library](https://webpack.js.org/configuration/output/#output-library)

### `libraryTarget`: `string,`default `umd`, see [output-librarytarget](https://webpack.js.org/configuration/output/#output-librarytarget)

### `externals`: see [externals](https://webpack.js.org/configuration/externals/#externals)

### `rules`: `[]`, default `[]`, extra webpack rules

### `plugins`: `[]`, default `[]`, extra webpack plugins

## files of a page

A page has a standalone directory, also called workspace.

### for `build` command

For `build` command, a page has at least a `index.js` file.

If page is `index`, its workspace is `src`:

```
|-- src/
    |-- index.js

    |-- other files and directories
```

Others(page is `main`), its workspace is `src/main`:

```
|-- src/
    |-- main/
        |-- index.js

        |-- other files and directories
```

### for `start` command

For `start` command, a page has at least a `index.html` file and a `index.js` file.

If page is `example`, its workspace is `example`:

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
