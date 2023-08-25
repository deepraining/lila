# lila

[中文文档](./README.md)

An extensible streaming build tool of [gulp](https://github.com/gulpjs/gulp), supporting multiple entries.

## packages

- [lila-bin](./packages/lila-bin): lila command line tool
- [lila-core](./packages/lila-core): lila core library
- [lila-tasks](./packages/lila-tasks): lila built-in tasks
- [lila-webpack](./packages/lila-webpack): wrapped webpack plugin
- [lila-webpack-config](./packages/lila-webpack-config): built-in webpack config generator for lila-webpack
- [create-lila-app](./packages/create-lila-app): tool to create a lila application

## setup

It's recommended to use [create-lila-app](./packages/create-lila-app) to create a lila application, or use ready-made templates:

- [react-app-starter](https://github.com/deepraining/react-app-starter): A boilerplate for creating a React application, using Webpack and Storybook.
- [react-ts-app-starter](https://github.com/deepraining/react-ts-app-starter): A boilerplate for creating a React application, using TypeScript, Webpack and Storybook.
- [vue-app-starter](https://github.com/deepraining/vue-app-starter): A boilerplate for creating a Vue application, using Webpack and Storybook.

However, you can also customize it as you like, just follow these steps:

#### 1. install lila-bin

```
npm install lila-bin -g                # global

npm install lila-bin --save-dev        # local
```

If installed globally, you can run lila commands directly in terminal, like:

```
lila <cmd> [options]
```

and if installed locally, you can run lila commands by [npm-scripts](https://docs.npmjs.com/misc/scripts):

```
# package.json

"scripts": {
  "run": "lila <cmd> [options]"
}
```

#### 2. install lila-core and lila-tasks

```
npm install lila-core lila-tasks --save-dev
```

#### 3. configure init file

Configure init file `lila.init.js`.

```
// lila-core should not be imported directly

import tasksPlugin from 'lila-tasks';
import otherPlugin from 'lila-other-plugin';

// here should export a function
// here lila object is lila-core package, and you can use all lila-core's api
export default lila => {

  // do some init actions

  tasksPlugin(lila);
  otherPlugin(lila);

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
- src/
- dev/
- build/
```

- `src`: where to place source codes, like `html, css, less, scss, js, ts, vue, ...`
- `dev`: a temporary directory, generated while developing
- `build`: where to generate production bundles

If you want custom names, you can modify them by:

```
lila.setSettings({
  src: yourSrcDir,
  dev: yourDevDir,
  build: yourBuildDir,
})
```

## how to write plugins

```
export default lila => {
  // here lila object is lila-core package, and you can do everything you want with lila api
};
```

## how to load plugins

In `lila.init.js`:

```
import plugin from 'your-lila-plugin';

export default lila => {
  plugin(lila);

  ...
};
```

## trouble shooting

- In Windows, you must run `lila` command under the same directory with `node_modules`.
