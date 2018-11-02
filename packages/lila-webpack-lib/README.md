# lila-webpack-lib

Lila webpack plugin for building a library.

## install

```
npm install --save-dev lila-webpack-lib
```

## use

In `lila.js`:

```
const webpackPlugin = require('lila-webpack-lib');

module.exports = lila => {
  webpackPlugin(lila);

  ...
};
```

## extended commands

### `start`: start a local server to develop an entry

```
lila start entry
```

### `build`: pack source codes to distribution bundles

```
lila build entry1 entry2 entry3 ...
```

If you run `lila build` directly, `index` entry will be added, `lila build index`.

## extended tasks

### `@lila/webpack`: run webpack

```
'@lila/webpack'
```

## extended settings

### `webpackConfigGenerator`: generate webpack config

```
webpack => ({entry, args, argv, cmd, config, lila}) => config
```

### `getEntries`: get all entries with imported entries, when you want to use `*, all` special mark

```
(entries, srcDir) => allEntries;
```

## extended configs

### `forceGet`: `type: bool` `default: true` force all ajax methods as `get`

Normally, only `get` method can access static file, and `post, put, delete ...` will cause `404`.

### `mock`: `type: bool` `default: true` use js files to generate mock data

In most occasions, you can use `json` files to provide mock data, but when we want dynamic data, `json` files won't work.

```
# directory structure
|-- src/home/mock/
    |-- file1.js
    |-- file2.js
    |-- ...

# file1.js, file2.js, ...
module.exports = (req, res) => {
  // do everything you want
};
```

`req, res` refers to [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html), and file name `file1, file2, ...` should not contain `.` character.

Now, you can access them through `/src/home/mock/file1, /src/home/mock/file2, ...`.

### `port`: `type: number` `default: 8090` local server port

### `browserSync`: `type: {}` `default: {}` [browser-sync](https://github.com/BrowserSync/browser-sync) config

### `devMiddleware`: `type: {}` `default: { watchOptions: { ignored: /node_modules/ } }` [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) config

### `hotMiddleware`: `type: {}` `default: {}` [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) config

## api

### `webpackPlugin`: main export function

```
const webpackPlugin = require('lila-webpack-lib');

module.exports = lila => {
  webpackPlugin(lila);

  ...
};
```

### `addCmdOption`: add option for command

```
const webpackPlugin = require('lila-webpack-lib');
const { addCmdOption } = webpackPlugin;

module.exports = lila => {
  // writing format
  addCmdOption(cmd, ...option);

  // an instance
  addCmdOption('build', '-e, --env', 'specify server environment');

  ...
};
```

- `option`: see [commander.js#command-specific-options](https://github.com/tj/commander.js#command-specific-options)

## node packages

- [webpack](https://github.com/webpack/webpack): 4.x
