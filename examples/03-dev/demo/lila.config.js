
"use strict";

module.exports = {
    resolveAlias: {
        base: 'alias/base',
        common: 'alias/common'
    },
    htmlAbsoluteAndCdnPath: !1,
    skipNotExistingFiles: !0,
    buildOptions: [
        // 0
        {},
        // 1
        {
            minJs: !0,
            minCss: !0,
            minHtml: !0,
            revisionHashLength: 12
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
        }
    ],
    directoriesToSync: {
        images: 'images',
        fonts: 'fonts'
    },
    moduleGroup: {
        test: [
            'test-3/index',
            'test-4/index'
        ]
    },
    autoPrefixOption: {
        browsers: [
            "last 2 version",
            "ie 9"
        ]
    },
    provide: {
        jQuery: 'jquery'
    }
};

