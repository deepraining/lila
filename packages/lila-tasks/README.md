# lila-tasks

[English Documentation](./README.en.md)

lila 内置的 tasks

## 安装

```
npm install --save-dev lila-tasks
```

## 使用

在 `lila.init.js` 中:

```
import tasksPlugin from 'lila-tasks';

export default lila => {
  tasksPlugin(lila);

  ...
};
```

## 内置任务

### `@lila/make`: 创建文件(相对于 `root`)

```
['@lila/make', {file, content, force}]}]
```

- `file`: `type: string` 要操作的文件.
- `content`: `type: string` 文件内容.
- `force`: `type: bool` `default: false` 如果文件已存在，是否覆盖.

### `@lila/replace`: 替换文件内容(相对于 `root`)

```
['@lila/replace', {file, replace: [{target, replacement}]}]
```

- `file`: `type: string` 要操作的文件.
- `replace`: `type: []` 替换选项.
  - `target`: `type: string|RegExp` 需要被替换的文本.
  - `replacement`: `type: string` 替换的文本.

### `@lila/insert`: 插入文件内容(相对于 `root`)

```
['@lila/insert', {file, start, end}]
```

- `file`: `type: string` 要操作的文件.
- `start`: `type: string` 插入在文件最前面的内容.
- `end`: `type: string` 插入在文件最后面的内容.

### `@lila/convert`: 更改文件的扩展名(相对于 `root`)

```
['@lila/convert', {file, ext}]
```

- `file`: `type: string` 要操作的文件.
- `ext`: `type: string` 扩展名, 如 `php, jsp`.

### `@lila/backup`: 备份文件(相对于 `root`)

复制文件并添加后缀, `index.html -> index.2000-01-02-03-04-05.html`.

```
['@lila/backup', {file, suffix}]
```

- `file`: `type: string` 要操作的文件.
- `suffix`: `type: string` `default: (new Date()).getTime()` `index.html -> index.${suffix}.html`.

### `@lila/move`: 移动文件或目录(相对于 `root`)

```
['@lila/move', {source, target, force}]
```

- `source`: `type: string` 源文件或目录
- `target`: `type: string` 目标文件或目录
- `force`: `type: bool` `default: false` 如果目录已存在，是否覆盖

### `@lila/copy`: 复制文件或目录(相对于 `root`)

```
['@lila/copy', {source, target, force}]
```

- `source`: `type: string` 源文件或目录
- `target`: `type: string` 目标文件或目录
- `force`: `type: bool` `default: false` 如果目录已存在，是否覆盖

### `@lila/del`: 删除文件或目录(相对于 `root`)

```
['@lila/del', file]
['@lila/del', dir]
['@lila/del', [file1, dir2, dir3, ...]]
```

### `@lila/del-dev`: 删除 dev 目录

```
'@lila/del-dev'
```

### `@lila/del-build`: 删除 build 目录

```
'@lila/del-build'
```

### `@lila/del-tmp`: 删除 tmp 目录

```
'@lila/del-tmp'
```

### `@lila/sync`: 同步文件到远程服务器

```
['@lila/sync', {src, server, remotePath}]
```

- `src`: `globs/[globs, options]` [gulp.src](https://gulpjs.com/docs/en/api/src)
- `server`: `type: {}` 服务器配置, 查看 [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` 要上传的远程服务器路径.
- `cache`: `type: boolean` `default: false` 是否缓存已上传的文件.
- `cacheFileName`: `type: string` `default: cache` 缓存记录生成的文件名.

### `@lila/sync-save-cache`: 运行 `@lila/sync` 任务后保存操作文件的记录

```
['@lila/sync-save-cache', {cacheFileName}]
```

- `cacheFileName`: `type: string` `default: cache` 缓存记录生成的文件名.

### `@lila/sync-dir`: 同步目录到远程服务器(相对于 `root`)

```
['@lila/sync-dir', {server, remotePath, dirs}]
```

- `server`: `type: {}` 服务器配置, 查看 [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` 要上传的远程服务器路径.
- `dirs`: `type: string/array` 要上传的目录.

### `@lila/sync-build`: 同步 build 目录到远程服务器(相对于 `root`)

```
['@lila/sync-build', {server, remotePath, sourceMap}]
```

- `server`: `type: {}` 服务器配置, 查看 [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` 要上传的远程服务器路径.
- `sourceMap`: `type: bool` `default: true` 是否上传 source-map 文件.

### `@lila/sync-html`: 同步 html 文件到远程服务器(相对于 build)

```
['@lila/sync-html', {server, remotePath, ext}]
```

- `server`: `type: {}` 服务器配置, 查看 [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` 要上传的远程服务器路径.
- `ext`: `type: string` `default: html` html 文件扩展名.

### `@lila/sync-source-map`: 同步 source-map 文件到远程服务器(相对于 build)

```
['@lila/sync-source-map', {server, remotePath}]
```

- `server`: `type: {}` 服务器配置, 查看 [gulp-ssh](https://github.com/teambition/gulp-ssh).
- `remotePath`: `type: string` 要上传的远程服务器路径.

### `@lila/clean-cache`: 移除上次操作过的文件，保留未操作过的文件，主要用于记录 `build` 目录

```
'@lila/clean-cache'
// or
['@lila/clean-cache', {dir, cacheFileName}]
```

- `dir`: `type: string` 待操作的目录(相对于 `root`)
- `cacheFileName`: `type: string` `default: cache` 缓存记录生成的文件名.

### `@lila/save-cache`: 保存文件到操作记录中, 主要用于记录 `build` 目录

```
'@lila/save-cache'
// or
['@lila/save-cache', {dir, cacheFileName}]
```

- `dir`: `type: string` 待操作的目录(相对于 `root`)
- `cacheFileName`: `type: string` `default: cache` 缓存记录生成的文件名.

### `@lila/shell`: 执行 shell 脚本

```
['@lila/shell', {command, args, options}]
```

- `command, args, options`: 查看 [child_process spawn](https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_child_process_spawn_command_args_options)

### `@lila/ssh-exec`: 在远程服务器执行命令

可用版本 >= v1.0.1

```
['@lila/ssh-exec', {server, script}]
```

- `server`: `type: {}` 服务器配置, 查看 [ssh2 connect](https://github.com/mscdex/ssh2#client-methods).
- `script`: `type: string` 需要在远程服务器执行的命令，多个命令可使用 `&&` 连接.

### `@lila/remote-exec`: 在远程服务器执行命令

可用版本 >= v1.0.1

```
['@lila/remote-exec', {server, scripts, log}]
```

- `server`: `type: {}` 服务器配置, 查看 [gulp-ssh exec](https://github.com/teambition/gulp-ssh#gulpsshexeccommands-options).
- `scripts`: `type: string/array` 需要在远程服务器执行的命令.
- `log`: `type: string` `default: remote-exec.log` 日志文件.

### `@lila/remote-shell`: 在远程服务器执行 shell 脚本

**_!!!某些命令可能会导致连接挂起不结束，请使用`@lila/ssh-exec`或`@lila/remote-exec`代替_**

```
['@lila/remote-shell', {server, scripts, log}]
```

- `server`: `type: {}` 服务器配置, 查看 [gulp-ssh shell](https://github.com/teambition/gulp-ssh#gulpsshshellcommands-options).
- `scripts`: `type: string/array` 需要在远程服务器执行的 shell 脚本.
- `log`: `type: string` `default: remote-shell.log` 日志文件.
