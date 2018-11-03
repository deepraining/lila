# lila-tasks

Lila built-in tasks.

## install

```
npm install --save-dev lila-tasks
```

## use

In `lila.js`:

```
const tasksPlugin = require('lila-tasks');

module.exports = lila => {
  tasksPlugin(lila);

  ...
};
```

## built-in tasks

### `@lila/correct-html`: correct html path

By default, a `index.html` will be generated under `build` directory, and this task is to modify its path, `build/index.html -> build/entry/name.html`.

```
'@lila/correct-html'
// or
['@lila/correct-html', {source, target}]
```

- `source`: `type: string` `default: index.html` source html file.
- `target`: `type: string|function` `default: ${entry}.html` target html file. It can be a function, `entry => target`.

### `@lila/replace-html`: replace html content

```
['@lila/replace-html', {file, replace: [{target, replacement}]}]
```

- `file`: `type: string|function` `default: ${entry}.html` html file to handle. It can be a function, `entry => file`.
- `replace`: `type: []` options to replace.
  - `target`: `type: string|RegExp` target to be replaced.
  - `replacement`: `type: string` string to replace.

### `@lila/insert-html`: insert html content

```
['@lila/insert-html', {file, start, end}]
```

- `file`: `type: string|function` `default: ${entry}.html` html file to handle. It can be a function, `entry => file`.
- `start`: `type: string` content to prepend.
- `end`: `type: string` content to append.

### `@lila/convert-html`: convert html extension

```
['@lila/convert-html', {file, ext}]
```

- `file`: `type: string|function` `default: ${entry}.html` html file to handle. It can be a function, `entry => file`.
- `ext`: `type: string` extension name, like `php, jsp`.

### `@lila/backup-html`: backup html file

Copy html file to a suffixed name, `index.html -> index.2000-01-02-03-04-05.html`.

```
'@lila/backup-html'
// or
['@lila/backup-html', {suffix, ext}]
```

- `suffix`: `type: string` `default: (new Date()).getTime()` `index.html -> index.${suffix}.html`.
- `ext`: `type: string` `default: html` html file extension.

### `@lila/rename-html`: rename html path

```
['@lila/rename-html', {entry, ext}]
```

- `entry`: `type: string|function` new entry to rename to. It can be a function, `entry => newEntry`.
- `ext`: `type: string` `default: html` html file extension.

### `@lila/sync`: sync files to remote server

```
['@lila/sync', {src, server, remotePath}]
```

- `src`: `globs/[globs, options]` [gulp.src](https://github.com/gulpjs/gulp/blob/v4.0.0/docs/API.md#gulpsrcglobs-options)
- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.

### `@lila/sync-build`: sync build directory to remote server

```
['@lila/sync-build', {server, remotePath, extra, cache, cacheFileName, sourceMap}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.
- `extra`: `type: string[]` extra directories to upload, same level of `build`.
- `cache`: `type: bool` `default: false` whether cache uploading record, thus next time will only upload changed files.
- `cacheFileName`: `type: string|function` `default: cache` file name to record cache. It can be a function, `({entry, argv, cmd}) => fileName`.
- `sourceMap`: `type: bool` `default: false` whether to upload sourcemap files.

### `@lila/save-cache`: save cache after sync-build task

```
'@lila/save-cache'
// or
['@lila/save-cache', {cacheFileName}]
```

- `cacheFileName`: `type: string|function` `default: cache` file name to record cache. It can be a function, `({entry, argv, cmd}) => fileName`.

### `@lila/sync-html`: sync html files to remote server

```
['@lila/sync-html', {server, remotePath, ext}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.
- `ext`: `type: string` `default: html` html file extension.

### `@lila/sync-sourcemap`: sync sourcemap files to remote server

```
['@lila/sync-sourcemap', {server, remotePath}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.

### `@lila/remote-shell`: execute shell scripts on remote server

```
['@lila/remote-shell', {server, scripts, log}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `scripts`: `type: string/array` shell scripts to execute on remote server.
- `log`: `type: string/function` `default: remote-shell.log` log file. It can be a function, `({entry, argv, cmd}) => fileName`.

### `@lila/del-dev`: delete dev directory

```
'@lila/del-dev'
```

### `@lila/del-build`: delete build directory

```
'@lila/del-build'
```

### `@lila/del-dir`: delete directories(relative to cwd)

```
['@lila/del-dir', dir]
['@lila/del-dir', [dir1, dir2, dir3, ...]]
```

### `@lila/shell`: execute shell scripts

```
['@lila/shell', {command, args, options}]
```

- `command, args, options`: see [child_process spawn](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options)
