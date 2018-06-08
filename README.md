# lila

An automatic building tool of web frontend, for teamwork.

## Quick start

Install lila: 

```
npm install lila -g
```

New project

```
lila new demo
```

Install local lila

```
cd demo && npm install lila --save-dev
```

## 1. Directory structure.

```
|-- project/
    |-- src/ Source directory.
    |-- dev/ Development directory.
    |-- dist/ Production directory.
    |-- images/ Common images directory.
    |-- ...
```

* `src`: Source directory, where to place all source codes, like `html, css, less, js, images...` 
* `dev`: Development directory, system reserved temporary directory to debug in browser. 
* `dist`: Production directory, system reserved temporary directory, generated after building. 

## 2. Module files.

### 2.1 Module

A module means a package with a `html` entry file and a `js` entry file, which can start a local server to debug. 

### 2.2 Workspace

Each module has a workspace under `src` directory.
 
For example, if current module is `test/inner`, the workspace is `src/test/inner` directory.

### 2.3 Files

Each module must have a `html` file and a `js` file, and paths are as follows(module: `test/inner`):

```
|-- src/
    |-- test/
        |-- inner/
            |-- index.html
            |-- index.js
```

* `html`: `src/test/inner/index.html`
* `js`: `src/test/inner/register.js`

#### note

Here isn't a `css/less` entry file, for style files are loaded by `javascript`.

### 2.4 Recommended workspace structure.

```
|-- src/
    |-- test/
        |-- inner/ Workspace of `test/inner` module.
            |-- index.html Html entry file(required).
            |-- register.js Js entry file(required).
            |-- config.js Custom config file(system reserved).
            |-- index.less
            |-- index.css Main stylesheet file.
            |-- html/ To place more html segments files.
            |-- js/ To place more js files.
            |-- css/
            |-- less/ To place more stylesheet files.
            |-- images/ To place more image files.
            |-- data/ To place more api-mock json files.
            |-- ...
```

### 2.5 Html file

You can split one single html file into pieces, and use [webpack require](https://webpack.js.org/loaders/html-loader/) to import pieces into the main html file.

##### Example: 

```
# index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
</head>
<body>
${require('./html/piece-1.html')}
${require('./html/piece-2.html')}
<div class="box">China</div>
</body>
</html>

# piece-1.html
<div id="example"></div>
<h1>Hello World!</h1>
<div class="glyphicon glyphicon-fire"></div>

# piece-2.html
<div class="test-index"></div>
<div class="test-index-2"></div>
<div class="test-index-less"></div>
```

##### Result: 

```
# index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World!</title>
</head>
<body>
<div id="example"></div>
<h1>Hello World!</h1>
<div class="glyphicon glyphicon-fire"></div>
<div class="test-index"></div>
<div class="test-index-2"></div>
<div class="test-index-less"></div>
<div class="box">China</div>
</body>
</html>
```

### 2.6 Js file

You can import all other files into js files, including `css/less/images...` files.

##### Example:
 
```
require('bootstrap/dist/css/bootstrap.css');
require('../../test/index.css');
require('../../test/index2.css');
require('../../test/index.less');

let img = require('../path/to/an/image');
```

### 2.7 Dynamically load modules.

You can use `require.ensure()` or `import()` to load modules dynamically.

##### Example:

```
import('your/module').then(yourModule => {
    // do something
});

require.ensure([], require => {
    let yourModule = require('your/module');
    // do something
});
```

More to see: [require.ensure](https://webpack.js.org/api/module-methods/#require-ensure), [import](https://webpack.js.org/api/module-methods/#import-)

### 2.8 note

The html file in production is not the same as `src`. 

For example, in `src`, html file path is `src/test/inner/index.html`, in `dist` of production, html file path is `dist/test/inner.html`.

## 3. Command line.

```
lila <command> [args]
```

### 3.1 `new`: New a project.

```
lila new projectName
```

* `since`: `v0.0.1`

### 3.2 `add`: Add a module.

```
lila add moduleName
```

* `since`: `v0.0.1`

### 3.3 `dev`: Watch files' changes, with hot replacing and reloading, and start a local server for debug.

```
lila dev moduleName
```

* Can take with arguments: `local/l`, `out/o`.
* `since`: `v0.0.1`

### 3.4 `dist`: Pack source codes and static files into production, including minimizing, splitting, path correcting, etc.

```
lila dist moduleName [-e 0(1,2)]
```

* Can take with arguments: `env/e`, `local/l`, `out/o`.
* `since`: `v0.0.1`

### 3.5 `sync`: Firstly do production tasks, and then sync production files to remote.

```
lila sync moduleName [-e 0(1,2)]
```

* Can take with arguments: `env/e`, `local/l`, `out/o`.
* `since`: `v0.0.1`

### 3.6 `analyze/ana`: Visualize size of webpack output files with an interactive zoomable treemap.

```
lila analyze moduleName

# or
lila ana moduleName
```

* `since`: `v0.1.4`

### 3.7 Arguments.

#### 3.7.1 `env/e`:

* Specify current environment through command line, example: `-e 0`, `-e 1`;
* If env is string, default is `test=0, prod/production=1`. And you can configure it in `envAlias` of project config;
* If env is not provided, default is `0`.

#### 3.7.2 `local/l`

* Specify current local name through command line.

#### `out/o`

* Specify whether to use `outResolveAlias`.

#### 3.7.3 `moduleName`

* `test/index`: A single file module.
* `test/index,test/index2`: Multiple modules.
* `test/*` : Wildcard, means all modules under directory `src/test`.
* `test/index,test2/*` : Multiple modes.
* `*` or `all` : Specially, indicates all modules in current project(On linux or mac, you should use `all`, and `*` will not work).


## 4. Server side command line.

Commands to manage production files on server side.

### 4.1 `archive/arc`: Archive files of dist directory into a zip package.

```
lila archive

# or
lila arc
```

* Current working directory should have a sub directory named `dist`.
* This command just do with `dist` directory, if you want to archive the whole project, please use your own way.
* `since`: `v0.0.1`

### 4.2 `clean`: Clean redundant `hash-coded` files which created by revision, and are not used anymore.

```
lila clean
```

* Current working directory should have a sub directory named `dist`.
* Before execute this command, `archive` will be automatically executed once.
* After executing this command, you should remove `.lila` directory in root of project.
* `since`: `v0.0.1`

### 4.3 `revert`: Revert `dist` directory to last archive state.

```
lila revert [-i,--index(1,2,3)]
```

* Current working directory should have a sub directory named `dist`.
* This command should be used after done `clean` command, and you want to restore it.
* Can take with argument `index(i)`, to specify last nth state to revert, default is `1`
* `since`: `v0.0.1`

## 5. Project config.

Project config is defined in `lila.config.js`. See [Detail project config](./docs/config.md).

### 5.1 Custom config for each developer.

Each developer can have his/her own private config. See [Project config - localOptions](./docs/config.md#localOptions).

### 5.2 Custom config for each module.

Each module can have its own private config.

1. Defined in a `config.js` file under its workspace. For example, if current module is `test/index`, the config js file is `src/test/index/config.js`;
2. It can override project config value defined in `lila.config.js`.

##### Example:

```
module.exports = {
    // some config
}
```

### 5.3 Custom config for different environment.

You can make different configs according to different environments. See [Project config - envOptions](./docs/config.md#envOptions).

### 5.4 Custom config for each command.

Each command can have its own private config. See [Project config - commandOptions](./docs/config.md#commandOptions).

### 5.5 More custom config from command line.

You can override config by pass arguments from command line.

##### Example:

```
lila dev test/index --devServerPort 9999
```

Now, the `devServerPort` config option become `9999`.

### 5.6 Custom config loading sequences.

```
locaOptions -> customConfig -> envOptions -> commandOptions -> cmdValues
```

The later loaded config values will override the former loaded config values.

## 6. Examples

See [lila examples](./examples).
