# lila-rollup

Lila rollup plugin.

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

### `start`: start a local server to develop a page

```
lila start page
```

### `build`: pack source codes to distribution bundles

```
lila build page1 page2 page3 ...
```

If you run `lila build` directly, `index` page will be added, `lila build index`.

## extended tasks

### `@lila/rollup`: run rollup

```
'@lila/rollup'
```

## extended settings

### `rollupConfigGenerator`: generate rollup config

```
rollup => ({page, args, argv, cmd, config, lila}) => config
```

### `getPages`: get all pages with imported pages, when you want to use `*, all` special mark

```
(pages, srcDir) => allPages;
```

## extended configs

### `forceGet`: `bool`, default `true`, force all ajax methods as `get`

Normally, only `get` method can access static file, and `post, put, delete ...` will cause `404`.

### `mock`: `bool`, default `true`, use js files to generate mock data

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

### `port`: `number`, default `8090`, local server port

### `browserSync`: `{}`, default `{}`, [browser-sync](https://github.com/BrowserSync/browser-sync) config

## api

### `rollupPlugin`: main export function

```
const rollupPlugin = require('lila-rollup');

module.exports = lila => {
  rollupPlugin(lila);

  ...
};
```

### `addCmdOption`: add option for command

```
const rollupPlugin = require('lila-rollup');
const { addCmdOption } = rollupPlugin;

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

- [rollup](https://github.com/rollup/rollup): 0.66
