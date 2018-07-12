
import styles from './css/index.css';
import styles2 from './css/index2.less';

require('bootstrap/dist/css/bootstrap.css');
// require('../../test/index/css/index.less');
// require('../../test/index/css/index.css');
// require('../../test/index/css/index2.css');
require('../../less/common.less');
require('bootstrap');

require('base')();
require('common')();

require('../../test/index/js/index2')();
require('../../test/index/js/index3.jsx');

console.log('test-5/index');
// require('./js/b')();
require('out')();

console.log(`globalDefine: ${globalDefine}`);

const $ = require('jquery');

const $body = $('body');
$body.append(`<div class="${styles.dynamicImportCss}">dynamicImportCss</div>`);
$body.append(`<div class="${styles2.dynamicImportLess}">dynamicImportLess</div>`);

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
