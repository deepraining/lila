# lila

An automatic building tool of web frontend, for teamwork.

## Quick start

Install lila:

```
npm install lila -g
```

New project:

```
lila new demo
```

Install dependencies:

```
cd demo && git init && npm install
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

- `src`: Source directory, where to place all source codes, like `html, css, less, js, images...`.
- `dev`: Development directory, system reserved temporary directory to debug in browser.
- `dist`: Production directory, system reserved temporary directory, generated after building.

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

- `html`: `src/test/inner/index.html`
- `js`: `src/test/inner/register.js`

#### note

Here isn't a `css/less` entry file, for style files are loaded by `javascript`.

### 2.4 Recommended workspace structure.

```
|-- src/
    |-- test/
        |-- inner/ Workspace of `test/inner` module.
            |-- index.html Html entry file(required).
            |-- register.js Js entry file(required).
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

- `since`: `v0.0.1`

### 3.2 `add`: Add a module.

```
lila add moduleName
```

- `since`: `v0.0.1`

### 3.3 `dev`: Watch files' changes, with hot replacing and reloading, and start a local server for debug.

```
lila dev moduleName
```

- Can take with arguments: `local/l`, `out/o`.
- `since`: `v0.0.1`

### 3.4 `dist`: Pack source codes and static files into production, including minimizing, splitting, path correcting, etc.

```
lila dist moduleName [-e 0(1,2)]
```

- Can take with arguments: `env/e`, `local/l`, `out/o`.
- `since`: `v0.0.1`

### 3.5 `sync`: Firstly do production tasks, and then sync production files to remote servers.

```
lila sync moduleName [-e 0(1,2)]
```

- Can take with arguments: `env/e`, `local/l`, `out/o`.
- `since`: `v0.0.1`

### 3.6 `analyze`: Visualize size of webpack output files with an interactive zoomable treemap.

```
lila analyze moduleName
```

- `since`: `v0.1.4`

### 3.7 Arguments.

#### 3.7.1 `env/e`:

- Specify current environment through command line, example: `-e 0`, `-e 1`;
- If env is string, default is `test=0, prod/production=1`. And you can configure it in `envAlias` of project config;
- If env is not provided, default is `0`.

#### 3.7.2 `local/l`

- Specify current local name through command line.

#### `out/o`

- Specify whether to use `outResolveAlias`.

#### 3.7.3 `moduleName`

- `test/index`: A single file module.
- `test/index,test/index2`: Multiple modules.
- `test/*` : Wildcard, means all modules under directory `src/test`.
- `test/index,test2/*` : Multiple modes.
- `*` or `all` : Specially, indicates all modules in current project(On linux or mac, you should use `all`, and `*` will not work).

## 4. Project config.

Project config is defined in `lila.config.js`. See [Detail project config](./docs/config.md).

### 4.1 Custom config for each developer.

Each developer can have his/her own private config. See [Project config - localOptions](./docs/config.md#localOptions).

### 4.2 Custom config for each module.

Each module can have its own private config. See [Project config - moduleOptions](./docs/config.md#moduleOptions).

### 4.3 Custom config for different environment.

You can make different configs according to different environments. See [Project config - envOptions](./docs/config.md#envOptions).

### 4.4 Custom config for each command.

Each command can have its own private config. See [Project config - commandOptions](./docs/config.md#commandOptions).

### 4.5 More custom config from command line.

You can override config by pass arguments from command line.

##### Example:

```
lila dev test/index --devServerPort 9999
```

Now, the `devServerPort` config option become `9999`.

Also, you can put any extra configs through command line.

```
lila dev test/index --extraArg1 extraValu1 --extraArg2 extraValu2 --extraArg3
```

In your project config from `lila.config.js`, there will be 3 more fields.

```
{
  ... // Original existed options.
  extraArg1: extraValu1,
  extraArg2: extraValu2,
  extraArg1: true
}
```

Relative reference: [minimist](https://github.com/substack/minimist).

### 4.6 Custom config loading sequences.

```
localOptions -> moduleOptions -> envOptions -> commandOptions -> cmdValues
```

The later loaded config values will override the former loaded config values.

## 5. Use mock data in developing.

When in developing, using mock data to debug locally is recommended. There are two ways:

### 5.1 Use `json` files.

You can put all your `json` files into `data` directory(`data` is recommended, not required) of one module's workspace, like this:

```
|-- /src/one/module/data/ Mock data files directory
    |-- file1.json
    |-- file2.json
    |-- ...
```

Now, you can access to those files through `/src/one/module/data/file1.json, /src/one/module/data/file2.json, ...`.

### 5.2 Use `js` files.

Using `json` files has a big disadvantage, that we could not make a `if`, `loop` etc, to dynamically get response data. Thus, we can use `js` files to avoid this.

```
|-- /src/one/module/data/ Mock data files directory
    |-- file1.js
    |-- file2.js
    |-- ...
```

Now, you can access to those files through `/src/one/module/data/file1, /src/one/module/data/file2, ...`.

Normally, a `js` file should be written like this:

```
module.exports = (req, res) => {
    // Do everything you want.
};
```

Arguments `req, res` refer to [Node Http](https://nodejs.org/dist/latest-v8.x/docs/api/http.html).

##### Note.

- The js file name should not have `.` character, or it will not take effectively.
- You can disable this by set `mock: false` in `lila.config.js`.

### 5.3 Your own ways.

Also, you can use your own way to make it, like [mock.js](https://github.com/nuysoft/Mock).

### 5.4 With [see-ajax](https://github.com/senntyou/see-ajax), [see-fetch](https://github.com/senntyou/see-fetch).

You can use [see-ajax](https://github.com/senntyou/see-ajax), [see-fetch](https://github.com/senntyou/see-fetch) to develop more efficient.

## 6. Develop with distributed intermediate layer node.js application.

When develop node.js application, [nodemon](https://github.com/remy/nodemon) is recommended. It provides a functionality which is similar with lila's hot reloading: monitor for any changes in node.js application and automatically restart the server.

When use node.js application as distributed intermediate layer, we can unite `nodemon`'s automatically restarting the server with `lila`'s hot reloading. Thus we can both modify node.js application and lila web project at the same time, and those changes will both apply to developing environment(browsers and command line).

Here is an example, and you can follow the steps to see how to use: [Example for developing with distributed intermediate layer node.js application](./examples/node).

## 7. Packages

- [webpack](https://webpack.js.org): 3.12.0
- [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware): 2.0.6
- [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware): 2.22.2
- [browser-sync](https://github.com/BrowserSync/browser-sync): 2.24.4
- [gulp](https://github.com/gulpjs/gulp): 4.0.0

More to see [package.json](./package.json).

## 8. Upgrade to new version from old versions.

See [Change log](./CHANGELOG.md), [Upgrade log](./UPGRADE.md).

## 9. Examples

See [lila examples](./examples).

## 10. Clean obsolete hash-code files in server-side.

After several building and uploading to servers, there will be some obsolete files, such as js and css, which will not be used any more. You can use [sclean](https://github.com/senntyou/sclean) to clean them.   

## 11. Troubleshooting

1. On Ubuntu 18.04, you should at least make `webpackDev: {watchOptions: {ignored: /node_modules/}}`, or lila will not auto recompiling and reloading when build with a large bundle.
