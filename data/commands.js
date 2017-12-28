
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
        desc: 'Watch files\' changes for compiling, and start server to load current module.'
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
        name: 'server',
        desc: 'Start local server for debug.'
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
    },
    {
        name: 'dist-js',
        desc: 'Make javascript files as main module, and do production task.'
    },
    {
        name: 'sync-js',
        desc: 'Make javascript files as main module, and do production task, then sync files to remote.'
    },
    {
        name: 'dist-css',
        desc: 'Make css files as main module, and do production task.'
    },
    {
        name: 'sync-css',
        desc: 'Make css files as main module, and do production task, then sync files to remote.'
    }
];