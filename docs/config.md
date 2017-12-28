# Project config

## module

* `desc`: current handling module name, can and always be specified from command line. 
* `default`: `test/index`

## env

* `desc`: environment index, used to get current `buildOption`, `networkOption`, `filesMap`, `dirsMap` ..., can and always be specified from command line.
* `default`: `0`

## useRequireJs

* `desc`: whether use [require js](https://github.com/requirejs/requirejs) to build project.
* `default`: `false`

## requireJsConfigPath

* `desc`: requireJs config file path
* `default`: `/dev/js/common/require_js_config.js`
* `note`: 
    - it should be an absolute path, and relative to `basePaths.webRoot`
    - it will take effect when `useRequireJs` is `true`

## requireJsToTagLoad

* `desc`: convert js async load to sync tag load
* `default`: `false`
* `note`: it will take effect when `useRequireJs` is `true`
* `example`: 
    
```
// origin
require(['jquery', 'underscore'])

// result
<script src="path/to/jquery"></script>
<script src="path/to/underscore"></script>
require(['jquery', 'underscore'])
```

## requireJsConfigTagSelector

* `desc`: requireJs config file tag selector in html
* `default`: `[data-require-js-config-tag]`

## useInCss

* `desc`: whether use [in-css](https://github.com/senntyou/in-css) to build project
* `default`: `false`

## inCssConfigPath

* `desc`: InCss config file path
* `default`: `/dev/js/common/in_css_config.js`
* `note`:
    - it should be an absolute path, and relative to `basePaths.webRoot`
    - it will take effect when useInCss is true

## inCssToTagLoad

* `desc`: convert css async load to sync tag load
* `default`: `false`
* `note`: it will take effect when `useInCss` is `true`
* `example`: 

```
// origin
InCss.use('bootstrap', 'common')

// result
<link rel="stylesheet" href="path/to/bootstrap">
<link rel="stylesheet" href="path/to/common">
```

## inCssTagSelector

* `desc`: all InCss tag selector in html
* `default`: `[data-in-css-tag]`

## inCssConfigTagSelector

* `desc`: InCss config file tag selector in html
* `default`: `[data-in-css-config-tag]`

## inCssLoadTagSelector

* `desc`: InCss load tag selector in html
* `default`: `[data-in-css-load-tag]`

## networkOptions

see [Project config - networkOptions](./config/network-options.md)

## serverPort

* `desc`: local server port
* `default`: 8090

## mockExpressPort

* `desc`: express data mock server port
* `default`: 8190

## buildOptions

* `desc`: build option of current environment can override config root attribute
* `default`: empty
* `detail`: 

```
[
    // env == 0
    {
        // some option
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

## directoriesToBuild

see [all resources can disable cache](./cache.md)

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

## concatJsPriority

acquiescently, all js files will be merged into one single js file of the same name of module.

if you want to split it into many files, see [Project config - concatPriority](./config/concat-priority.md)

## concatCssPriority

acquiescently, all css files will be merged into one single css file of the same name of module.

if you want to split it into many files, see [Project config - concatPriority](./config/concat-priority.md)

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

## concatJs

* `desc`: whether merge js files
* `default`: `false`
* `detail`: `true` / `false`
* `extra`: if you want some scripts not merged, you can add `data-lilacs-no-concat="1"` attribute to avoid it.

## concatCss

* `desc`: whether merge css files
* `default`: `false`
* `detail`: `true` / `false`
* `extra`: if you want some scripts not merged, you can add `data-lilacs-no-concat="1"` attribute to avoid it.

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

## cssAbsolutePath

* `desc`: whether convert relative path to absolute path in css
* `default`: `true`
* `detail`: `true` / `false`

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
* `default`: `true`
* `detail`: `true` / `false`

## autoPrefixOption

* `desc`: option for `cssAutoPrefix`, more to see [autoprefixer](https://github.com/postcss/autoprefixer#options)
* `default`: empty

## doc

see [Project config - doc](./config/doc.md)

## filesMap

see [files&directories mapping](./mapping.md)

## dirsMap

see [files&directories mapping](./mapping.md)

## moduleGroup

see [group of modules](./group.md)

## useWebpack

* `desc`: whether use [webpack](https://github.com/webpack/webpack) to build project.
* `default`: `false`
* `detail`: see [use webpack to build](./webpack.md)

## resolveAlias

* `desc`: see [resolve-alias](https://webpack.js.org/configuration/resolve/#resolve-alias)
* `default`: empty
* `detail`: the base directory is `src/js`, and this only do to js files.
* `note`: it will take effect when `useWebpack` is `true`

## packCssSeparately

* `bg`: normally, all js and css files will be built into one file.
* `desc`: whether to pack css separately into a single css file when use [webpack](https://github.com/webpack/webpack) to build project.
* `default`: `false`
* `note`: it will take effect when `useWebpack` is `true`

##  splitJs

* `bg`: normally, all js files will be built into one file.
* `desc`: whether to split one big js file into many smaller js files when use [webpack](https://github.com/webpack/webpack) to build project.
* `default`: `false`
* `note`: it will take effect when `useWebpack` is `true`

##  splitJsMap

* `desc`: indicates how to split js file.
* `default`: empty
* `detail`: see [use webpack to build](./webpack.md)
* `note`:
    - this always be configured in custom config of current module. 
    - it will take effect when `useWebpack` is `true`