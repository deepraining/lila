# lila-webpack-config

[English Documentation](./README.en.md)

内置的 webpack 配置生成器 for `lila-webpack`.

## 安装

```
npm install --save-dev lila-webpack-config
```

## 使用

在 `lila.init.js` 中:

```
import webpackPlugin from 'lila-webpack';
import webpackConfigPlugin, {
  forReact as reactWebpackConfigPlugin,
  forVue as vueWebpackConfigPlugin,
  forReactVue as reactVueWebpackConfigPlugin,
} from 'lila-webpack-config';

export default lila => {
  webpackPlugin(lila);
  webpackConfigPlugin(lila);                // 通用项目
  // reactWebpackConfigPlugin(lila);        // React 组件项目
  // vueWebpackConfigPlugin(lila);          // Vue 组件项目
  // reactVueWebpackConfigPlugin(lila);     // React + Vue 组件项目

  ...
};
```

## 扩展的配置

### `babelExclude`: [babel-loader](https://github.com/babel/babel-loader) exclude

`type: []` `default: [/node_modules/]`

### `babelPresets`: 其他的 babel presets

`type: []` `default: []`

Lila 内部提供了下面的 presets:

1. 针对 `.{js,vue}` 文件:

- `@babel/preset-env`
- `@babel/preset-flow`

2. 针对 `.jsx` 文件:

- `@babel/preset-env`
- `@babel/preset-flow`
- `@babel/preset-react`

### `babelPlugins`: 其他的 babel plugins

`type: []` `default: []`

Lila 内部提供了下面的 plugins:

1. 针对 `.js` 文件:

- `@babel/plugin-syntax-dynamic-import`
- `@babel/plugin-proposal-class-properties`
- `@babel/plugin-transform-runtime`

2. 针对 `.jsx` 文件:

- `@babel/plugin-syntax-dynamic-import`
- `@babel/plugin-proposal-class-properties`
- `@babel/plugin-transform-runtime`
- `@babel/plugin-transform-react-jsx`

3. 针对 `.vue` 文件:

- `@babel/plugin-syntax-dynamic-import`
- `@babel/plugin-proposal-class-properties`
- `@babel/plugin-transform-runtime`
- `babel-plugin-transform-vue-jsx`

### `extensions`: [url-loader](https://github.com/webpack-contrib/url-loader) 静态文件扩展名

`type: []` `default: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`

### `provide`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/) 配置

`type: {}` `default: {}`

### `define`: [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) 配置

`type: {}` `default: {}`

### `alias`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias) 配置

`type: {}` `default: {}`

### `cssModules`: 是否使用 [css-modules](https://github.com/css-modules/css-modules)

`type: bool` `default: false`

### `cssModulesName`: [css-loader#localidentname](https://github.com/webpack-contrib/css-loader#localidentname)

`type: string`

### `cssModulesExclude`: [css-loader](https://github.com/webpack-contrib/css-loader) `css-modules` exclude

`type: []` `default: [/node_modules/]`

### `browsers`: [autoprefixer](https://github.com/postcss/autoprefixer#browsers) browsers

`type: []`

`default:`

```
[
  '> 1%',
  'last 2 versions',
  'Android >= 3.2',
  'Firefox >= 20',
  'iOS 7',
]
```

### `staticServer`: 存放静态文件的服务器 url 地址

`type: string` `default: empty string`

- `/dir`: 一个目录
- `http://www.static.com`: 单独的静态资源服务器
- `https://www.static.com/dir`: 单独的静态资源服务器的一个子目录
- `//www.static.com/dir/sub_dir`: 单独的静态资源服务器的二级子目录

### `minHtml`: 是否压缩 html

`type: bool` `default: true`

### `minHtmlOptions`: [html-minifier](https://github.com/kangax/html-minifier#options-quick-reference) 配置

`type: {}`

`default:`

```
{
  removeComments: !0,
  collapseWhitespace: !0,
  collapseBooleanAttributes: !0,
  removeEmptyAttributes: !0,
  removeScriptTypeAttributes: !0,
  removeStyleLinkTypeAttributes: !0,
  removeRedundantAttributes: !0,
  minifyJS: !0,
  minifyCSS: !0,
}
```

### `minCss`: 是否压缩 css

`type: bool` `default: true`

### `minJs`: 是否压缩 js

`type: bool` `default: true`

### `devtool`: [devtool](https://webpack.js.org/configuration/devtool/) 配置

`type: string`

`default:`

- `cmd: dev, serve`: `eval-source-map`
- `cmd: build, sync, start`: `source-map`

### `splitChunks`: [SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/) 配置

`type: {}` `default: {chunks: 'all'}`

### `extra`: 其他的 webpack 配置项

`type: {}/function` `default: {}`

```
extra: { ... }
extra: webpack => ({ ... })
```

### `rules`: 其他的 webpack rules

`type: []` `default: []`

### `plugins`: 其他的 webpack plugins

`type: []` `default: []`

### `rebuildWebpackConfig`: 对最终生成的 webpack 配置进行重构

`type: function`

```
({ webpackConfig, lila, webpack, entry, cmd, config, argv }) => newWebpackConfig;
```

## 一个 entry 所包含的文件

每个 entry 都有一个单独的目录(目录为 `src/home/about/` 如果 entry 是 `home/about`), 也叫做工作空间, 在这个工作空间中至少有一个 `index.html` 文件和一个 `index.js` 文件.

如果 `entry` 未提供, 将使用 `@lila/index` 为默认 entry.

如果 entry 是 `@lila/index`, 则它的工作空间就是 `src`:

```
- src/
  - index.html
  - index.js

  - 其他文件与目录
```

其他的话(比如 entry 是 `home/about`), 则它的工作空间是 `src/home/about`:

```
- src/
  - home/
    - about/
      - index.html
      - index.js

      - 其他文件与目录
```

推荐把一个 entry 所有的文件和目录都放到这个工作空间下

## 内置的 rules

- [babel-loader](https://github.com/babel/babel-loader)
- [url-loader](https://github.com/webpack-contrib/url-loader)
- [html-loader](https://github.com/webpack-contrib/html-loader)
- [css-loader](https://github.com/webpack-contrib/css-loader)
- [less-loader](https://github.com/webpack-contrib/less-loader)
- [sass-loader](https://github.com/webpack-contrib/sass-loader)
- [vue-loader](https://github.com/vuejs/vue-loader)

## 文件扩展名

- `.js`: 纯 JavaScript 代码
- `.jsx`: React 组件代码
- `.vue`: Vue 组件代码
