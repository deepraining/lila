
"use strict";

module.exports = {
    resolveAlias: {
        base: 'alias/base',
        common: 'alias/common'
    },
    envOptions: [
        // 0
        {},
        // 1
        {
            minJs: !0,
            minCss: !0,
            minHtml: !0
        },
        // 2
        {
            recordFileChanges: !1
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
            htmlExtension: 'jsp'
        },
        // 4
        {
            renameHtml: {
                'test/index': 'parent/inner/index',
                'test-2/index': 'parent/inner/index-2',
                'test-3/index': 'parent/inner/index-3',
                'test-5/index': 'parent/inner/index-5'
            }
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
    provide: {
        jQuery: 'jquery'
    }
};

