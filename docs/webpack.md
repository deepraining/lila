# Config webpack

## coding

* in developing, all js and css files will be built into a single js file, into `dev/js` directory, whose name is the same as the html.
   
```
<!-- if current module is test/index -->

<script src="../../js/test/index.js"></script>
```

* in production, if `packCssSeparately` is `true`, code should be written as follows:

```
<!-- if current module is test/index -->

<link rel="stylesheet" href="../../css/test/index.css">

<script src="../../js/test/index.js"></script>
```

* in production, if `packCssSeparately` is `true`, and `splitJs` is also `true`, code should be written as follows:

```
# config file
splitJsMap: {
    lib: ['jquery', 'react', 'react-dom'],
    common: ['common/file1', 'common/file2'],
    base: ['base/file1', 'base/file2']
}

# html file
<!-- if current module is test/index -->

<link rel="stylesheet" href="../../css/test/index.css">

<script src="../../js/test/index_lib.js"></script>
<script src="../../js/test/index_common.js"></script>
<script src="../../js/test/index_base.js"></script>
<script src="../../js/test/index.js"></script>
```

## building

normally, in developing and production, all js and css files will be packed into a single js file of the same name with html.

thus, using `packCssSeparately = true`, will pack all css files into a standalone css file of the same name with html;
using `splitJs = true`, will a single js file into many smaller js files, and use `splitJsMap` to indicate how to split it.

### splitJsMap

example(current module is `test/index`): 

```
{
    lib: ['jquery', 'react', 'react-dom'],
    common: ['common/file1', 'common/file2'],
    base: ['base/file1', 'base/file2']
}
```

* `key`: specify the file name suffix. ultimately, the above example will generate 3 js files:
    - `dev/js/test/index_lib.js`
    - `dev/js/test/index_common.js`
    - `dev/js/test/index_base.js`
    
* `value`: a array, js modules collection. indicates which js modules to pack.

## note

1. other resources like images, fonts, and more, should use absolute path to reference it.
2. `splitJsMap` should be defined in custom config.