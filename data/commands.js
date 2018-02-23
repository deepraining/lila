
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
        name: 'revert',
        desc: 'Revert current dist directory to last archive state.'
    }
];