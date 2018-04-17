
"use strict";

module.exports = {
    resolveAlias: {
        base: 'alias/base',
        common: 'alias/common'
    },
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
    },
    cssAbsolutePathPrefix: '/lila',
    htmlAbsolutePathPrefix: 'http://www.example.com',
    // minJs: !0,
    // minCss: !0,
    // minHtml: !0,
    // backupHtml: !0,
    // htmlReplace: {
    //     DOCTYPE: 'doctype'
    // },
    // htmlInsert: {
    //     start: '<!-- start -->',
    //     end: '<!-- end -->'
    // },
    // htmlExtension: 'jsp',
    envOptions: [
        // 0
        {},
        // 1
        {
            recordFileChanges: !1,
            renameHtml: {
                'test/index': 'parent/inner/index',
                'test-2/index': 'parent/inner/index-2',
                'test-3/index': 'parent/inner/index-3',
                'test-5/index': 'parent/inner/index-5'
            }
        }
    ],
    devServerPort: 8091,
    analyzerPort: 8191
};

