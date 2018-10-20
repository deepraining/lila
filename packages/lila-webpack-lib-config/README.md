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

### `babelImport`: [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config, default `[]`

### `babelExclude`: [babel-loader](https://github.com/babel/babel-loader) exclude, default `[/node_modules/]`

### `extensions`: [url-loader](https://github.com/webpack-contrib/url-loader) file extensions, default `['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`

### `provide`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) config, default `{}`

### `define`: [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) config, default `{}`

### `banner`: [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/) config, default empty string

### `alias`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) config, default `{}`

### `flow`: whether to use [flow](https://github.com/facebook/flow), default `false`

### `flowRuntime`: whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime), default `false`

### `minJs`: whether minify js, default `false`

### `minCss`: whether minify css, default `false`

### `filename`: library file name, default `index`

### `library`: library exported global name, default `Index`, see [output-library](https://webpack.js.org/configuration/output/#output-library)

### `libraryTarget`: default `umd`, see [output-librarytarget](https://webpack.js.org/configuration/output/#output-librarytarget)

### `externals`: see [externals](https://webpack.js.org/configuration/externals/#externals)

### `rules`: extra webpack rules, default `[]`

### `plugins`: extra webpack plugins, default `[]`

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
