
module.exports = (config, isBuild) => {

    const options = {
        limit: 8192
    };

    if (isBuild) {
        options.publicPath = config.staticServerDir + config.basePaths.webPrefix + '/dist/'
    }

    return {
        loader: 'url-loader',
        options: options,
        test: new RegExp(`\.(${config.fileLoaderSuffixes.join('|')})$`)
    }
};
