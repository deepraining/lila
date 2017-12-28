# use [express](https://github.com/expressjs/express) to mock data

1. all js files should place in `config.basePaths.buildRoot/data` directory.
2. in file, `module.exports` should be a function with two arguments, `req, res`, more reference to [express](https://github.com/expressjs/express).
3. url of each file js just its path relative to `config.basePaths.webRoot`.

### example

```
// path: /project/data/test/index/demo.js
// url: /data/test/index/demo

module.exports = (req, res) => {
    return res.json({success: !0, message: 'hello lilacs'});
};
```

