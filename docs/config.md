# Project config

## module

* `desc`: current handling module name, can and always be specified from command line.
* `type`: `string`
* `default`: `test/index`

## env

* `desc`: current environment index, used to get current `build option`, `network option` ..., can and always be specified from command line.
* `type`: `number`
* `default`: `0`

## minJs

* `desc`: whether mini js files
* `type`: `bool`
* `default`: `false`

## minCss

* `desc`: whether mini css files
* `type`: `bool`
* `default`: `false`

## minHtml

* `desc`: whether mini html files
* `type`: `bool`
* `default`: `false`

## htmlReplace

* `desc`: html replacement
* `type`: `map`
* `default`: empty
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

## recordFileChanges

* `desc`: whether record file changes, thus next time only handle changed file
* `type`: `bool`
* `default`: `true`

## resolveAlias

* `desc`: create aliases to import or require certain modules more easily.
* `type`: `map`
* `see`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias)
* `default`: empty
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
* `detail`: here is for you to provide extra directories when resolving modules.
by default, there are three levels of directories: `src` in project, `node_modules` in project root, `node_modules` of webpack's default.
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

##  splitJs

* `bg`: normally, all js files will be built into one file.
* `desc`: indicates how to split one big js file into many smaller js files.
* `type`: `map`
* `default`: empty
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

## provide

* `desc`: Automatically load modules instead of having to import or require them everywhere.
* `see`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)
* `type`: `map`
* `default`: empty
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

## staticServerUrl

* `desc`: base static server url when place static files elsewhere.
* `type`: `string`
* `default`: empty
* `example`:
    - `/sub_dir`: the same server with `web`, but in a `sub_dir`
    - `http://www.static.com`: standalone static server
    - `https://www.static.com/sub_dir`: sub dir of standalone static server
    - `//www.static.com/sub_dir/sub_sub_dir`: another sub dir of standalone static server

## backupHtml

* `desc`: whether backup html(or converted file from html) after each building.
* `type`: `bool`
* `default`: `false`

## network

see [Project config - network](./config/network.md)

## devServerPort

* `desc`: dev server port
* `type`: `number`
* `default`: 8090

## analyzerPort

* `desc`: server port for [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
* `type`: `number`
* `default`: 8190

## envOptions

* `desc`: build option of different environments. you can override config root attribute according to different environment, such as `minJs, minCss, minHtml ...`
* `type`: `array`
* `default`: empty
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
* `default`: 

```
{
    // alias -> real name
    e: 'env', // environment
    l: 'local', // local value
}
```

## envAlias

* `desc`: environment alias, semantic environment argument values
* `type`: `map`
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

## basePaths.webRoot

* `desc`: web root directory
* `type`: `string`
* `default`: `./project`

## directoriesToSync

* `desc`: other directories to sync to server
* `type`: `map`
* `default`: empty
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


## renameHtml

* `desc`: rename html after building.
* `bg`: sometimes, some html have to be renamed, include path, when the server side requires another different html file.
* `type`: `map`
* `default`: empty
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

## browserSync

* `desc`: custom `browser-sync` config
* `see`: [browser-sync](https://github.com/BrowserSync/browser-sync)
* `type`: `map`
* `default`: empty

## local

* `desc`: current local value, used to get `local option`, can and always be specified from command line.
* `type`: `string`
* `default`: empty

## localOptions

* `desc`: build option of different locals. you can override config root attribute according to different local value.
* `type`: `map`
* `default`: empty
* `detail`:

```
{
    person1: {...},
    person2: {...}
}
```