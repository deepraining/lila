
module.exports = {
    resolveAlias: {
        base: 'alias/base',
        common: 'alias/common'
    },
    resolveModules: [
        '../modules',
        '../../../../modules-2'
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
    },
    // staticServerUrl: '/sub',
    // staticServerUrl: 'http://www.example.com',
    // staticServerUrl: 'https://www.example.com/sub',
    // staticServerUrl: '//www.example.com/sub/subSub',
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
    bundleAnalyzer: {
        analyzerPort: 8191
    },
    localOptions: {
        senn: {
            staticServerUrl: 'https//github.com/senntyou/lila',
            outResolveAlias: {
                'bootstrap/dist/css/bootstrap.css': 'out_bootstrap/index.css',
                bootstrap: 'out_bootstrap/index.js'

            }
        }
    },
    import: [{ "libraryName": "antd", style: "css" }],
    enableCssModules: !0,
    cssModulesExclude: [/node_modules/, /src\/less/],
    define: {
        globalDefine: JSON.stringify('hello')
    },
    commandOptions: {
        dev: {
            define: {
                globalDefine: JSON.stringify('dev')
            }
        },
        dist: {
            define: {
                globalDefine: JSON.stringify('dist')
            }
        },
        sync: {
            define: {
                globalDefine: JSON.stringify('sync')
            }
        }
    },
    webpack: {

    }
};

