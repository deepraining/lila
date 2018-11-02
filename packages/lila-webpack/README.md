# lila-webpack

Lila webpack plugin.

## install

```
npm install --save-dev lila-webpack
```

## use

In `lila.js`:

```
const webpackPlugin = require('lila-webpack');

module.exports = lila => {
  webpackPlugin(lila);

  ...
};
```

## extended commands

### `dev`: start a local server to develop an entry

```
lila dev entry
```

### `build`: pack source codes to production bundles

```
lila build entry1 entry2 entry3 ...
```

### `sync`: make production bundles, then sync to remote servers

```
lila sync entry1 entry2 entry3 ...
```

### `start`: make production bundles, then start a local server to preview

```
lila start entry
```

### `analyze`: visualize size of webpack output files

```
lila analyze entry
```

### `serve`: simulate a backend environment to start a local server to develop an entry

```
lila serve entry
```

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

### `getEntries`: get all entries under a dir

```
dir => entries;
```

### `servePath`: get serve js file path for command `serve`

```
(entry, srcDir) => path
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

### `bundleAnalyzer`: `type: {}` `default: { analyzerPort: 8190 }` [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) config

## entry specification

- `home/about`: a single entry
- `home/*` or `home/all`: all entries under `home` directory
- `*` or `all`: all entries of project

## api

### `webpackPlugin`: main export function

```
const webpackPlugin = require('lila-webpack');

module.exports = lila => {
  webpackPlugin(lila);

  ...
};
```

### `addCmdOption`: add option for command

```
const webpackPlugin = require('lila-webpack');
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
