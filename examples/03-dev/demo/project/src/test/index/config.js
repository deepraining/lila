/**
 * @author senntyou <jiangjinbelief@163.com>
 */

module.exports = {
    ignoreNodeModules: !1,
    packCssSeparately: !0,
    splitJs: {
        vendor: ['jquery', 'underscore'],
        vendor2: ['react', 'react-dom'],
        common: ['alias/base', 'alias/common']
    }
};
