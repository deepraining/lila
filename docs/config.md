# Project config

## module

* `desc`: current handling module name, can and always be specified from command line.
* `type`: `string`
* `default`: `test/index`
* `since`: `v0.0.1`

## env

* `desc`: current environment index, used to get current `build option`, `network option` ..., can and always be specified from command line.
* `type`: `number`
* `default`: `0`
* `since`: `v0.0.1`

## minJs

* `desc`: whether mini js files
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## minCss

* `desc`: whether mini css files
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## minHtml

* `desc`: whether mini html files
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## htmlReplace

* `desc`: html replacement
* `type`: `map`
* `default`: empty
* `since`: `v0.0.1`
* `detail`:

```
{
    // string/regexp -> replacement
}
```

## htmlInsert

* `desc`: html insertion
* `type`: `map`
* `default`: empty
* `since`: `v0.0.1`
* `detail`:

```
{
    // start of document
    // start: "",

    // end of document
    // end: ""
}
```

## htmlExtension

* `desc`: convert html file to other extension file, such as `jsp, php, asp`
* `type`: `string`
* `default`: empty
* `since`: `v0.0.1`

## recordFileChanges

* `desc`: whether record file changes, thus next time only handle changed file
* `type`: `bool`
* `default`: `true`
* `since`: `v0.0.1`

## resolveAlias

* `desc`: create aliases to import or require certain modules more easily.
* `type`: `map`
* `see`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias)
* `default`: empty
* `since`: `v0.0.1`
* `example`:

```
{
    handlebars: 'handlebars/dist/handlebars.js'
}
```

## resolveModules

* `desc`: tell webpack what directories should be searched when resolving modules.
* `see`: [resolve-modules](https://webpack.js.org/configuration/resolve/#resolve-modules)
* `type`: `array`
* `default`: empty
* `since`: `v0.2.0`
* `detail`: here is for you to provide extra directories when resolving modules.
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

## packCssSeparately

* `bg`: normally, all js and css files will be built into one file.
* `desc`: whether to pack css separately into a single css file.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

##  splitJs

* `bg`: normally, all js files will be built into one file.
* `desc`: indicates how to split one big js file into many smaller js files.
* `type`: `map`
* `default`: empty
* `since`: `v0.1.0`
* `example`:

```
{
    lib: ['jquery', 'react', 'react-dom'],
    common: ['common/file1', 'common/file2'],
    base: ['base/file1', 'base/file2']
}
```

above will generate extra 3 js files from main js file, thus html will like:

```
<script src="/path/to/lib.js"></script>
<script src="/path/to/common.js"></script>
<script src="/path/to/base.js"></script>
<script src="/path/to/main.js"></script>
```

* `note`: normally, this always be configured in custom config of each module.

## ignoreNodeModules

* `desc`: whether to ignore files under `node_modules` directory when transform `es6` to `es5`
* `type`: `bool`
* `default`: `true`
* `since`: `v0.0.2`

## provide

* `desc`: Automatically load modules instead of having to import or require them everywhere.
* `see`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)
* `type`: `map`
* `default`: empty
* `since`: `v0.0.1`
* `example`:

```
{
    $: 'jquery',
    jQuery: 'jquery'
}
```

## fileLoaderSuffixes

* `desc`: Indicates which files to load, like `jpg, gif, png, ttf, svg, ...`
* `see`: [file-loader](https://webpack.js.org/loaders/file-loader/)
* `type`: `array`
* `default`: `['jpg', 'jpeg', 'png', 'gif', 'ico', 'svg', 'eot', 'ttf', 'woff', 'woff2']`
* `since`: `v0.0.4`

## staticServerUrl

* `desc`: base static server url when place static files elsewhere.
* `type`: `string`
* `default`: empty
* `since`: `v0.2.0`
* `example`:
    - `/sub_dir`: the same server with `web`, but in a `sub_dir`
    - `http://www.static.com`: standalone static server
    - `https://www.static.com/sub_dir`: sub dir of standalone static server
    - `//www.static.com/sub_dir/sub_sub_dir`: another sub dir of standalone static server

## backupHtml

* `desc`: whether backup html(or converted file from html) after each building.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## network

see [Project config - network](./config/network.md)

* `since`: `v0.0.1`

## devServerPort

* `desc`: dev server port
* `type`: `number`
* `default`: 8090
* `since`: `v0.0.1`

## analyzerPort

* `desc`: server port for [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* `type`: `number`
* `default`: 8190
* `since`: `v0.1.4`

## envOptions

* `desc`: build option of different environments. you can override config root attribute according to different environment, such as `minJs, minCss, minHtml ...`
* `type`: `array`
* `default`: empty
* `since`: `v0.1.0`
* `detail`:

```
[
    // env == 0
    {
        // root option
    }
    // ...
]
```

## cmdAlias

* `desc`: custom command line argument alias
* `type`: `map`
* `since`: `v0.0.1`
* `default`:

```
{
    // alias -> real name
    e: 'env', // environment
    l: 'local', // local value
    o: 'out' // whether use out resolve alias
}
```

## envAlias

* `desc`: environment alias, semantic environment argument values
* `type`: `map`
* `since`: `v0.0.1`
* `default`:

```
{
    // name -> index
    test: 0,
    production: 1,
    prod: 1
}
```

## basePaths

* `desc`: base paths of project
* `type`: `map`
* `since`: `v0.0.1`
* `default`:

```
{
    buildRoot: "./project",
    webRoot: "./project"
}
```

## basePaths.buildRoot

* `desc`: build root directory, also the parent directory of `src/dev/dist`
* `type`: `string`
* `default`: `./project`
* `since`: `v0.0.1`

## basePaths.webRoot

* `desc`: web root directory
* `type`: `string`
* `default`: `./project`
* `since`: `v0.0.1`

## directoriesToSync

* `desc`: other directories to sync to server
* `type`: `map`
* `default`: empty
* `since`: `v0.0.1`
* `detail`:

```
{
    // key -> path(relative to basePaths.webRoot)
    // images: "images",
    // fonts: "fonts"
}
```

* `note`: `base, common` is system reserved keyword, so you should not use one of them.

## moduleGroup

see [group of modules](./group.md)

* `since`: `v0.0.1`

## renameHtml

* `desc`: rename html after building.
* `bg`: sometimes, some html have to be renamed, include path, when the server side requires another different html file.
* `type`: `map`
* `default`: empty
* `since`: `v0.0.6`
* `example`:

```
{
    // origin: dist/html/test/index.html -> ultimate: dist/html/other/inner/index.html
    'test/index': 'other/inner/index'
}
```

## treatAllMethodsAsGet

* `bg`: normally, only `get` method can access to static file, but `post, put, delete...` will cause 404.
* `desc`: treat all methods as `get` method, thus all methods can access to static file.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.1.3`

## browserSync

* `desc`: custom `browser-sync` config
* `see`: [browser-sync](https://github.com/BrowserSync/browser-sync)
* `type`: `map`
* `default`: empty
* `since`: `v0.1.3`

## local

* `desc`: current local value, used to get `local option`, can and always be specified from command line.
* `type`: `string`
* `default`: empty
* `since`: `v0.2.0`

## localOptions

* `desc`: build option of different locals. you can override config root attribute according to different local value.
* `type`: `map`
* `default`: empty
* `since`: `v0.2.0`
* `detail`:

```
{
    person1: {...},
    person2: {...}
}
```

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
* `default`: empty
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
