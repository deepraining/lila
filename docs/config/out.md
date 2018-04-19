# Project config - outResolveAlias

the same as `resolveAlias`, but mainly for below occasions:

* your project is built by `components` with `npm`, so your directory structure may be like follows:

```
| - / (project root)
    | - project1 (a standalone git project)
    | - project2 (a standalone git project)
    ...

| - / (component root)
    | - component1 (a standalone git project)
    | - component2 (a standalone git project)
    ...

```

* `project1` relies on `component1`, and `component1` relies on `project1` too, and code is like follows:

```
# package.json of project1
"dependencies": {
    "@company/component1": "^0.0.1"
}

# code of project1
const component1 = require("@company/component1");
```

* you are modifying `component1` to see whether it works well, so you want use `[component root]/component1/[package.json main]`
instead of `[project1 root]/node_modules/component1/[package.json main]` temporarily.

***

follows is how to do it:

1. put component root directory to `resolveModules`
2. fill `outResolveAlias` like this:

```
{
    "@company/component1": "component1/dist/component1.js", // real path depends on you
    "@company/component1/dist/component1.css": "component1/dist/component1.css" // if has
}
```

3. run command with argument `o/out`: `-o`, `--out`