
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');

require('base')();
require('common')();

// require('../../test/index/js/index2')();
// require('../../test/index/js/index3.jsx');

console.log('test-5/index');
// require('./js/b')();
require('out')();

document.body.addEventListener('click', e => {

    require.ensure([], require => {
        require('./js/a')();
    });
    require.ensure([], require => {
        require('./js/b')();
    });
    require.ensure([], require => {
        require('./js/c')();
    });

}, !1);
