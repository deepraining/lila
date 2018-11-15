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

If `entry` is not provided, `@lila/index` will be used as default.

### `serve`: simulate a backend environment to start a local server to develop an entry

```
lila serve entry
```

If `entry` is not provided, `@lila/index` will be used as default.

### `build`: pack source codes to production bundles

```
lila build entry1 entry2 entry3 ...
```

If `entry` is not provided, `@lila/index` will be used as default.

### `sync`: make production bundles, then sync to remote servers

```
lila sync entry1 entry2 entry3 ...
```

If `entry` is not provided, `@lila/index` will be used as default.

### `start`: make production bundles, then start a local server to preview

```
lila start entry
```

If `entry` is not provided, `@lila/index` will be used as default.

### `analyze`: visualize size of webpack output files

```
lila analyze entry
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

### `getEntries`: get all entries under a dir

```
dir => entries;
```

### `servePath`: get serve js file path for command `serve`(relative to `root`)

```
(entry, srcDir) => path
```

serve js file:

```
module.exports = (content, req) => newContent;
```

- `content`: html file content
- `req`: [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
- `newContent`: new html content

## extended configs

### `forceGet`: force all ajax methods as `get`

`type: bool` `default: true`

Normally, only `get` method can access static file, and `post, put, delete ...` will cause `404`.

### `mock`: use js files to generate mock data

`type: bool` `default: true`

In most occasions, you can use `json` files to provide mock data, but when we want dynamic data, `json` files won't work.

`url`: `/src/api/user/profile?id=1`

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

### `mockRoot`: mock root url prefix(relative to `root`)

`type: string`

`default:`

- `entry` is `@lila/index`: `/src`
- `entry` is others: `/src/${entry}`

If `mockRoot` is `/src/api`, when access to `/user/profile?id=1`, lila will try:

1. `/user/profile.js`: `module.exports = (req, res) => { ... }`
2. `/user.js`: `module.exports = { profile: (req, res) => { ... } }`
3. `/src/api/user/profile.js`: `module.exports = (req, res) => { ... }`
4. `/src/api/user.js`: `module.exports = { profile: (req, res) => { ... } }`

### `port`: local server port

`type: number` `default: 8090`

### `browserSync`: [browser-sync](https://github.com/BrowserSync/browser-sync) config

`type: {}` `default: {}`

### `devMiddleware`: [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) config

`type: {}` `default: { watchOptions: { ignored: /node_modules/ } }`

### `hotMiddleware`: [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) config

`type: {}` `default: {}`

### `bundleAnalyzer`: [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) config

`type: {}` `default: { analyzerPort: 8190 }`

## entry specification

- `home/about`: a single entry
- `home/*` or `home/all`: all entries under `home` directory
- `*` or `all`: all entries of project

## node packages

- [webpack](https://github.com/webpack/webpack): 4.x
