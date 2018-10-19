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

### `dev`: start a local server to develop a page

```
lila dev page
```

### `build`: pack source codes to production bundles

```
lila build page1 page2 page3 ...
```

### `sync`: make production bundles, then sync to remote servers

```
lila sync page1 page2 page3 ...
```

### `start`: make production bundles, then start a local server to preview

```
lila start page
```

### `analyze`: visualize size of webpack output files

```
lila analyze page
```

### `serve`: simulate a backend environment to start a local server to develop a page

```
lila serve page
```

## extended tasks

### `@lila/webpack`: run webpack

```
'@lila/webpack'
```

## extended settings

### `webpackConfigGenerator`: generate webpack config

```
webpack => ({page, args, argv, cmd, config, lila}) => config
```

### `getPages`: get all pages under a dir

```
dir => pages;
```

### `servePath`: get serve js file path for command `serve`

```
(page, srcDir) => path
```

## extended configs

### `forceGet`: force all ajax methods as `get`, default `true`

Normally, only `get` method can access static file, and `post, put, delete ...` will cause `404`.

### `mock`: use js files to generate mock data, default `true`

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

### `port`: local server port, default `8090`

### `browserSync`: [browser-sync](https://github.com/BrowserSync/browser-sync) config, default `{}`

### `devMiddleware`: [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) config, default `{ watchOptions: { ignored: /node_modules/ } }`

### `hotMiddleware`: [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) config, default `{}`

### `bundleAnalyzer`: [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) config, default `{ analyzerPort: 8190 }`

## page specification

- `home/about`: a single page
- `home/*` or `home/all`: all pages under `home` directory
- `*` or `all`: all pages of project

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
