# lila

A web frontend building tool for teamwork, with many amazing functionalities:

* automatic compiling: less -> css, es6 -> es5, commonjs -> amd. 
* automatic html/js/css merging and minifying.
* watch files' changes, and auto reload browser page.
* multi environment, multi servers, web/static separated servers.
* files/directories mapping in different environments.
* automaticly upload built files to servers.
* hash code revision to disabled client cache.
* absolute css/html inline resource reference.
* ...

## Quick start

Install lila: 

```
npm install lila -g
```

or in China, you can use [cnpm](https://github.com/cnpm/cnpm):

```
cnpm install lila -g
```

New project

```
lila new lila-demo
```

## Documents

1. [directory specification](./docs/dir.md)
2. [writing code](./docs/code.md)
3. [command line](./docs/cmd.md)
4. [server side command line](./docs/cmd-server.md)
5. [project config](./docs/config.md)
6. [files&directories mapping](./docs/mapping.md)
7. [group of modules](./docs/group.md)
8. [custom config for every module](./docs/custom.md)
9. [multi js entry modules](./docs/multi.md)
10. [all resources can disable cache](./docs/cache.md)
11. [use express to mock data](./docs/express.md)
12. [with forever](./docs/forever.md)
13. [use webpack to build](./docs/webpack.md)
14. [use react](./docs/react.md)
