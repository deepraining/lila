# lila-webpack

[English Documentation](./README.en.md)

封装的 webpack 插件

## 安装

```
npm install --save-dev lila-webpack
```

## 使用

在 `lila.init.js` 中:

```
import webpackPlugin from 'lila-webpack';

export default lila => {
  webpackPlugin(lila);

  ...
};
```

## 扩展的命令

### `dev`: 开启一个本地服务器开发一个 entry

```
lila dev entry
```

如果 `entry` 未提供, 将使用 `@lila/index` 为默认 entry.

### `serve`: 模拟一个后端环境，开启一个本地服务器开发一个 entry

```
lila serve entry
```

如果 `entry` 未提供, 将使用 `@lila/index` 为默认 entry.

需要设置 `servePath` 设置项.

### `build`: 打包源代码

```
lila build entry1 entry2 entry3 ...
```

如果 `entry` 未提供, 将使用 `@lila/index` 为默认 entry.

### `sync`: 打包源代码, 并同步到服务器

```
lila sync entry1 entry2 entry3 ...
```

如果 `entry` 未提供, 将使用 `@lila/index` 为默认 entry.

### `start`: 打包源代码, 并开启一个本地服务器预览

```
lila start entry
```

如果 `entry` 未提供, 将使用 `@lila/index` 为默认 entry.

### `analyze`: 查看当前 entry 的各个模块文件的大小

```
lila analyze entry
```

如果 `entry` 未提供, 将使用 `@lila/index` 为默认 entry.

## 扩展的任务

### `@lila/webpack`: 运行 webpack

```
'@lila/webpack'
```

## 需要实现的设置项

### `webpackConfigGenerator`: 生成 webpack 配置

```
webpack => ({entry, argv, cmd, config, lila}) => config
```

## 可以实现的设置项

### `getEntries`: 获取一个目录下的所有 entry

```
(dirPath, srcPath, root) => entries
```

### `servePath`: 获取 serve js 文件路径给 `serve` 命令用(相对于 `root`)

```
(entry, srcDir) => path
```

注意：

1. 启用此功能需将配置 `devMiddleware.writeToDisk` 设置为 `true`
2. 由于 `html` 文件是延后生成的，所以浏览器第一次打开可能会看不到页面，重新加载页面就正常了

#### serve js 文件

```
export default (content, req) => newContent;
```

- `content`: html 文件内容
- `req`: [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html)
- `newContent`: 新的 html 内容

### `excludeEntries`: 当使用特殊标志构建多个 entry 时, 如 `home/*`, 有时候并不需要构建某些 `home` 下的 entry(`home/test, home/ui`, 仅作本地开发), 可以在这里排除.

`type: string/RegExp/[string]/[RegExp]/function`

`example:`

```
excludeEntries: 'home/test'                 // 排除 home/test entry
excludeEntries: /\/test$/                   // 排除 */test entries

// 排除 home/exclude, */test, */ui entries
excludeEntries: ['home/exclude', /\/test$/, /\/ui$/]

// 如果返回 true, entry 将会被排除
excludeEntries: entry => true
```

### `extToSearch`: 当要获取某个目录下所有的 entry 时，使用什么扩展名搜索 entry 入口脚本文件, 如 `js, jsx, ts, tsx`

`type: string` `default: js`

### `beforeCommand`: 在每个命令运行之前运行的钩子

```
({cmd, argv, lila}) => { ... }
```

如果你需要做一些预操作，可以在这里添加，如：

- 使用 [chokidar](https://github.com/paulmillr/chokidar) 监听文件变动, 然后动态生成 js 文件
- 做一些初始化操作或打印一些信息

## 扩展的配置

### `forceGet`: 强制所有的 ajax 请求方法为 `get`

`type: bool` `default: false`

一般而言, 只有 `get` 方法 可以访问静态文件, 而 `post, put, delete ...` 会导致 `404`.

### `mock`: 使用 js 文件生成模拟数据

`type: bool` `default: true`

在大多数情况下, 可以使用 `json` 文件提供模拟数据的功能, 但 `json` 文件不能提供动态的数据.

`url`: `/src/api/user/profile?id=1`

首先尝试 `/src/api/user/profile.js`:

```
// 导出一个函数
export default (req, res) => {
  // 做任何事情
};

// 或者导出一个对象，一个字符串
export default {
  success: true,
  message: 'ok',
  data: { ... },
};
```

第二尝试 `/src/api/user.js`:

```
// 导出一个函数
export const profile = (req, res) => {
  // 做任何事情
};

// 或者导出一个对象，一个字符串
export const profile = {
  success: true,
  message: 'ok',
  data: { ... },
}
```

`req, res` 参考 [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html), 并且文件名不能包含 `.` 点符号, 否则会被当作静态文件处理.

### `mockDynamicReplacement`: 动态 url 替换

`since: v1.0.3` `default: $d`

如果你需要动态 URL，比如 `/article/{{articleId}}/comment/{{commentId}}`(`/article/1234/comment/5678`)，你可以使用 `$d` 代替动态的部分。

比如，你可以用 `/article/$d/comment/$d.js` 代理所有的 url.

如果配置 `mockDynamicReplacement: false/''`，那么动态部分会直接去掉，上面的动态 URL 就变成了访问 `/article/comment.js` 文件了

只有以数字(0-9)开头，才会被当做动态 url，`/article/abc` 与 `/article/a123` 都不是动态 url。

### `mockRoot`: 其他的 mock root url 前缀(相对于 `root`)

`type: string/function`

当使用模拟数据时, 可能你不喜欢那么长的 `url`, 比如使用 `/src/one/page/mock/list` 访问 `/src/one/page/mock/list.js` 文件.

Lila 内置了一个便利的方式.

如果 `url` 尝试从 `/src/one/page/mock/list.js` 文件访问模拟数据, lila 会按照下面的顺序尝试访问 `url`:

1. `${url}`: 全地址：`/src/one/page/mock/list`
2. `/mock/${url}`: 加一个 `mock` 前缀
3. `/${srcDir}/${url}`: 尝试以 `src` 目录为基地址进行访问：`/one/page/mock/list`
4. `/${srcDir}/mock/${url}`: 尝试以 `src` 目录为基地址，并加一个 `mock` 前缀
5. `/${srcDir}/${entry}/${url}`: 尝试以 entry 的工作空间基地址进行访问：`/mock/list`
6. `/${srcDir}/${entry}/mock/${url}`: 尝试以 entry 的工作空间基地址，并加一个 `mock` 前缀：`/list`

如果你想要更多的便利方式，可以配置 `mockRoot`

```
// 一个字符串
mockRoot: '/some/directory'

// 多个字符串
mockRoot: ['/first/directory', '/second/directory']

// 返回一个字符串
mockRoot: (entry, lila) => '/some/directory';

// 返回多个字符串
mockRoot: (entry, lila) => ['/first/directory', '/second/directory']
```

### `port`: 本地开发服务器端口

`type: number` `default: 8090`

### `browserSync`: [browser-sync](https://github.com/BrowserSync/browser-sync) 配置

`type: {}` `default: {}`

### `devMiddleware`: [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 配置

`type: {}` `default: { watchOptions: { ignored: /node_modules/ } }`

### `hotMiddleware`: [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) 配置

`type: {}` `default: {}`

### `bundleAnalyzer`: [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) 配置

`type: {}` `default: { analyzerPort: 8190 }`

## entry 规范

- `home/about`: 单个 entry
- `home/*` 或 `home/all`: `home` 目录下的所有 entries
- `*` 或 `all`: 项目的所有 entries

## npm packages

- [webpack](https://github.com/webpack/webpack): 4.x
