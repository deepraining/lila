
"use strict";

module.exports = {
    buildOptions: [
        // 0
        {
            revisionHashLength: 12
        },
        // 1
        {
            requireJsToTagLoad: !0,
            inCssToTagLoad: !0,
            minJs: !0,
            minCss: !0,
            minHtml: !0,
            concatJs: !0,
            concatCss: !0
        },
        // 2
        {
            cssAbsolutePath: !1,
            htmlAbsoluteAndCdnPath: !1,
            recordFileChanges: !1,
            revisionFiles: !1,
            skipNotExistingFiles: !0
        },
        // 3
        {
            htmlReplace: {
                DOCTYPE: 'doctype'
            },
            htmlInsert: {
                start: '<!-- start -->',
                end: '<!-- end -->'
            },
            htmlToSpecifiedExt: 'jsp'
        },
        // 4: files map
        {}
    ],
    directoriesToSync: {
        images: 'images',
        fonts: 'fonts'
    },
    directoriesToBuild: [
        'images', 'fonts'
    ],
    moduleGroup: {
        test: [
            'test/index',
            'test/index-2'
        ]
    },
    filesMap: [
        void 0,
        void 0,
        void 0,
        void 0,
        {
            "test/index.html": "test/index_prod.html",
            "test/index.js": "test/index_prod.js",
            "test/index.css": "test/index_prod.css"
        }
    ],
    dirsMap: [
        void 0,
        void 0,
        void 0,
        void 0,
        {
            "js/parent/test": "js/parent/test_prod",
            "css/parent/test": "css/parent/test_prod"
        }
    ],
    skipNotExistingFiles: !0,
    autoPrefixOption: {
        browsers: [
            "last 2 version",
            "ie 9"
        ]
    }
};

