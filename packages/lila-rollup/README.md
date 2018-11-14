# lila-rollup

Lila rollup plugin for building a library.

## install

```
npm install --save-dev lila-rollup
```

## use

In `lila.js`:

```
const rollupPlugin = require('lila-rollup');

module.exports = lila => {
  rollupPlugin(lila);

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

### `@lila/rollup`: run rollup

```
'@lila/rollup'
```

## extended settings

### `rollupConfigGenerator`: generate rollup config

```
rollup => ({entry, args, argv, cmd, config, lila}) => config
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

### `mockRoot`: mock root url prefix(relative to `root`)

`type: string` `default: /${entry}`

If `mockRoot` is `/src/api`, when access to `/user/profile?id=1`, lila will try:

1. `/user/profile.js`: `module.exports = (req, res) => { ... }`
2. `/user.js`: `module.exports = { profile: (req, res) => { ... } }`
3. `/src/api/user/profile.js`: `module.exports = (req, res) => { ... }`
4. `/src/api/user.js`: `module.exports = { profile: (req, res) => { ... } }`

### `port`: local server port

`type: number` `default: 8090`

### `browserSync`: [browser-sync](https://github.com/BrowserSync/browser-sync) config

`type: {}` `default: {}`

### `watch`: [chokidar](https://github.com/paulmillr/chokidar) watching files' changes for `start` command(globs relative to `root`)

`globs/[globs, options]` `default: 'src'`

## node packages

- [rollup](https://github.com/rollup/rollup): 0.66
