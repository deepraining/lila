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

`url`: `/api/user/profile?id=1`

First try `/api/user/profile.js`:

```
// export a function, an object, a string
module.exports = (req, res) => {
  // do everything you want
};

// or export an object, a string(not function)
module.exports = {
  success: true,
  message: 'ok',
  data: { ... },
};
```

Second try `/api/user.js`:

```
// export a function
module.exports = {
  profile: (req, res) => {
    // do everything you want
  }
};

// or export an object, a string(not function)
module.exports = {
  profile: {
    success: true,
    message: 'ok',
    data: { ... },
  }
};
```

`req, res` refers to [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html), and file name should not contain `.` character, or it will be treated as a static file.

### `mockRoot`: extra mock root url prefix(relative to `root`)

`type: string/function`

When use mock data, maybe you don't like url to be that long, such as use `/one/page/mock/list` to access `/one/page/mock/list.js` file.

Lila internally provide a convenient way to do that.

If `url` try to get a mock data from `/one/page/mock/list.js` file, lila will try urls in sequences as follows:

1. `url`: try itself `/one/page/mock/list`
2. `/mock/url`: try `mock` prefix
3. `/${entry}/url`: try under entry's workspace, you can use `/mock/list`
4. `/${entry}/mock/url`: try `mock` prefix under entry's workspace, you can use `/list`

If you want more convenient ways, you can add your own ways by `mockRoot`.

```
// a string
mockRoot: '/some/directory'

// strings
mockRoot: ['/first/directory', '/second/directory']

// return a string
mockRoot: (entry, lila) => '/some/directory';

// return strings
mockRoot: (entry, lila) => ['/first/directory', '/second/directory']
```

### `port`: local server port

`type: number` `default: 8090`

### `browserSync`: [browser-sync](https://github.com/BrowserSync/browser-sync) config

`type: {}` `default: {}`

### `watch`: [chokidar](https://github.com/paulmillr/chokidar) watching files' changes for `start` command(globs relative to `root`)

`globs/[globs, options]` `default: 'src'`

## node packages

- [rollup](https://github.com/rollup/rollup): 0.66
