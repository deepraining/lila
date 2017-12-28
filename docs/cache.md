# All resources can disable cache

default only html/js/css can disable cache through revision.
if you want all resources can disable cache, just put other resources(images, fonts, media, ...) into `dev` directory,
and also you should mark the directories added in `lilacs.config.js`.

```
directoriesToBuild: [
    "images", // images directory
    "fonts" // fonts directory
]
```

### note

* in html/css, you should use relative path to reference it.
