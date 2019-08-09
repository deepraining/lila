# lila-core

[English Documentation](./README.en.md)

lila 核心包

## 安装

```
npm install --save-dev lila-core
```

## 使用

```
// es6
import lila from 'lila-core';

// commonjs
const lila = require('lila-core');
```

## 初始化文件

Lila 需要有一个在项目根目录下名为 `lila.js`(Windows 中 `lila.init.js`) 的初始化文件.

```
// lila-core 不能直接导入

import tasksPlugin from 'lila-tasks';
import otherPlugin from 'lila-other-plugin';

// 这里需要导出一个函数
// 这里的 lia 对象就是 lila-core 包，你可以使用 lila-core 的所有 api
export default lila => {

  // 做一些初始化操作

  tasksPlugin(lila);
  otherPlugin(lila);

  // 这里需要返回一个配置生成器
  return ({ entry, argv, cmd }) => {

    // 根据 `entry, argv, cmd` 生成配置
    const config = { ... }

    // 返回配置对象
    return config;
  };
}
```

## 配置

```
{
  ...,
  tasks: [ ... ],            // 通过 `lila.runTasks` 运行的 tasks
}
```

### 任务

```
[
  'task1',
  ['task2'],
  ['task3', arg0, arg1, ...],
  ...
]
```

## api

### `lila.setSetting`: 设置一个配置值

```
lila.setSetting(name, value);
```

- `@param/name`: `type: string` 名称
- `@param/value`: `type: *` 值

### `lila.setSettings`: 设置多个配置值

```
lila.setSettings(value);
```

- `@param/value`: `type: {}` 配置 `键-值` 对

```
lila.setSettings({
  name1: value1,
  name2: value2,
  ...
});
```

### `lila.getSetting`: 获取一个配置值

```
const value = lila.getSetting(name);
```

- `@param/name`: `type: string` 名称
- `@return`: `type: *` 值

### `lila.getSettings`: 获取多个配置值

```
const values = lila.getSettings(names);
```

- `@param/names`: `type: string[]` 名称
- `@return`: `type: *[]` 值

```
const [value1, value2, ...] = lila.getSettings([name1, name2, ...]);
```

### `lila.getAllSettings`: 获取所有配置项

```
const settings = lila.getAllSettings();
```

- `@return`: `type: {}` 所有配置的配置 `键-值` 对

### `lila.registerTask`: 注册一个任务生成器

```
lila.registerTask(name, generator);
```

- `@param/name`: `type: string` 任务名
- `@param/generator`: `type: function` 任务生成器

#### `generator`: 任务生成器

用于生成一个 gulp task callback. 查看 [taskFunction](https://gulpjs.com/docs/en/api/task#signature).

```
({ entry, args, argv, cmd, config, lila, gulp }) => gulp-task-callback;
```

- `@param/options.entry`: `type: string` 当前处理 entry
- `@param/options.args`: `type: *[]` 来自初始化配置的参数, `['taskName', arg0, arg1, ...]`
- `@param/options.argv`: `type: {}` 封装 `process.argv`
- `@param/options.cmd`: `type: string` 命令名, 如 `run, dev, build, ...`
- `@param/options.config`: `type: {}` 当前 entry 的配置
- `@param/options.lila`: `type: {}` `lila-core` 引用
- `@param/options.gulp`: `type: {}` [gulp](https://github.com/gulpjs/gulp) 引用
- `gulp-task-callback`: 查看 [taskFunction](https://gulpjs.com/docs/en/api/task#signature)

```
lila.registerTask('log', ({ entry }) => cb => {
  console.log(`entry: ${entry}`);

  cb();
});
```

### `lila.unregisterTask`: 删除已注册的任务生成器

```
lila.unregisterTask(name);
```

- `@param/name`: `type: string` 任务名

### `lila.getTask`: 获取任务生成器

```
const generator = lila.getTask(name);
```

- `@param/name`: `type: string` 任务名
- `@return`: `type: function` 任务生成器

### `lila.getTasks`: 获取多个任务生成器

```
const generators = lila.getTasks(names);
```

- `@param/names`: `type: string[]` 任务名
- `@return`: `type: function[]` 任务生成器

```
const [generator1, generator2, ...] = lila.getTasks([name1, name2, ...]);
```

### `lila.getAllTasks`: 获取所有任务生成器

```
const tasks = lila.getAllTasks();
```

- `@return`: `type: {}` 所有任务的 `name-generator` 对

### `lila.addCommand`: 添加一个命令

```
lila.addCommand(initializer);
```

- `@param/initializer`: `type: function` 命令初始化函数

#### `initializer`: 命令初始化函数

```
commander => { ... }
```

- `@param/commander`: `type: {}` 查看 [commander.js](https://github.com/tj/commander.js)

```
commander => {
  commander
  .command('log')
  .action(function () {
    console.log('log succeded');
  });
}
```

### `lila.getCommands`: 获取已添加的命令初始化函数

```
const initializers = lila.getCommands();
```

- `@return`: `type: function[]` 已添加的命令初始化函数

### `lila.makeConfig`: 获取一个 entry 的配置

```
const config = lila.makeConfig({ entry, argv, cmd });
```

- `@param/options.entry`: `type: string` 操作的 entry
- `@param/options.argv`: `type: {}` 封装 `process.argv`
- `@param/options.cmd`: `type: string` 命令名

### `lila.runTasks`: 运行任务

```
lila.runTasks({ entries, argv, cmd }, success, error);
```

- `@param/options.entries`: `type: string[]` 需要构建的 entries
- `@param/options.argv`: `type: {}` 封装 `process.argv`
- `@param/options.cmd`: `type: string` 命令名
- `@param/success`: `type: function` 成功的回调函数, `() => { ... }`
- `@param/error`: `type: function` 出错的回调函数, `err => { ... }`

### `lila.addCmdOption`: 添加一个 command option

```
lila.addCmdOption(name, ...option);
```

- `name`: 命令名
- `option`: 查看 [commander.js#command-specific-options](https://github.com/tj/commander.js#command-specific-options)

```
lila.addCmdOption('run', '-e, --env', '指定服务器环境');
```

### `lila.getCmdOptions`: 获取一个 command option

```
const options = lila.getCmdOptions(name);

// example
options.forEach(option => {
  command.option(...option);
});
```

- `name`: command name

### `lila.makeArgv`: 创建一个封装的 `process.argv`

```
import commander from 'commander';
import lila from 'lila-core';

const { makeArgv } = lila;

commander
  .command('build [entries...]')
  .description('构建源代码')
  .option('-e, --env [env]', '指定服务器环境')
  .action((entries, options) => {

    // 创建一个封装的 `process.argv`
    const argv = makeArgv(options, keepUnknown);
  });
```

- `@param/keepUnknown`: `type: bool` `default: false` 是否保留自己未定义的参数，查看 [minimist](https://github.com/substack/minimist)

### `lila.log`:

```
lila.log(...args)            =>   console.log(...args)
lila.log(color, ...args)     =>   console.log(...chalk.color(args))
lila.log(false, ...args)     =>   console.log(...args)
```

查看 [chalk](https://github.com/chalk/chalk).

### `lila.info`:

```
lila.info(...args)           =>   console.info(...chalk.blueBright(args))
lila.info(color, ...args)    =>   console.info(...chalk.color(args))
lila.info(false, ...args)    =>   console.info(...args)
```

查看 [chalk](https://github.com/chalk/chalk).

### `lila.warn`:

```
lila.warn(...args)           =>   console.warn(...chalk.yellowBright(args))
lila.warn(color, ...args)    =>   console.warn(...chalk.color(args))
lila.warn(false, ...args)    =>   console.warn(...args)
```

查看 [chalk](https://github.com/chalk/chalk).

### `lila.error`:

```
lila.error(...args)          =>   console.error(...chalk.redBright(args))
lila.error(color, ...args)   =>   console.error(...chalk.color(args))
lila.error(false, ...args)   =>   console.error(...args)
```

查看 [chalk](https://github.com/chalk/chalk).

### `lila.success`:

```
lila.success(...args)        =>   console.log(...chalk.greenBright(args))
lila.success(color, ...args) =>   console.log(...chalk.color(args))
lila.success(false, ...args) =>   console.log(...args)
```

查看 [chalk](https://github.com/chalk/chalk).

## 内置的配置

- `src`: `type: string` `default: src` 源代码目录名
- `dev`: `type: string` `default: dev` 本地开发目录名
- `build`: `type: string` `default: build` 构建代码生成地的目录名
- `tmp`: `type: string` `default: .lila` 临时目录名
- `root`: `type: string` `default: process.cwd()` `read only` 根目录, 也可以通过命令行使用 `--root` 参数自定义.
- `defaultEntry`: `type: string` `default: @lila/index` `read only` 默认 entry, 如果在命令行不提供 entry 的话.

### 扩展配置:

#### `beforeTasks`: 在运行任务之前运行的钩子

```
({entries, argv, cmd, lila, gulp}) => { ... }
```

- `entries`: `type: []` 所有的 entries
- `argv`: `type: {}` 封装 `process.argv`
- `cmd`: `type: string` 命令名
- `lila`: `type: {}` `lila-core` 引用
- `gulp`: `type: {}` [gulp](https://github.com/gulpjs/gulp) 引用

#### `afterTasks`: 在运行任务之后运行的钩子

```
({entries, argv, cmd, lila, gulp}) => { ... }
```

#### `errorTasks`: 运行任务出错的钩子

```
({entries, argv, cmd, lila, gulp, error}) => { ... }
```

- `error`: error object

## 内置命令

### `run`: 运行任务

```
lila run entry1 entry2 entry3 ...
```

如果没有提供 `entry`, 使用 `@lila/index` 作为默认 entry.

```
lila run                     # 实际 entry 是 @lila/index
```

## 扩展的命令行配置

- `--root`: 自定义根路径
- `--init`: 自定义初始化文件, 默认是 `lila.js`(Windows 中 `lila.init.js`)

## 注意事项

不能直接导入 `lila-core`, 如:

```
import lila from 'lila-core'
```

而是通过 `lila.js`(Windows 中 `lila.init.js`) 或插件使用:

```
export default lila => {
  // 使用 lila
}
```

## npm packages

- [gulp](https://github.com/gulpjs/gulp): 4.x
