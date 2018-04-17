
module.exports = (config, isBuild) => {

    var options = {
        limit: 8192
    };

    if (isBuild) {
        options.publicPath = config.cssAbsolutePathPrefix + config.basePaths.webPrefix + '/dist/'
    }

    return {
        loader: 'url-loader',
        options: options,
        test: new RegExp(`\.(${config.fileLoaderSuffixes.join('|')})$`)
    }
};
