# Writing code

1. separate resources: `js/css/html` load separately, it's recommended not to load across.
2. `js/css` in `html` should load by relative path, not absolute path. 

## use [requirejs](https://github.com/requirejs/requirejs) (`useRequireJs = true`)

1. all `js` modules should start with `define`, but not `require`.
2. here must have a `js` file which name is the same as html.
3. `js` in `html` should load as follows: 

```
<script src="path/to/requirejs" data-lilacs-no-concat="1"></script>
<script src="path/to/require-js-config" data-require-js-config-tag="1" data-lilacs-no-concat="1"></script>
<script>
    require(["module/name"]); // module/name: current module name
</script>
```


## use [in-css](https://github.com/senntyou/in-css) (`useInCss = true`)

1. here should have a `css` file which name is the same as html.
3. `css` in `html` should load as follows: 

```
<script src="path/to/in-css" data-in-css-tag="1" data-lilacs-no-concat="1"></script>
<script src="path/to/in-css-config" data-in-css-tag="1" data-in-css-config-tag="1" data-lilacs-no-concat="1"></script>
<script data-in-css-tag="1" data-in-css-load-tag="1">
    InCss.use("moduleName", "moduleName2", "moduleName3");
</script>
```

3. you can split a large css file into many small css files, and use `@import` to import those files in to the main css file.

example: 

current module: `test/index`

main css file: `test/index.css`

```
@import "index/piece1.css"; /* test/index/piece1.css */
@import "index/piece2.css"; /* test/index/piece2.css */
@import "index/piece3.css"; /* test/index/piece3.css */
```