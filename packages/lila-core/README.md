# lila-core

Lila core.

## install

```
npm install --save-dev lila-core
```

## use

```
// es6
import lila from 'lila-core';

// commonjs
const lila = require('lila-core');
```

## entry file

Lila requires an entry file called `lila.js` in project root directory.

```
const webpackPlugin = require('lila-webpack');
const webpackConfigPlugin = require('lila-webpack-config');

// should export a function
module.exports = lila => {

  // do some initialize actions

  webpackPlugin(lila);
  webpackConfigPlugin(lila);

  // return a config generator
  return ({ page, cmd, argv }) => {

    // make a config according to `page, cmd, argv`
    const config = { ... }

    return config;
  };
}
```

## config

```
{
  ...,
  tasks: [ ... ], // tasks run by `lila.runTasks`
}
```

### tasks

```
['task1', ['task2'], ['task3', arg0, arg1, ...], ...]
```

## api

### `lila.setSetting`: set a setting

```
lila.setSetting(name, value);
```

- `@param/name`: `string`, setting name
- `@param/value`: `*`, setting value

### `lila.setSettings`: set multiple settings

```
lila.setSettings(value);
```

- `@param/value`: `{}`, `key-value` map of settings

### `lila.getSetting`: get a setting value

```
const value = lila.getSetting(name);
```

- `@param/name`: `string`, setting name
- `@return/value`: `*`, setting value

### `lila.getSettings`: get multiple setting values

```
const values = lila.getSettings(names);
```

- `@param/names`: `string[]`, setting names
- `@return/values`: `*[]`, setting values

### `lila.getAllSettings`: get all settings

```
const settings = lila.getAllSettings();
```

- `@return/settings`: `{}`, `key-value` map of all settings

### `lila.registerTask`: register a task generator

```
lila.registerTask(name, generator);
```

- `@param/name`: `string`, task name
- `@param/generator`: `function`, task generator

#### `generator`: task generator

Generate a gulp task callback. See [gulptaskname-fn](https://github.com/gulpjs/gulp/blob/4.0/docs/API.md#gulptaskname-fn).

```
({ page, args, argv, cmd, config, lila, gulp }) => gulp-task-callback;
```

- `@param/options.page`: `string`, handling page
- `@param/options.args`: `*[]`, arguments from config
- `@param/options.argv`: `{}`, wrapped `process.argv`
- `@param/options.cmd`: `string`, command name
- `@param/options.config`: `{}`, config of current page
- `@param/options.lila`: `{}`, `lila-core` reference
- `@param/options.gulp`: `{}`, [gulp#4](https://github.com/gulpjs/gulp/tree/4.0) reference

### `lila.unregisterTask`: unregister a task generator

```
lila.unregisterTask(name);
```

- `@param/name`: `string`, task name

### `lila.getTask`: get a task generator

```
const generator = lila.getTask(name);
```

- `@param/name`: `string`, task name
- `@return/generator`: `function`, task generator

### `lila.getTasks`: get multiple task generators

```
const generators = lila.getTasks(names);
```

- `@param/names`: `string[]`, task names
- `@return/generators`: `function[]`, task generators

### `lila.getAllTasks`: get all task generators

```
const tasks = lila.getAllTasks();
```

- `@return/tasks`: `{}`, `name-generator` map of all tasks

### `lila.addCommand`: add a command

```
lila.addCommand(initializer);
```

- `@param/initializer`: `function`, command initializer

#### `initializer`: command initializer

```
commander => { ... }
```

- `@param/commander`: `object`, see [commander.js](https://github.com/tj/commander.js)

### `lila.getCommands`: get added command initializers

```
const initializers = lila.getCommands();
```

- `@return/initializers`: `function[]`, added command initializers

### `lila.makeConfig`: make project config

```
const config = lila.makeConfig({ page, cmd, argv });
```

- `@param/options.page`: `string`, handling page
- `@param/options.argv`: `{}`, wrapped `process.argv`
- `@param/options.cmd`: `string`, command name

### `lila.runTasks`: run tasks

```
lila.runTasks({ pages, argv, cmd }, success, error);
```

- `@param/options.page`: `string`, handling page
- `@param/options.argv`: `{}`, wrapped `process.argv`
- `@param/options.cmd`: `string`, command name
- `@param/success`: `function`, success callback, `() => { ... }`
- `@param/error`: `function`, error callback, `err => { ... }`

### `lila.pureArgv`: make a pure wrapped `process.argv` of [commander.js](https://github.com/tj/commander.js)

```
import commander from 'commander';
import lila from 'lila-core';

const = {pureArgv} = lila;

commander
  .command('build <page> [extraPages...]')
  .description('pack source codes to production bundles')
  .option('-e, --env [env]', 'Specify server enviroment.')
  .action((page, extraPages, options) => {

    // make a pure wrapped `process.argv`
    const argv = pureArgv(options);
  });
```

## built-in settings

- `srcDir`: `string`, source directory name, default `src`.
- `devDir`: `string`, development directory name, default `dev`.
- `buildDir`: `string`, build directory name, default `build`.
- `appDir`: `string`, application directory name, for instance `app/(src,dev,build)`, default empty string.
- `cwd`: `process.cwd()`, current working directory, and you should not modify it.
- `tmpDir`: `cwd/.lila`, tmp directory of project, and you should not modify it.

## built-in tasks

### `@lila/correct-html`: correct html path

By default, a `index.html` will be generated under `build` directory, and this task is to modify its path, `build/index.html -> build/page/name.html`.

```
'@lila/correct-html'
// or
['@lila/correct-html', {source, target}]
```

- `source`: `string`, source html file, default `index.html`.
- `target`: `string|function`, target html file, default `${page}.html`. It can be a function, `page => target`.

### `@lila/replace-html`: replace html content

```
['@lila/replace-html', {file, replace: [{target, replacement}]}]
```

- `file`: `string|function`, html file to handle, default `${page}.html`. It can be a function, `page => file`.
- `replace`: `[]`, options to replace.
  - `target`: `string|RegExp`, target to be replaced.
  - `replacement`: `string`, string to replace.

### `@lila/insert-html`: insert html content

```
['@lila/insert-html', {file, start, end}]
```

- `file`: `string|function`, html file to handle, default `${page}.html`. It can be a function, `page => file`.
- `start`: `string`, content to prepend.
- `end`: `string`, content to append.

### `@lila/convert-html`: convert html extension

```
['@lila/convert-html', {file, ext}]
```

- `file`: `string|function`, html file to handle, default `${page}.html`. It can be a function, `page => file`.
- `ext`: `string`, extension name, like `php, jsp`.

### `@lila/backup-html`: backup html file

Copy html file to a suffixed name, `index.html -> index.2000-01-02-03-04-05.html`.

```
'@lila/backup-html'
// or
['@lila/backup-html', {suffix, ext}]
```

- `suffix`: `string`, `index.html -> index.${suffix}.html`, default `(new Date()).getTime()`.
- `ext`: `string`, html file extension, default `html`.

### `@lila/rename-html`: rename html path

```
['@lila/rename-html', {page, ext}]
```

- `page`: `string|function`, new page to rename to. It can be a function, `page => newPage`.
- `ext`: `string`, html file extension, default `html`.

### `@lila/sync-all`: sync all static resources to remote server

```
['@lila/sync-all', {server, remotePath, extra, cache, cacheFileName}]
```

- `server`: `{}`, server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `string`, remote server path to upload to.
- `extra`: `string[]`, extra directories to upload, same level of `build`.
- `cache`: `bool`, whether cache uploading record, thus next time will only upload changed files, default `false`.
- `cacheFileName`: `string|function`, file name to record cache, default `cache`. It can be a function, `({page, argv, cmd}) => fileName`.

### `@lila/save-cache`: save cache after sync-all task

```
'@lila/save-cache'
// or
['@lila/save-cache', {cacheFileName}]
```

- `cacheFileName`: `string|function`, file name to record cache, default `cache`. It can be a function, `({page, argv, cmd}) => fileName`.

### `@lila/sync-html`: sync html files to remote server

```
['@lila/sync-html', {server, remotePath, ext}]
```

- `server`: `{}`, server config, see [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `string`, remote server path to upload to.
- `ext`: `string`, html file extension, default `html`.

### `@lila/del-dev`: delete dev directory

```
'@lila/del-dev'
```

### `@lila/del-build`: delete build directory

```
'@lila/del-build'
```
