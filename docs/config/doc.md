# Project config - doc

### `desc`

config to generate js documents.

### `default`

empty

### `example`

```
{
    include: [
        // common directory
        "common",
        // test/index directory
        "test/index"
    ],
    exclude: [
        // similar to include
    ]
}
```

### `explanation`

* `include`: if provided, only directories defined in `include` will be used to generate doc.
* `exclude`: if provided, directories defined in `exclude` will not be used to generate doc.