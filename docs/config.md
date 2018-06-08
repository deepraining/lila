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

## localOptions

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

## commandOptions

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

## envOptions

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

## plugins

* `desc`: Extra webpack plugins.
* `see`: [Builtin plugins & loaders](./builtin.md)
* `type`: `array`
* `default`: Empty
* `since`: `v0.3.0`
* `note`: If you have defined extra webpack plugins here, you should not define more plugins in `webpack.plugins` config attribute.

## rules

* `desc`: Extra webpack module rules.
* `see`: [Builtin plugins & loaders](./builtin.md)
* `type`: `array`
* `default`: Empty
* `since`: `v0.3.0`
* `note`: If you have defined extra webpack module rules here, you should not define more module rules in `webpack.module.rules` config attribute.









































## babelLoaderExclude

* `desc`: whether to ignore files under `node_modules` directory when transform `es6` to `es5`
* `type`: `bool`
* `default`: `true`
* `since`: `v0.3.0`

## provide

* `desc`: Automatically load modules instead of having to import or require them everywhere.
* `see`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)
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




## analyzerPort

* `desc`: server port for [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* `type`: `number`
* `default`: 8190
* `since`: `v0.1.4`














## out

* `desc`: whether use `outResolveAlias`, can and always be specified from command line.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.2.0`

## outResolveAlias

[use out resolve alias temporarily](./config/out.md)

* `since`: `v0.2.0`

## import

* `desc`: option for [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
* `type`: `map/array`
* `default`: Empty
* `since`: `v0.2.1`

## enableCssModules

* `desc`: whether to use [css modules](https://github.com/css-modules/css-modules)
* `type`: `bool`
* `default`: `false`
* `since`: `v0.2.1`

## cssModulesExclude

* `desc`: how to exclude files when transform `css-modules`. [more to see](https://webpack.js.org/configuration/module/#condition)
* `type`: `array`
* `default`: `[/node_modules/]`
* `example`: exclude files under `src/common` & `node_modules`: `[/src\/common/, /node_modules/]`
* `since`: `v0.2.2`

## browsers

* `desc`: `browsers` option for [autoprefixer](https://github.com/postcss/autoprefixer#options)
* `type`: `array`
* `default`: `[]`
* `example`: `['> 1%', 'iOS 7']`
* `since`: `v0.2.2`

## define

* `desc`: Allow you to create global constants which can be configured at compile time.
* `see`: [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)
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



## resolveAlias

* `desc`: create aliases to import or require certain modules more easily.
* `type`: `map`
* `see`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias)
* `default`: Empty
* `since`: `v0.0.1`
* `example`:

```
{
    handlebars: 'handlebars/dist/handlebars.js'
}
```

* `note`: if you have defined webpack resolve alias here, you should not defined more resolve alias in `webpack.resolve.alias` config attribute.

## resolveModules

* `desc`: tell webpack what directories should be searched when resolving modules.
* `see`: [resolve-modules](https://webpack.js.org/configuration/resolve/#resolve-modules)
* `type`: `array`
* `default`: Empty
* `since`: `v0.2.0`
* `example`: here is for you to provide extra directories when resolving modules.
by default, there are three levels of directories: `src` in project, `node_modules` in project root, `node_modules` of webpack's default.
* the new sequence of resolving modules will be:
    1. `src` in project
    2. `node_modules` in project root
    3. `resolveModules` defined in `lila.config.js`
    4. `node_modules` of webpack's default.
* `example`: all paths defined here should relative to project root.

```
[
    '../dir',
    '../../dir2/'

    ...
]
```
* `note`: if you have defined webpack resolve modules here, you should not defined more resolve modules in `webpack.resolve.modules` config attribute.

## htmlWebpackPlugin

* `desc`: extra [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) config options
* `type`: `map`
* `default`: Empty
* `since`: `v0.3.0`

## babelLoader

* `desc`: extra [babel-loader](https://github.com/babel/babel-loader) config options
* `type`: `map`
* `default`: 

```
{
    exclude: /node_modules/
}
```

* `since`: `v0.3.0`

## urlLoader

* `desc`: extra [url-loader](https://github.com/webpack-contrib/url-loader) config options
* `type`: `map`
* `default`: 

```
{
    options: {
        limit: 0
    }
}
```

* `since`: `v0.3.0`

## htmlLoader

* `desc`: extra [html-loader](https://github.com/webpack-contrib/html-loader) config options
* `type`: `map`
* `default`: 

```
{
    options: {
        attrs: ['img:src', 'link:href'],
        interpolate: 'require'
    }
}
```

* `since`: `v0.3.0`

## builtin

* `desc`: webpack's builtin loaders, you can override it with your own loaders.
* `see`: [builtin](./builtin.md)
* `since`: `v0.3.0`
