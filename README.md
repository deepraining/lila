# lila

[English Documentation](./README.en.md)

一个可扩展的、基于 [gulp](https://github.com/gulpjs/gulp) 的流式构建工具，支持多入口模式。

## packages

- [lila-bin](./packages/lila-bin): lila 命令行工具
- [lila-core](./packages/lila-core): lila 核心包
- [lila-tasks](./packages/lila-tasks): lila 内置的 tasks
- [lila-webpack](./packages/lila-webpack): 封装的 webpack 插件
- [lila-webpack-config](./packages/lila-webpack-config): 内置的 webpack 配置生成器 for lila-webpack
- [create-lila-app](./packages/create-lila-app): 快速创建 lila 应用的工具

## 搭建应用

推荐使用 [create-lila-app](./packages/create-lila-app) 创建 lila 应用，或者选择已有模板：

- [react-app-starter](https://github.com/senntyou/react-app-starter): 一个创建 React 应用的模板，使用 Webpack 与 Storybook 开发构建.
- [react-ts-app-starter](https://github.com/senntyou/react-ts-app-starter): 一个创建 React 应用的模板，使用 TypeScript、Webpack 与 Storybook 开发构建.
- [vue-app-starter](https://github.com/senntyou/vue-app-starter): 一个创建 Vue 应用的模板，使用 Webpack 与 Storybook 开发构建.

然而，你也可以自定义搭建方式：

#### 1. 安装 lila-bin

```
npm install lila-bin -g                # 全局

npm install lila-bin --save-dev        # 本地
```

如果全局安装，可以直接在命令行运行：

```
lila <cmd> [options]
```

如果本地安装，可以使用 [npm-scripts](https://docs.npmjs.com/misc/scripts) 运行命令：

```
# package.json

"scripts": {
  "run": "lila <cmd> [options]"
}
```

#### 2. 安装 lila-core 与 lila-tasks

```
npm install lila-core lila-tasks --save-dev
```

#### 3. 配置初始化文件

配置初始化文件 `lila.js`(Windows 下可以使用 `lila.init.js`).

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

## 基本目录结构

```
- src/
- dev/
- build/
```

- `src`: 放置源代码的地方, 如 `html, css, less, scss, js, ts, vue, ...`
- `dev`: 临时目录, 由本地开发时生成
- `build`: 生成构建文件的地方

如果需要使用自定义名字，可以这样修改：

```
lila.setSettings({
  src: yourSrcDir,
  dev: yourDevDir,
  build: yourBuildDir,
})
```

## 怎样写插件

```
export default lila => {
  // 这里的 lia 对象就是 lila-core 包，这里就可以使用 lila 对象做任何事情
};
```

## 怎样加载插件

在 `lila.js`(Windows 中 `lila.init.js`) 文件中:

```
import plugin from 'your-lila-plugin';

export default lila => {
  plugin(lila);

  ...
};
```

## 常见问题

- 在 Windows 中, 初始化文件应该使用 `lila.init.js`, 而 `lila.js` 会出现问题.
- 在 Windows 中, 运行 `lila` 命令时必须与 `node_modules` 目录在同一级.
