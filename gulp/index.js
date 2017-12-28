
"use strict";

var fs = require('fs');
var path = require('path');


module.exports = (gulp) => {

    // tasks in pre_tasks directory
    var preTasksDir = __dirname + '/pre_tasks';
    fs.readdirSync(preTasksDir).filter((file) => {
        var registerTask = require(path.join(preTasksDir, file));

        // register pre task
        registerTask(gulp);
    });

    // tasks in tasks directory
    var tasksDir = __dirname + '/tasks';
    fs.readdirSync(tasksDir).filter((file) => {
        var registerTask = require(path.join(tasksDir, file));

        // register task
        registerTask(gulp);
    });
};
