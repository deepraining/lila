# Project config

## module

* `desc`: current handling module name, can and always be specified from command line. 
* `default`: `test/index`

## env

* `desc`: environment index, used to get current `buildOption`, `networkOption` ..., can and always be specified from command line.
* `default`: `0`

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