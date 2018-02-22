# Module files

## workspace

every module has a workspace in `src` directory, for example, if current module is `test/inner`, the workspace is `src/test/inner` directory.

## files

every module must have a `html` file and a `js` file, and paths is liking follows(module: `test/inner`):
 
* html: `src/test/inner/index.html`
* js: `src/test/inner/index.js`
* css/less: you import `css/less` files in `js` file whatever you like.

## recommended workspace structure

```
| - workspace
    | - index.html (required)
    | - index.js (required)
    | - config.js (custom config file, system reserved)
    | - index.less/index.css (stylesheet)
    | - js (directory: more js files)
    | - css/less (directory: more stylesheet files)
    | - images (directory: image files)
    | - ...
```

## note

the html in production is not the same as `src`. for example, in `src`, the path is `src/test/inner/index.html`, in `dist` of production, the path is `dist/test/inner.html`  