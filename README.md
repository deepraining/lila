# lila

Extensible, multiple entries supporting, tasks based wrapper of [gulp](https://github.com/gulpjs/gulp), [commander.js](https://github.com/tj/commander.js).

## packages

- [lila-bin](./packages/lila-bin): lila command line tool
- [lila-core](./packages/lila-core): lila core library
- [lila-tasks](./packages/lila-tasks): lila built-in tasks

## setup

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

Configure init file `lila.js`(`lila.init.js` in windows).

```
// lila-core should not be imported directly

import tasksPlugin from 'lila-tasks';
import otherPlugin from 'lila-other-plugin';

// here should export a function
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
