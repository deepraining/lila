# Project config

## module

* `desc`: Current handling module name, can and always be specified from command line.
* `type`: `string`
* `default`: `test/index`
* `since`: `v0.0.1`
* `note`: This should only either be defined in `lila.config.js` file or be specified from command line.

## cmdAlias

* `desc`: Custom command line arguments alias.
* `type`: `map`
* `since`: `v0.0.1`
* `note`: This should only be defined in `lila.config.js` file.
* `default`:

```
{
    // alias -> real name
    e: 'env', // environment
    l: 'local', // local name
    o: 'out' // whether use outResolveAlias.
}
```

## local

* `desc`: Current local name, used to get `local option`, can and always be specified from command line.
* `type`: `string`
* `default`: Empty
* `since`: `v0.2.0`
* `note`: This should only either be defined in `lila.config.js` file or be specified from command line.

## <a name="localOptions">localOptions</a>

* `desc`: Config options for different local developers. You can override config root attributes according to different local name.
* `type`: `map`
* `default`: Empty
* `since`: `v0.2.0`
* `note`: This should only be defined in `lila.config.js` file.
* `example`:

```
{
    person1: {...},
    person2: {...}
}
```

## <a name="commandOptions">commandOptions</a>

* `desc`: Config options for different commands. You can override config root attributes according to different commands, such as `dev`, `dist`, `sync`, etc.
* `type`: `map`
* `default`: Empty
* `since`: `v0.2.2`
* `example`:

```
{
    // for dev command
    dev: {...},
    // for dist command
    dist: {...},
    // for sync command
    sync: {...}
}
```

## env

* `desc`: Current environment index, can and always be specified from command line.
* `type`: `number`
* `default`: `0`
* `since`: `v0.0.1`
* `note`: This should only either be defined in `lila.config.js` file or be specified from command line.

## envAlias

* `desc`: Environment alias, semantically specify current environment from command line.
* `type`: `map`
* `since`: `v0.0.1`
* `note`: This should only be defined in `lila.config.js` file.
* `default`:

```
{
    // name -> index
    test: 0,
    production: 1,
    prod: 1
}
```

## <a name="envOptions">envOptions</a>

* `desc`: Config options for different environments. You can override config root attributes according to different environment, such as `minJs`, `minCss`, `minHtml`, etc.
* `type`: `array`
* `default`: Empty
* `since`: `v0.1.0`
* `example`:

```
[
    // env == 0
    {
        // root option
    }
    // ...
]
```

## basePaths

* `desc`: Base paths of project.
* `type`: `map`
* `since`: `v0.0.1`
* `note`: This should only be defined in `lila.config.js` file.
* `default`:

```
{
    buildRoot: './project',
    webRoot: './project'
}
```

#### basePaths.buildRoot

* `desc`: Root directory for building, also the parent directory of `src/dev/dist`.
* `type`: `string`
* `default`: `./project`
* `since`: `v0.0.1`

#### basePaths.webRoot

* `desc`: Web root directory, means web absolute path starting by.
* `type`: `string`
* `default`: `./project`
* `since`: `v0.0.1`

## webpack

* `desc`: Custom `webpack` config.
* `see`: [webpack](https://webpack.js.org/)
* `type`: `map`
* `default`: Empty
* `since`: `v0.3.0`

## rules

* `desc`: Extra webpack module rules.
* `see`: [Builtin rules(loaders)](./builtin_rules.md)
* `type`: `array`
* `default`: Empty
* `since`: `v0.3.0`
* `note`: If you have defined extra webpack module rules here, you should not define more module rules in `webpack.module.rules` config attribute.

## plugins

* `desc`: Extra webpack plugins.
* `see`: [Builtin plugins](./builtin_plugins.md)
* `type`: `array`
* `default`: Empty
* `since`: `v0.3.0`
* `note`: If you have defined extra webpack plugins here, you should not define more plugins in `webpack.plugins` config attribute.

## hotModuleReplacement

* `desc`: Options for [HotModuleReplacementPlugin](https://webpack.js.org/plugins/hot-module-replacement-plugin/).
* `type`: `map`
* `default`: `{}`
* `since`: `v0.3.0`

## htmlWebpack

* `desc`: Options for [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).
* `type`: `map`
* `default`: `{}`
* `since`: `v0.3.0`

## provide

* `desc`: Options for [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/).
* `type`: `map`
* `default`: Empty
* `since`: `v0.0.1`
* `example`:

```
{
    $: 'jquery',
    jQuery: 'jquery'
}
```

## define

* `desc`: Options for [DefinePlugin](https://webpack.js.org/plugins/define-plugin/).
* `type`: `map`
* `default`: Empty
* `since`: `v0.2.2`
* `example`:

```
{
    PRODUCTION: JSON.stringify(true),
    VERSION: JSON.stringify("5fa3b9")
}
```

## bundleAnalyzer

* `desc`: Options for [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer).
* `type`: `map`
* `default`: `{analyzerPort: 8190}`
* `since`: `v0.3.0`

## builtinRules

* `desc`: Webpack's builtin rules(loaders), you can override it with your own rules(loaders).
* `see`: [Builtin rules(loaders)](./builtin_rules.md)
* `since`: `v0.3.0`

## babelLoaderExclude

* `desc`: How to exclude files when use [babel-loader](https://github.com/babel/babel-loader).
* `type`: `array`
* `default`: `[/node_modules/]`
* `example`: Exclude files under `src/common` & `node_modules`: `[/src\/common/, /node_modules/]`.
* `since`: `v0.3.0`

## import

* `desc`: Options for [babel-plugin-import](https://github.com/ant-design/babel-plugin-import).
* `type`: `map/array`
* `default`: `[]`
* `since`: `v0.2.1`

## enableCssModules

* `desc`: Whether to use [css modules](https://github.com/css-modules/css-modules).
* `type`: `bool`
* `default`: `false`
* `since`: `v0.2.1`

## cssModulesExclude

* `desc`: How to exclude files when transform `css-modules`. [More to see](https://webpack.js.org/configuration/module/#condition).
* `type`: `array`
* `default`: `[/node_modules/]`
* `example`: Exclude files under `src/common` & `node_modules`: `[/src\/common/, /node_modules/]`.
* `since`: `v0.2.2`

## packCssSeparately

* `bg`: Normally, all js and css files will be built into one big `js` file.
* `desc`: Whether to pack css separately into a single css file.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## fileLoaderSuffixes

* `desc`: Indicates which files to load, like `jpg, gif, png, ttf, svg, ...`
* `see`: [file-loader](https://webpack.js.org/loaders/file-loader/)
* `type`: `array`
* `default`: `['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`
* `since`: `v0.0.4`

## resolveAlias

* `desc`: Create aliases to import or require certain modules more easily.
* `type`: `map`
* `see`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias)
* `default`: Empty
* `since`: `v0.0.1`
* `note`: If you have defined webpack resolve alias here, you should not define more resolve alias in `webpack.resolve.alias` config attribute.
* `example`:

```
{
    handlebars: 'handlebars/dist/handlebars.js'
}
```

## resolveModules

* `desc`: Tell webpack what directories should be searched when resolving modules.
* `see`: [resolve-modules](https://webpack.js.org/configuration/resolve/#resolve-modules)
* `type`: `array`
* `default`: Empty
* `since`: `v0.2.0`
* `note`: You should only define more webpack resolve modules here, not in `webpack.resolve.modules` config attribute.
* `detail`: Here is for you to provide extra directories when resolving modules.
    * By default, there are three levels of directories: 
        1. `src` in project.
        2. `node_modules` in project root.
        3. `node_modules` of webpack's default.
    * The new sequences if defined `resolveModules` will be:
        1. `src` in project.
        2. `node_modules` in project root.
        3. `resolveModules` defined in `lila.config.js`.
        4. `node_modules` of webpack's default.
* `example`: All paths defined here should be relative to project root.

```
[
    '../dir',
    '../../dir2/'

    ...
]
```

## out

* `desc`: Whether to use `outResolveAlias`, can and always be specified from command line.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.2.0`

## outResolveAlias

See [Use extra `resolveAlias` temporarily](./out.md).

* `since`: `v0.2.0`

## browserSync

* `desc`: Custom `browser-sync` config options.
* `see`: [browser-sync](https://github.com/BrowserSync/browser-sync)
* `type`: `map`
* `default`: `{}`
* `since`: `v0.1.3`

## devServerPort

* `desc`: Dev server port.
* `type`: `number`
* `default`: 8090
* `since`: `v0.0.1`

## treatAllMethodsAsGet

* `bg`: Normally, only `get` method can access to static file, and `post, put, delete...` will cause `404`.
* `desc`: Treat all methods as `get` method, thus all methods can access to static file.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.1.3`


