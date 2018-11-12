# lila-bin

Lila command line.

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
    "run": "lila run"
  }
}
```

## options

- `-V, --version`: output the version number
- `--core`: custom `lila-core` path
- `-h, --help`: output usage information
