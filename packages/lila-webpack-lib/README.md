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

If `entry` is not provided, `@lila/index` will be used as default.

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
(entries, srcPath) => allEntries;
```

## extended configs

### `forceGet`: force all ajax methods as `get`

`type: bool` `default: true`

Normally, only `get` method can access static file, and `post, put, delete ...` will cause `404`.

### `mock`: use js files to generate mock data

`type: bool` `default: true`

In most occasions, you can use `json` files to provide mock data, but when we want dynamic data, `json` files won't work.

`url`: `/src/api/user/profile/?id=1`

First try `/src/api/user/profile.js`:

```
module.exports = (req, res) => {
  // do everything you want
};
```

Second try `/src/api/user.js`:

```
module.exports = {
  profile: (req, res) => {
    // do everything you want
  }
};
```

`req, res` refers to [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html), and file name should not contain `.` character, or it will be treated as a static file.

### `port`: local server port

`type: number` `default: 8090`

### `browserSync`: [browser-sync](https://github.com/BrowserSync/browser-sync) config

`type: {}` `default: {}`

### `devMiddleware`: [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) config

`type: {}` `default: { watchOptions: { ignored: /node_modules/ } }`

### `hotMiddleware`: [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) config

`type: {}` `default: {}`

## node packages

- [webpack](https://github.com/webpack/webpack): 4.x
