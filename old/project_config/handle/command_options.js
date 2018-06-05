
const _ = require('lodash');

const vars = require('../../data/vars');

module.exports = config => {

    let commandOption = config.commandOptions && vars.command && config.commandOptions[vars.command];
    /**
     * options of a command.
     */
    if (commandOption) {
        _.forEach(commandOption, (value, key) => {
            config[key] = value;
        });
    }
};
