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

### `getEntries`: see [getEntries](./src/settings.js#L6)

`all, *` means all entries under `src`.

## extended configs

### `babelImport`: `type: []/{}` `default: []` [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) config

### `babelExclude`: `type: []` `default: [/node_modules/]` [babel-loader](https://github.com/babel/babel-loader) exclude

### `babelPresets`: `type: []` `default: []` extra babel presets

### `babelPlugins`: `type: []` `default: []` extra babel plugins

### `banner`: `type: string` `default: empty string` [rollup](https://rollupjs.org/guide/en) output banner

### `alias`: `type: {}` `default: {}` [rollup-plugin-alias](https://github.com/rollup/rollup-plugin-alias) config

### `inject`: `type: {}` [rollup-plugin-inject](https://github.com/rollup/rollup-plugin-inject) config, default

```
{
  include: ['**/*.js', '**/*.jsx'],
  exclude: 'node_modules/**',
}
```

### `flow`: `type: bool` `default: false` whether to use [flow](https://github.com/facebook/flow)

### `flowRuntime`: `type: bool` `default: false` whether to use [flow-runtime](https://github.com/codemix/flow-runtime/tree/master/packages/flow-runtime)

### `minJs`: `type: bool` `default: true` whether minify js

### `minCss`: `type: bool` `default: true` whether minify css

### `filename`: `type: string` `default: empty string` library file name

### `name`: `type: string` `default: Index` [rollup](https://rollupjs.org/guide/en) output name

### `exterbal`: `type: *` rollup `external` config

### `globals`: `type: {}` rollup `globals` config

### `plugins`: `type: []` `default: []` extra rollup plugins

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
