
"use strict";

module.exports = [
    {
        name: 'new',
        desc: 'Create a new project.'
    },
    {
        name: 'add',
        desc: 'Add a new module for current project.'
    },
    {
        name: 'dev',
        desc: 'Watch files\' changes, with hot replacing and reloading, and start a local server for debug.'
    },
    {
        name: 'dist',
        desc: 'Do production tasks.'
    },
    {
        name: 'sync',
        desc: 'Do production tasks, then sync files to remote.'
    },
    {
        name: 'mock-express',
        desc: 'Start local express mock server for debug.'
    },
    {
        name: 'forever',
        desc: 'Run forever command in current directory.'
    },
    {
        name: 'archive',
        desc: 'Archive dist directory on server side.'
    },
    {
        name: 'arc',
        desc: 'Alias of command archive.'
    },
    {
        name: 'clean',
        desc: 'Clean redundant files caused by revision.'
    },
    {
        name: 'init-clean',
        desc: 'Init clean task by generate a config file \'lila.clean.config.js\' in current directory.'
    },
    {
        name: 'revert',
        desc: 'Revert current dist directory to last archive state.'
    },
    {
        name: 'doc',
        desc: 'Generate javascript documents.'
    }
];