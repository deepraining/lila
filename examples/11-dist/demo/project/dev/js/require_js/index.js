
// start here

define(['parent/test/index', '../parent/test_prod/index', './inner/index'], function () {
    var log = function (str) {
        console.log(str);
    };

    log('test/index');
})();