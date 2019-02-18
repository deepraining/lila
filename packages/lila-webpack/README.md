# lila-webpack

Lila webpack plugin.

## install

```
npm install --save-dev lila-webpack
```

## use

In `lila.js`:

```
import webpackPlugin from 'lila-webpack';

export default lila => {
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
(dirPath, srcPath, root) => entries
```

### `servePath`: get serve js file path for command `serve`(relative to `root`)

```
(entry, srcDir) => path
```

serve js file:

```
export default (content, req) => newContent;
```

- `content`: html file content
- `req`: [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
- `newContent`: new html content

### `beforeCommand`: pre handling before each command starting

```
({cmd, argv, lila}) => { ... }
```

If you want to make some pre handling, you can do it here, like:

- use [chokidar](https://github.com/paulmillr/chokidar) to watch files' changes, and generate js files dynamically
- do some initializations or print some messages

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
// export a function, an object, a string
export default (req, res) => {
  // do everything you want
};

// or export an object, a string(not function)
export default {
  success: true,
  message: 'ok',
  data: { ... },
};
```

Second try `/src/api/user.js`:

```
// export a function
export const profile = (req, res) => {
  // do everything you want
};

// or export an object, a string(not function)
export const profile = {
  success: true,
  message: 'ok',
  data: { ... },
}
```

`req, res` refers to [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html), and file name should not contain `.` character, or it will be treated as a static file.

### `mockRoot`: extra mock root url prefix(relative to `root`)

`type: string/function`

When use mock data, maybe you don't like url to be that long, such as use `/src/one/page/mock/list` to access `/src/one/page/mock/list.js` file.

Lila internally provide a convenient way to do that.

If `url` try to get a mock data from `/src/one/page/mock/list.js` file, lila will try urls in sequences as follows:

1. `url`: try itself `/src/one/page/mock/list`
2. `/mock/url`: try `mock` prefix
3. `/${srcDir}/url`: try under src directory, you can use `/one/page/mock/list`
4. `/${srcDir}/mock/url`: try `mock` prefix src directory
5. `/${srcDir}/${entry}/url`: try under entry's workspace, you can use `/mock/list`
6. `/${srcDir}/${entry}/mock/url`: try `mock` prefix under entry's workspace, you can use `/list`

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

## npm packages

- [webpack](https://github.com/webpack/webpack): 4.x
