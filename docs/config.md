# Project config

## module

* `desc`: Current handling module name, can and always be specified from command line.
* `type`: `string`
* `default`: `test/index`
* `since`: `v0.0.1`
* `note`: This should only either be defined in `lila.config.js` file or be specified from command line.

## <a name="moduleOptions">moduleOptions</a>

* `desc`: Config options for special module. You can override config root attributes according to different module.
* `type`: `map`
* `default`: Empty
* `since`: `v0.3.0`
* `note`: This should only be defined in config's root attribute.
* `example`:

```
{
    'test/index': {...}, // One module
    'test-2/index,test-3/index': {...}, // Multiple modules
    'test-4/*': {...}, // All modules under `test-4` directory
    'test-5/index,test-6/*': {...}, // Multiple modes
    ...
}
```

## cmdAlias

* `desc`: Custom command line arguments alias.
* `type`: `map`
* `since`: `v0.0.1`
* `note`: This should only be defined in config's root attribute.
* `default`:

```
{
    // alias -> real name
    e: 'env', // environment
    l: 'local', // local name
    o: 'out', // Whether to use outResolveAlias.
    w: 'onlyWebpack' // Only run webpack task, without gulp, for dist and sync command.
}
```

## local

* `desc`: Current local name, used to get `local option`, can and always be specified from command line by `-l`.
* `type`: `string`
* `default`: Empty
* `since`: `v0.2.0`
* `note`: This should only either be defined in `lila.config.js` file or be specified from command line.

## <a name="localOptions">localOptions</a>

* `desc`: Config options for different local developers. You can override config root attributes according to different local name.
* `type`: `map`
* `default`: Empty
* `since`: `v0.2.0`
* `note`: This should only be defined in config's root attribute.
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

* `desc`: Current environment index, can and always be specified from command line by `-e`.
* `type`: `number`
* `default`: `0`
* `since`: `v0.0.1`
* `note`: This should only either be defined in `lila.config.js` file or be specified from command line.

## envAlias

* `desc`: Environment alias, semantically specify current environment from command line.
* `type`: `map`
* `since`: `v0.0.1`
* `note`: This should only be defined in config's root attribute.
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
* `note`: This should only be defined in config's root attribute.
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

## webpackDev

* `desc`: Options for [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware), and only for `dev` command.
* `type`: `map`
* `default`: `{}`
* `since`: `v0.3.0`

## webpackHot

* `desc`: Options for [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware), and only for `dev` command.
* `type`: `map`
* `default`: `{}`
* `since`: `v0.3.0`

## writeFile

* `desc`: When in `dev` mode, whether write bundle files to the file system.
* `type`: `bool`
* `default`: `false`
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

## babelLoaderPresets

* `desc`: Extra presets of [babel-loader](https://github.com/babel/babel-loader).
* `type`: `array`
* `default`: empty
* `builtin`: `babel-preset-es2015`, `babel-preset-stage-0`
* `since`: `v0.3.0`

## babelLoaderPlugins

* `desc`: Extra plugins of [babel-loader](https://github.com/babel/babel-loader).
* `type`: `array`
* `default`: empty
* `builtin`: `babel-plugin-transform-react-jsx`, `babel-plugin-import`
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

## cssModules

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

## cssModulesName

* `desc`: How to rename css class name when transform `css-modules`. [More to see](https://github.com/webpack-contrib/css-loader#localidentname).
* `type`: `string`
* `default`: `[hash:base64]`
* `example`: `[path][name]__[local]--[hash:base64:5]`.
* `since`: `v0.3.1`

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

* `desc`: Whether to use `outResolveAlias`, can and always be specified from command line by `-o`.
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

## onlyWebpack

* `desc`: Sometimes, we just want to run webpack task, without gulp. Additionally, it always be specified from command line by `-w`.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.3.0`

## minJs

* `desc`: Whether mini js files.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## minJsOptions

* `desc`: Options to min js files.
* `see`: [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
* `type`: `map`
* `default`: `{}`
* `since`: `v0.3.0`

## minCss

* `desc`: Whether mini css files.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## minCssOptions

* `desc`: Options to min css files.
* `see`: [gulp-csso](https://github.com/ben-eb/gulp-csso)
* `type`: `map`
* `default`: `{comments: false}`
* `since`: `v0.3.0`

## minHtml

* `desc`: Whether mini html files.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## minHtmlOptions

* `desc`: Options to min html files.
* `see`: [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin)
* `type`: `map`
* `since`: `v0.3.0`
* `default`: 

```
{
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: false,
    minifyCSS: true
}
```

## htmlReplace

* `desc`: Html replacement.
* `type`: `map`
* `default`: Empty
* `since`: `v0.0.1`
* `example`:

```
{
    // string/regexp -> replacement
}
```

## htmlInsert

* `desc`: Html insertion.
* `type`: `map`
* `default`: Empty
* `since`: `v0.0.1`
* `example`:

```
{
    // start of document
    // start: "",

    // end of document
    // end: ""
}
```

## htmlExtension

* `desc`: Convert html file to other extension file, such as `jsp, php, asp`.
* `type`: `string`
* `default`: Empty
* `since`: `v0.0.1`

## recordFileChanges

* `desc`: Whether record file changes, thus next time only handle changed files.
* `type`: `bool`
* `default`: `true`
* `since`: `v0.0.1`

## directoriesToSync

* `desc`: Other directories to sync to server.
* `type`: `map`
* `default`: Empty
* `since`: `v0.0.1`
* `note`: `base, common` is system reserved keyword, so you should not use one of them.
* `example`:

```
{
    // key -> path(relative to basePaths.webRoot)
    // images: "images",
    // fonts: "fonts"
}
```

## moduleGroup

* `desc`: If you always handle some multiple modules, you can make those modules as a group, and next time just input the groupName instead of those modules when build. 
* `type`: `map`
* `default`: Empty
* `since`: `v0.0.1`
* `note`: `groupName` should not be conflicting with existed moduleName.
* `example`:

```
moduleGroup: {
    // groupName -> modules[array]
    group1: [
        "test/index",
        "test/index2"
        // ...
    ]
}
```

## renameHtml

* `desc`: Rename html after building.
* `bg`: Sometimes, some html have to be renamed, include path, especially when the server side requires another different html file.
* `type`: `map`
* `default`: Empty
* `since`: `v0.0.6`
* `example`:

```
{
    // origin: dist/html/test/index.html -> ultimate: dist/html/other/inner/index.html
    'test/index': 'other/inner/index'
}
```

## backupHtml

* `desc`: Whether backup html(or converted files from html) after each building.
* `type`: `bool`
* `default`: `false`
* `since`: `v0.0.1`

## staticServerUrl

* `desc`: Base static server url when place static files elsewhere.
* `type`: `string`
* `default`: Empty
* `since`: `v0.2.0`
* `example`:
    - `/sub_dir`: The same server with `web`, but in a `sub_dir`.
    - `http://www.static.com`: Standalone static server.
    - `https://www.static.com/sub_dir`: Sub dir of a standalone static server.
    - `//www.static.com/sub_dir/sub_sub_dir`: Another sub dir of a standalone static server.

##  splitJs

* `bg`: Normally, all js files will be built into one big file.
* `desc`: Indicates how to split one big js file into many smaller js files.
* `type`: `map`
* `default`: Empty
* `since`: `v0.1.0`
* `note`: Normally, this always be configured in `moduleOptions` of each module.
* `example`:

```
{
    lib: ['jquery', 'react', 'react-dom'],
    common: ['common/file1', 'common/file2'],
    base: ['base/file1', 'base/file2']
}
```

Above will generate extra 3 js files apart from main js file, thus html will like:

```
<script src="/path/to/lib.js"></script>
<script src="/path/to/common.js"></script>
<script src="/path/to/fill.js"></script>
<script src="/path/to/main.js"></script>
```

## servers

Remote servers config.

See [Project config - servers](./servers.md).

* `since`: `v0.3.0`

## mock

* `desc`: Whether to use `js` files mock data in developing. 
* `type`: `bool`
* `default`: `true`
* `since`: `v0.3.1`

## beforeFormatConfig

* `desc`: Callback before formatting a project config, you can modify project config before it applys to building process.
* `type`: `function`
* `default`: empty
* `since`: `v0.3.0`
* `example`: 

```
(config, argv) => {
    // Modify config as you want.
}
```
* `config`: Project config.
* `argv`: Arguments from command line. See [minimist](https://github.com/substack/minimist). 

## esLintOptions

* `desc`: Options to initialize [eslint](https://github.com/eslint/eslint) CLIEngine.
* `see`: [ESLint - Node.js API - CLIEngine](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
* `type`: `map`
* `default`: `{}`
* `since`: `v0.3.1`

## esLintFix

* `desc`: Whether to try to fix errors and warnings when use [eslint](https://github.com/eslint/eslint).
* `see`: [ESLint - Node.js API - CLIEngine](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)
* `type`: `bool`
* `default`: `false`
* `since`: `v0.3.1`

## styleLintOptions

* `desc`: Options to initialize [stylelint](https://github.com/stylelint/stylelint).
* `see`: [stylelint - Node.js API - options](https://stylelint.io/user-guide/node-api/#options)
* `type`: `map`
* `default`: `{}`
* `since`: `v0.3.1`

## styleLintFix

* `desc`: Whether to try to fix errors and warnings when use [stylelint](https://github.com/stylelint/stylelint).
* `see`: [stylelint - Node.js API - options](https://stylelint.io/user-guide/node-api/#options)
* `type`: `bool`
* `default`: `false`
* `since`: `v0.3.1`

## prettierOptions

* `desc`: Options to initialize [prettier](https://github.com/prettier/prettier).
* `see`: [prettier - options](https://prettier.io/docs/en/options.html)
* `type`: `map`, details to see [minimist](https://github.com/substack/minimist) 
* `default`: `{}`
* `since`: `v0.3.1`
