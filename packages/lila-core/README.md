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
  return ({ entry, cmd, argv }) => {

    // make a config according to `entry, cmd, argv`
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
({ entry, args, argv, cmd, config, lila, gulp }) => gulp-task-callback;
```

- `@param/options.entry`: `string`, handling entry
- `@param/options.args`: `*[]`, arguments from config
- `@param/options.argv`: `{}`, wrapped `process.argv`
- `@param/options.cmd`: `string`, command name
- `@param/options.config`: `{}`, config of current entry
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

- `@param/commander`: `{}`, see [commander.js](https://github.com/tj/commander.js)

### `lila.getCommands`: get added command initializers

```
const initializers = lila.getCommands();
```

- `@return/initializers`: `function[]`, added command initializers

### `lila.makeConfig`: make project config

```
const config = lila.makeConfig({ entry, cmd, argv });
```

- `@param/options.entry`: `string`, handling entry
- `@param/options.argv`: `{}`, wrapped `process.argv`
- `@param/options.cmd`: `string`, command name

### `lila.runTasks`: run tasks

```
lila.runTasks({ entries, argv, cmd }, success, error);
```

- `@param/options.entry`: `string`, handling entry
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
  .command('build <entry> [extraEntries...]')
  .description('pack source codes to production bundles')
  .option('-e, --env [env]', 'Specify server enviroment.')
  .action((entry, extraEntries, options) => {

    // make a pure wrapped `process.argv`
    const argv = pureArgv(options);
  });
```

## built-in settings

- `src`: `string`, default `src`, source directory name.
- `dev`: `string`, default `dev`, development directory name.
- `build`: `string`, default `build`, build directory name.
- `cwd`: `process.cwd()`, current working directory, and you should not modify it.
- `tmp`: `cwd/.lila`, tmp directory of project, and you should not modify it.

## node packages

- [gulp](https://github.com/gulpjs/gulp): 4.x
