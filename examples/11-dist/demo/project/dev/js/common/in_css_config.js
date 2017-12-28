InCss.config({
    /**
     * when run script with -cus(custom basePaths), use '/project/dev/css' as baseUrl
     * or use '/dev/css' as baseUrl
     */
    baseUrl : '/dev/css',
    //baseUrl : '/project/dev/css',
    paths: {
        libIndex: 'lib/index'
    },
    deps: {
        'common/index': 'libIndex',
        'in_css/index': ['libIndex', 'common/index']
    }
});