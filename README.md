# lila

A wrapper of [gulp](https://github.com/gulpjs/gulp), [webpack](https://github.com/webpack/webpack), [rollup](https://github.com/rollup/rollup), etc.

## packages

- [create-lila-app](./packages/create-lila-app): create a lila application
- [lila-cli](./packages/lila-cli): lila command line
- [lila-core](./packages/lila-core): lila core library
- [lila-webpack](./packages/lila-webpack): webpack plugin for lila
- [lila-webpack-config](./packages/lila-webpack-config): built-in webpack generator for webpack plugin

## setup

You can install [create-lila-app](./packages/create-lila-app) to create a lila application, however, you can customize your own project:

1. Install [lila-cli](./packages/lila-cli). If installed globally, you can run lila commands directly in terminal, and if installed locally, you can run lila commands directly by `npm run`.
2. Install [lila-core](./packages/lila-core) locally. You should not import it directly, like `import lila from 'lila-core'` or `const lila = require('lila-core')`, but `module.exports = lila => { ... }` in `lila.js` or plugin.
3. Choose appropriate plugins.
   - If build a project, it's recommended to choose [lila-webpack](./packages/lila-webpack) and [lila-webpack-config](./packages/lila-webpack-config).
   - If build a library, it's recommended to choose [lila-rollup](./packages/lila-rollup) and [lila-rollup-config](./packages/lila-rollup-config). Alternatively, you can also choose [lila-webpack-lib](./packages/lila-webpack-lib) and [lila-webpack-lib-config](./packages/lila-webpack-lib-config).
4. Configure entry file `lila.js`.

## base directory structure

```
|-- /
    |-- src/
    |-- dev/
    |-- build/
```

- `src`: where to place source codes, like `html, css, less, js, ts, ...`
- `dev`: a temporary directory generated while developing
- `build`: where production bundles will be placed

If you want custom names, you can change them by `lila.setSettings({src, dev, build})`.

## how to write plugins

```
module.exports = lila => {
  // do everything you want
};
```

## how to load plugins

In `lila.js`:

```
const plugin = require('your-lila-plugin');

module.exports = lila => {
  plugin(lila);

  ...
};
```
