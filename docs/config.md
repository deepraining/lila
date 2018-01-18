# Project config

## module

* `desc`: current handling module name, can and always be specified from command line. 
* `default`: `test/index`

## env

* `desc`: environment index, used to get current `build option`, `network option` ..., can and always be specified from command line.
* `default`: `0`

## network

see [Project config - network](./config/network.md)

## devServerPort

* `desc`: dev server port
* `default`: 8090

## mockExpressServerPort

* `desc`: express data mock server port
* `default`: 8190

## buildOptions

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

* `note`: `base, common, resources` is system reserved keyword, so you should not use one of them.

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

## htmlToSpecifiedExt

* `desc`: convert html other extension file, such as jsp, php, asp 
* `default`: empty
* `detail`: `jsp`, `php` ...

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

## recordFileChanges

* `desc`: whether record file changes, thus next time only handle changed file
* `default`: `true`
* `detail`: `true` / `false`

## revisionFiles

* `desc`: whether rename js/css file by appending hash code to file name
* `default`: `true`
* `detail`: `true` / `false`

## revisionHashLength

* `desc`: revision hash code length
* `default`: `8`
* `detail`: `int`

## htmlAbsoluteAndCdnPath

* `desc`: whether convert relative path to absolute path and add cdn prefix in html
* `default`: `true`
* `detail`: `true` / `false`

## skipNotExistingFiles

* `desc`: whether skip not existing files when extract css and js from html
* `default`: `false`
* `detail`: `true` / `false`
* `example`: 

```
<!-- outer css file, not in local project -->
<link rel="stylesheet" href="outer/css/file">

<!-- outer js file, not in local project -->
<script src="outer/js/file"></script>
```

## cssAutoPrefix

* `desc`: whether auto add vendor prefixes to rules of css, such as `-webkit-, -moz-, -o-, -ms-`.
* `default`: `false`
* `detail`: `true` / `false`

## autoPrefixOption

* `desc`: option for `cssAutoPrefix`, more to see [autoprefixer](https://github.com/postcss/autoprefixer#options)
* `default`: empty

## doc

see [Project config - doc](./config/doc.md)

## moduleGroup

see [group of modules](./group.md)

## resolveAlias

* `desc`: Create aliases to import or require certain modules more easily.
* `see`: [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias)
* `default`: empty
* `detail`: the base directory is `src/js`, and this only do to js files.

## packCssSeparately

* `bg`: normally, all js and css files will be built into one file.
* `desc`: whether to pack css separately into a single css file.
* `default`: `false`
* `detail`: `true` / `false`

##  splitJs

* `bg`: normally, all js files will be built into one file.
* `desc`: whether to split one big js file into many smaller js files.
* `default`: `false`
* `detail`: `true` / `false`

##  splitJsMap

* `desc`: indicates how to split js file.
* `default`: empty
* `detail`: see [config webpack](./webpack.md)
* `note`: this always be configured in custom config of each module.

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