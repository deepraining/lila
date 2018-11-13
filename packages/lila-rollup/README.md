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

If you run `lila build` directly, `index` entry will be added, `lila build index`.

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

### `port`: local server port

`type: number` `default: 8090`

### `browserSync`: [browser-sync](https://github.com/BrowserSync/browser-sync) config

`type: {}` `default: {}`

### `watch`: [chokidar](https://github.com/paulmillr/chokidar) watching files' changes for `start` command(globs relative to `root`)

`globs/[globs, options]` `default: 'src'`

## node packages

- [rollup](https://github.com/rollup/rollup): 0.66
