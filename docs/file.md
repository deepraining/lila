# Module files

* `html`: html should be in `dev/html`   
* `js`: js should be in `src/js`
* `css/less`: css should be in `src/css`

normally, a module(example: `test/inner`) contains following files:
 
* a html file: `dev/html/test/inner.html` (required)
* a js file: `src/js/test/inner.js` or `src/js/test/inner/index.js` (required)
* a css file: `src/css/test/inner.css`

if you want a single js module(no html), you can add an empty html file, and a custom config file, and make config like following:

```
module.exports = {
    config: {
        // disable renaming js/css file
        revisionFiles: !1
    }
};
```

if you want a single css module(no html/js), you can add an empty html and js file, and a custom config file, and make config like former.