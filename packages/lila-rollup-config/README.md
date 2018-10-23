# lila-rollup-config

Lila rollup config.

## install

```
npm install --save-dev lila-rollup-config
```

## use

In `lila.js`:

```
const rollupConfigPlugin = require('lila-rollup-config');

module.exports = lila => {
  rollupConfigPlugin(lila);

  ...
};
```

## extended settings

### `getPages`: see [getPages](./src/settings.js#L6)

`all, *` means all pages under `src`.

## extended configs

### `babelImport`: [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config, default `[]`

### `babelExclude`: [babel-loader](https://github.com/babel/babel-loader) exclude, default `[/node_modules/]`

### `banner`: [rollup](https://rollupjs.org/guide/en) output banner, default empty string

### `alias`: [rollup-plugin-alias](https://github.com/rollup/rollup-plugin-alias) config, default `{}`

### `inject`: [rollup-plugin-inject](https://github.com/rollup/rollup-plugin-inject) config, default `{}`

### `nodeResolve`: whether to use [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve), default `false`

### `flow`: whether to use [flow](https://github.com/facebook/flow), default `false`

### `flowRuntime`: whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime), default `false`

### `minJs`: whether minify js, default `true`

### `minCss`: whether minify css, default `true`

### `filename`: library file name, default `index`

### `name`: [rollup](https://rollupjs.org/guide/en) output name, default `Index`

### `plugins`: extra rollup plugins, default `[]`

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
