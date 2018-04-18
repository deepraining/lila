
require('base')();
require('common')();

console.log('test-4/index');
// require('./js/b')();

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