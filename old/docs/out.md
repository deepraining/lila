# Project config - outResolveAlias

The same as `resolveAlias`, but mainly for below occasions:

##### Your project is built by `components` with `npm`, so your directory structure may be as follows:

```
|-- / (project root)
    |-- project1 (a standalone git project)
    |-- project2 (a standalone git project)
    ...

|-- / (component root)
    |-- component1 (a standalone git project)
    |-- component2 (a standalone git project)
    ...
```

##### `project1` relies on `component1`, and `component1` relies on `project1` too, and code is as follows:

```
# `package.json` of project1.
"dependencies": {
    "@company/component1": "^0.0.1"
}

# Code of using project1.
const component1 = require("@company/component1");
```

##### You are modifying `component1` to see whether it works well, so you want to use `[component root]/component1/[package.json main]` instead of `[project1 root]/node_modules/component1/[package.json main]` temporarily.

## Following is how to do it:

### 1. Put component root directory to `resolveModules`.

```
resolveModules: [
    'relative/path/to/component/root'
]
```

### 2. Fill `outResolveAlias` like this:

```
{
    "@company/component1/dist/component1.css": "component1/dist/component1.css", // if has
    "@company/component1": "component1/dist/component1.js" // real path depends on you
}
```

Here is a note:

The css module must be defined before js module, or css module will not work.

The reason is, if you define js module before css module, the css module file path will be `component1/dist/component1.js/dist/component1.css`.

### 3. Run command with argument `o/out`: `-o`, `--out`.

```
lila dev test/index -o

lila sync test/index --out
```
