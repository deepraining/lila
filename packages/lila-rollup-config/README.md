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

### `babelImport`: `[]`, default `[]`, [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config

### `babelExclude`: `[]`, default `[/node_modules/]`, [babel-loader](https://github.com/babel/babel-loader) exclude

### `banner`: `string`, default empty string, [rollup](https://rollupjs.org/guide/en) output banner

### `alias`: `{}`, default `{}`, [rollup-plugin-alias](https://github.com/rollup/rollup-plugin-alias) config

### `inject`: `{}`, default `{}`, [rollup-plugin-inject](https://github.com/rollup/rollup-plugin-inject) config

### `nodeResolve`: `bool`, default `false`, whether to use [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve)

### `flow`: `bool`, default `false`, whether to use [flow](https://github.com/facebook/flow)

### `flowRuntime`: `bool`, default `false`, whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime)

### `minJs`: `bool`, default `true`, whether minify js

### `minCss`: `bool`, default `true`, whether minify css

### `filename`: `string`, default `index`, library file name

### `name`: `string`, default `Index`, [rollup](https://rollupjs.org/guide/en) output name

### `plugins`: `[]`, default `[]`, extra rollup plugins

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
