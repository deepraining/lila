# lila-bin

[中文文档](./README.md)

Lila command line tool.

## install

global

```
npm install lila-bin -g
```

local

```
npm install lila-bin --save-dev
```

## use

global

```
lila <cmd> [options]
```

local

```
# package.json
{
  "scripts": {
    "run": "lila <cmd> [options]"
  }
}
```

## options

- `-V, --version`: output the version number
- `-h, --help`: output usage information
- `--core`: custom `lila-core` path
