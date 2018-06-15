# Builtin rules(loaders) 

Lila has some builtin rules(loaders), you can configure them, override them or disable them.

By default, lila will use builtin rules, however, you can disable them and use your owns by configure `builtinRules`.

```
builtinRules: {
    babelLoader: false, // import `false` to disable builtin `babelLoader`
    ...
}
```

1. babelLoader: [babel-loader](https://github.com/babel/babel-loader).
2. urlLoader: [url-loader](https://github.com/webpack-contrib/url-loader)
3. htmlLoader: [html-loader](https://github.com/webpack-contrib/html-loader)
4. cssLoader: [css-loader](https://github.com/webpack-contrib/css-loader)
5. lessLoader: [less-loader](https://github.com/webpack-contrib/less-loader)
6. extractCssLoader: To make all source css files pack into a single target css file.
7. extractLessLoader: To make all source less files pack into a single target css file.




