
/**
 * make a manifest
 *
 * @param mark Manifest mark
 * @param env
 * @returns {string}
 */
module.exports = (mark, env) => {
    !mark && (mark = 'base');
    typeof env == 'undefined' && (env = 0);
    return 'manifest_' + mark + '_' + env + '.json';
};
