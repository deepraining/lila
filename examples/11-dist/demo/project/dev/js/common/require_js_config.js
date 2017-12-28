require.config({
	/**
	 * when run script with -cus(custom basePaths), use '/project/dev/js' as baseUrl
	 * or use '/dev/js' as baseUrl
	 */
    baseUrl: '/dev/js',
    //baseUrl: '/project/dev/js',
	paths: {
		libIndex: 'lib/index'
	},
	shim: {
        'common/index': {deps: ['libIndex']},
        'require_js/index': {deps: ['libIndex', 'common/index']}
	}
});
