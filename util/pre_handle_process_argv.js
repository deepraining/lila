
"use strict";

// command name
var cmdName = process.argv[2];
// module name
var moduleName = process.argv[3];

// commands needs module argument
var needsModule = {dev: !0, dist: !0, sync: !0, server: !0};
// commands needs glob module argument
var needsGlobModule = {compile: !0, cp: !0, 'dist-js': !0, 'sync-js': !0, 'dist-css': !0, 'sync-css': !0};

// convert moduleName to argument
if ((needsModule[cmdName] || needsGlobModule[cmdName]) && moduleName && moduleName.slice(0, 1) != '-') {

    // remove origin moduleName
    process.argv.splice(3, 1);

    // add module/globModule argument
    process.argv.push('--' + (needsModule[cmdName] ? 'module' : 'globModule'));
    process.argv.push(moduleName);
}

