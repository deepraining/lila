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

By default, a `index.html` will be generated under `build` directory, and this task is to modify its path, `build/index.html -> build/page/name.html`.

```
'@lila/correct-html'
// or
['@lila/correct-html', {source, target}]
```

- `source`: `string`, default `index.html`, source html file.
- `target`: `string|function`, default `${page}.html`, target html file. It can be a function, `page => target`.

### `@lila/replace-html`: replace html content

```
['@lila/replace-html', {file, replace: [{target, replacement}]}]
```

- `file`: `string|function`, default `${page}.html`, html file to handle. It can be a function, `page => file`.
- `replace`: `[]`, options to replace.
  - `target`: `string|RegExp`, target to be replaced.
  - `replacement`: `string`, string to replace.

### `@lila/insert-html`: insert html content

```
['@lila/insert-html', {file, start, end}]
```

- `file`: `string|function`, default `${page}.html`, html file to handle. It can be a function, `page => file`.
- `start`: `string`, content to prepend.
- `end`: `string`, content to append.

### `@lila/convert-html`: convert html extension

```
['@lila/convert-html', {file, ext}]
```

- `file`: `string|function`, default `${page}.html`, html file to handle. It can be a function, `page => file`.
- `ext`: `string`, extension name, like `php, jsp`.

### `@lila/backup-html`: backup html file

Copy html file to a suffixed name, `index.html -> index.2000-01-02-03-04-05.html`.

```
'@lila/backup-html'
// or
['@lila/backup-html', {suffix, ext}]
```

- `suffix`: `string`, default `(new Date()).getTime()`, `index.html -> index.${suffix}.html`.
- `ext`: `string`, default `html`, html file extension.

### `@lila/rename-html`: rename html path

```
['@lila/rename-html', {page, ext}]
```

- `page`: `string|function`, new page to rename to. It can be a function, `page => newPage`.
- `ext`: `string`, default `html`, html file extension.

### `@lila/sync-all`: sync all static resources to remote server

```
['@lila/sync-all', {server, remotePath, extra, cache, cacheFileName, sourceMap}]
```

- `server`: `{}`, server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `string`, remote server path to upload to.
- `extra`: `string[]`, extra directories to upload, same level of `build`.
- `cache`: `bool`, default `false`, whether cache uploading record, thus next time will only upload changed files.
- `cacheFileName`: `string|function`, default `cache`, file name to record cache. It can be a function, `({page, argv, cmd}) => fileName`.
- `sourceMap`: `bool`, default `false`, whether to upload sourcemap files.

### `@lila/save-cache`: save cache after sync-all task

```
'@lila/save-cache'
// or
['@lila/save-cache', {cacheFileName}]
```

- `cacheFileName`: `string|function`, default `cache`, file name to record cache. It can be a function, `({page, argv, cmd}) => fileName`.

### `@lila/sync-html`: sync html files to remote server

```
['@lila/sync-html', {server, remotePath, ext}]
```

- `server`: `{}`, server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `string`, remote server path to upload to.
- `ext`: `string`, default `html`, html file extension.

### `@lila/sync-sourcemap`: sync sourcemap files to remote server

```
['@lila/sync-sourcemap', {server, remotePath}]
```

- `server`: `{}`, server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `string`, remote server path to upload to.

### `@lila/del-dev`: delete dev directory

```
'@lila/del-dev'
```

### `@lila/del-build`: delete build directory

```
'@lila/del-build'
```
