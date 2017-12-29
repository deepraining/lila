
"use strict";

// command name
var cmdName = process.argv[2];
// module name
var moduleName = process.argv[3];

// commands needs module argument
var needsModule = {dev: !0, dist: !0, sync: !0, 'dist-js': !0, 'sync-js': !0};

// convert moduleName to argument
if (needsModule[cmdName] && moduleName && moduleName.slice(0, 1) != '-') {

    // remove origin moduleName
    process.argv.splice(3, 1);

    // add module argument
    process.argv.push('--' + 'module');
    process.argv.push(moduleName);
}

