
"use strict";

module.exports = {
    resolveAlias: {
        base: 'alias/base',
        common: 'alias/common'
    },
    htmlAbsoluteAndCdnPath: !1,
    buildOptions: [
        // 0
        {
            minJs: !0,
            minCss: !0,
            minHtml: !0,
            revisionHashLength: 12
        },
        // 1
        {
            cssAbsolutePath: !1,
            htmlAbsoluteAndCdnPath: !0,
            recordFileChanges: !1,
            revisionFiles: !1,
            skipNotExistingFiles: !0
        },
        // 2
        {
            htmlReplace: {
                DOCTYPE: 'doctype'
            },
            htmlInsert: {
                start: '<!-- start -->',
                end: '<!-- end -->'
            },
            htmlToSpecifiedExt: 'jsp'
        }
    ],
    directoriesToSync: {
        images: 'images',
        fonts: 'fonts'
    },
    moduleGroup: {
        test: [
            'test/index',
            'test/index-2'
        ]
    },
    skipNotExistingFiles: !0,
    autoPrefixOption: {
        browsers: [
            "last 2 version",
            "ie 9"
        ]
    }
};

