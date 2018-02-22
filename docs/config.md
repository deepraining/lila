# Project config

## module

* `desc`: current handling module name, can and always be specified from command line. 
* `default`: `test/index`

## env

* `desc`: environment index, used to get current `build option`, `network option` ..., can and always be specified from command line.
* `default`: `0`

## minJs

* `desc`: whether mini js files
* `default`: `false`
* `detail`: `true` / `false`

## minCss

* `desc`: whether mini css files
* `default`: `false`
* `detail`: `true` / `false`

## minHtml

* `desc`: whether mini html files
* `default`: `false`
* `detail`: `true` / `false`

## htmlReplace

* `desc`: html replacement
* `default`: empty
* `detail`: 

```
{
    // string/regexp -> replacement
}
```

## htmlInsert

* `desc`: html insertion
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

* `desc`: convert html other extension file, such as `jsp, php, asp` 
* `type`: `string`
* `default`: empty

## recordFileChanges

* `desc`: whether record file changes, thus next time only handle changed file
* `default`: `true`
* `detail`: `true` / `false`

## resolveAlias

* `desc`: Create aliases to import or require certain modules more easily.
* `see`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias)
* `default`: empty
* `detail`: the base directory is `src`.

## packCssSeparately

* `bg`: normally, all js and css files will be built into one file.
* `desc`: whether to pack css separately into a single css file.
* `default`: `false`
* `detail`: `true` / `false`

##  splitJs

* `bg`: normally, all js files will be built into one file.
* `desc`: indicates how to split one big js file into many smaller js files.
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
* `default`: `true`
* `detail`: `true` / `false`

## provide

* `desc`: Automatically load modules instead of having to import or require them everywhere.
* `see`: [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)
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
* `default`: `['jpg', 'jpeg', 'png', 'gif', 'svg', 'eot', 'ttf', 'woff', 'woff2']`

## network

see [Project config - network](./config/network.md)

## devServerPort

* `desc`: dev server port
* `default`: 8090

## mockExpressServerPort

* `desc`: express data mock server port
* `default`: 8190

## envOptions

* `desc`: build option of different environments. you can override config root attribute according to different environment, such as `minJs, minCss, minHtml ...`
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
* `default`: 

```
{
    // alias -> real name
    e: "env" // environment
}
```

## envAlias

* `desc`: environment alias, semantic environment argument values
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
* `default`: 

```
{
    buildRoot: "./project",
    webRoot: "./project"
}
```

## basePaths.buildRoot

* `desc`: build root directory, also the parent directory of `src/dev/dist`
* `default`: `./project`

## basePaths.webRoot

* `desc`: web root directory
* `default`: `./project`

## directoriesToSync

* `desc`: other directories to sync to server
* `default`: empty
* `detail`: 

```
{
    // key -> path(relative to basePaths.webRoot)
    // images: "images",
    // fonts: "fonts"
}
```

* `note`: `base, common, res` is system reserved keyword, so you should not use one of them.

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