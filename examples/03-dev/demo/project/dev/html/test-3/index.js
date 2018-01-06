
module.exports = {
    config: {
        packCssSeparately: !0,
        splitJs: !0,
        splitJsMap: {
            vendor: ['jquery', 'underscore'],
            vendor2: ['react', 'react-dom'],
            common: ['alias/base', 'alias/common']
        }
    }
};
