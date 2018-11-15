# lila

Extensible, multiple entries supporting, tasks based wrapper of [gulp](https://github.com/gulpjs/gulp), [webpack](https://github.com/webpack/webpack), [rollup](https://github.com/rollup/rollup), etc.

## packages

- [create-lila-app](./packages/create-lila-app): create a lila application
- [lila-bin](./packages/lila-bin): lila command line
- [lila-core](./packages/lila-core): lila core library
- [lila-tasks](./packages/lila-tasks): lila built-in tasks
- [lila-webpack](./packages/lila-webpack): webpack plugin for lila
- [lila-webpack-config](./packages/lila-webpack-config): built-in webpack config generator for webpack plugin
- [lila-webpack-lib](./packages/lila-webpack-lib): webpack plugin for building a library
- [lila-webpack-lib-config](./packages/lila-webpack-lib-config): built-in webpack config generator for webpack-lib plugin
- [lila-rollup](./packages/lila-rollup): rollup plugin for building a library
- [lila-rollup-config](./packages/lila-rollup-config): built-in rollup config generator for rollup plugin

## setup

You can install [create-lila-app](./packages/create-lila-app) to create a lila application.

However, you can customize your own project:

1. Install [lila-bin](./packages/lila-bin). If installed globally, you can run lila commands directly in terminal, and if installed locally, you can run lila commands directly by `npm run`.
2. Install [lila-core](./packages/lila-core) and [lila-tasks](./packages/lila-tasks) locally. You should not import `lila-core` directly, like `import lila from 'lila-core'` or `const lila = require('lila-core')`, but `module.exports = lila => { ... }` in `lila.js` or plugin.
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

If you want custom names, you can modify them by `lila.setSettings({src, dev, build})`.

## how to write plugins

```
module.exports = lila => {
  // do everything you want with lila api
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
