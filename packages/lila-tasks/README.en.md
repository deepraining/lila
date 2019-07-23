# lila-tasks

[中文文档](./README.md)

Lila built-in tasks.

## install

```
npm install --save-dev lila-tasks
```

## use

In `lila.js`:

```
import tasksPlugin from 'lila-tasks';

export default lila => {
  tasksPlugin(lila);

  ...
};
```

## built-in tasks

### `@lila/make`: create a file(relative to `root`)

```
['@lila/make', {file, content, force}]}]
```

- `file`: `type: string` file to handle.
- `content`: `type: string` file content.
- `force`: `type: bool` `default: false` whether to override if file already existed.

### `@lila/replace`: replace file content(relative to `root`)

```
['@lila/replace', {file, replace: [{target, replacement}]}]
```

- `file`: `type: string` file to handle.
- `replace`: `type: []` options to replace.
  - `target`: `type: string|RegExp` target to be replaced.
  - `replacement`: `type: string` string to replace.

### `@lila/insert`: insert file content(relative to `root`)

```
['@lila/insert', {file, start, end}]
```

- `file`: `type: string` file to handle.
- `start`: `type: string` content to prepend.
- `end`: `type: string` content to append.

### `@lila/convert`: convert file extension(relative to `root`)

```
['@lila/convert', {file, ext}]
```

- `file`: `type: string` file to handle.
- `ext`: `type: string` extension name, like `php, jsp`.

### `@lila/backup`: backup file(relative to `root`)

Copy file to a suffixed name, `index.html -> index.2000-01-02-03-04-05.html`.

```
['@lila/backup', {file, suffix}]
```

- `file`: `type: string` file to handle.
- `suffix`: `type: string` `default: (new Date()).getTime()` `index.html -> index.${suffix}.html`.

### `@lila/move`: move file or directory(relative to `root`)

```
['@lila/move', {source, target, force}]
```

- `source`: `type: string` source file or directory
- `target`: `type: string` target file or directory
- `force`: `type: bool` `default: false` whether to override if target already existed.

### `@lila/copy`: copy file or directory(relative to `root`)

```
['@lila/copy', {source, target, force}]
```

- `source`: `type: string` source file or directory
- `target`: `type: string` target file or directory
- `force`: `type: bool` `default: false` whether to override if target already existed.

### `@lila/del`: delete files or directories(relative to `root`)

```
['@lila/del', file]
['@lila/del', dir]
['@lila/del', [file1, dir2, dir3, ...]]
```

### `@lila/del-dev`: delete dev directory

```
'@lila/del-dev'
```

### `@lila/del-build`: delete build directory

```
'@lila/del-build'
```

### `@lila/del-tmp`: delete tmp directory

```
'@lila/del-tmp'
```

### `@lila/sync`: sync files to remote server

```
['@lila/sync', {src, server, remotePath}]
```

- `src`: `globs/[globs, options]` [gulp.src](https://gulpjs.com/docs/en/api/src)
- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.
- `cache`: `type: boolean` `default: false` whether to cache files.
- `cacheFileName`: `type: string` `default: cache` file name to record cache.

### `@lila/sync-save-cache`: save files handling record after `@lila/sync` task

```
['@lila/save-cache', {cacheFileName}]
```

- `cacheFileName`: `type: string` `default: cache` file name to record cache.

### `@lila/sync-dir`: sync directories to remote server(relative to `root`)

```
['@lila/sync-dir', {server, remotePath, dirs}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.
- `dirs`: `type: string/array` directories to sync.

### `@lila/sync-build`: sync build directory to remote server(relative to `root`)

```
['@lila/sync-build', {server, remotePath, sourceMap}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.
- `sourceMap`: `type: bool` `default: true` whether to upload source-map files.

### `@lila/sync-html`: sync html files to remote server(relative to build)

```
['@lila/sync-html', {server, remotePath, ext}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.
- `ext`: `type: string` `default: html` html file extension.

### `@lila/sync-source-map`: sync source-map files to remote server(relative to build)

```
['@lila/sync-source-map', {server, remotePath}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` remote server path to upload to.

### `@lila/remote-shell`: execute shell scripts on remote server

```
['@lila/remote-shell', {server, scripts, log}]
```

- `server`: `type: {}` server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `scripts`: `type: string/array` shell scripts to execute on remote server.
- `log`: `type: string` `default: remote-shell.log` log file.

### `@lila/shell`: execute shell scripts

```
['@lila/shell', {command, args, options}]
```

- `command, args, options`: see [child_process spawn](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options)

### `@lila/clean-cache`: remove handled files by last handling, and remain new files, mainly for `build` directory

```
'@lila/clean-cache'
// or
['@lila/clean-cache', {dir, cacheFileName}]
```

- `dir`: `type: string` directory to handle(relative to `root`)
- `cacheFileName`: `type: string` `default: cache` file name to record cache.

### `@lila/save-cache`: save files handling record, mainly for `build` directory

```
'@lila/save-cache'
// or
['@lila/save-cache', {dir, cacheFileName}]
```

- `dir`: `type: string` directory to handle(relative to `root`)
- `cacheFileName`: `type: string` `default: cache` file name to record cache.
