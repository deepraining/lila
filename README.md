# lila

Extensible, multiple entries supporting, tasks based wrapper of [gulp](https://github.com/gulpjs/gulp), [webpack](https://github.com/webpack/webpack), [rollup](https://github.com/rollup/rollup), etc.

## packages

- [create-lila-app](./packages/create-lila-app): tool to create a lila application
- [lila-bin](./packages/lila-bin): lila command line tool
- [lila-core](./packages/lila-core): lila core library
- [lila-tasks](./packages/lila-tasks): lila built-in tasks
- [lila-webpack](./packages/lila-webpack): wrapped base webpack plugin
- [lila-webpack-config](./packages/lila-webpack-config): built-in webpack config generator for `lila-webpack`
- [lila-webpack-lib](./packages/lila-webpack-lib): wrapped base webpack plugin for building a library
- [lila-webpack-lib-config](./packages/lila-webpack-lib-config): built-in webpack config generator for `lila-webpack-lib`
- [lila-rollup](./packages/lila-rollup): wrapped base rollup plugin for building a library
- [lila-rollup-config](./packages/lila-rollup-config): built-in rollup config generator for `lila-rollup`

## setup

It's strongly recommended to install [create-lila-app](./packages/create-lila-app) to create a lila application.

```
npm i -g create-lila-app

create-lila-app <project-directory>
```

However, you can also customize your own project:

#### 1. install lila-bin

```
npm install lila-bin -g                # global

npm install lila-bin --save-dev        # local
```

If installed globally, you can run lila commands directly in terminal, like:

```
lila run
```

and if installed locally, you can run lila commands by [npm-scripts](https://docs.npmjs.com/misc/scripts):

```
# package.json

"scripts": {
  "run": "lila run"
}
```

#### 2. install lila-core and lila-tasks

```
npm install lila-core lila-tasks --save-dev
```

#### 3. choose appropriate plugins

If build a project, it's recommended to choose [lila-webpack](./packages/lila-webpack) and [lila-webpack-config](./packages/lila-webpack-config).

```
npm install lila-webpack lila-webpack-config --save-dev
```

If build a library, it's recommended to choose [lila-webpack-lib](./packages/lila-webpack-lib) and [lila-webpack-lib-config](./packages/lila-webpack-lib-config).

```
npm install lila-webpack-lib lila-webpack-lib-config --save-dev
```

If build a pure javascript library, it's recommended to choose [lila-rollup](./packages/lila-rollup) and [lila-rollup-config](./packages/lila-rollup-config).

```
npm install lila-rollup lila-webpack-rollup --save-dev
```

#### 4. configure init file

Configure init file `lila.js`(`lila.init.js` in windows).

```
// lila-core should not be imported directly

import tasksPlugin from 'lila-tasks';
import webpackPlugin from 'lila-webpack';
import webpackConfigPlugin from 'lila-webpack-config';

// here should export a function
export default lila => {

  // do some init actions

  tasksPlugin(lila);
  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  // here return a config generator
  return ({ entry, argv, cmd }) => {

    // make a config according to `entry, argv, cmd`
    const config = { ... }

    // return a config object
    return config;
  };
}
```

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
export default lila => {
  // do everything you want with lila api
};
```

## how to load plugins

In `lila.js`(`lila.init.js` in windows):

```
import plugin from 'your-lila-plugin';

export default lila => {
  plugin(lila);

  ...
};
```

## trouble shooting

- In windows, you have to use `lila.init.js` instead, and `lila.js` will not work.
- In windows, you must run `lila` command under the same directory with `node_modules`.
