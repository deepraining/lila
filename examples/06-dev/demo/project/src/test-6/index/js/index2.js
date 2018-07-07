
const $ = require('jquery');
// const _ = require('underscore');

module.exports = () => {
    const h1 = document.createElement('h1');
    h1.innerText = 'Hello China!';
    document.body.appendChild(h1);

    document.body.style.backgroundColor = '#ff00ff';

    const map = {
        key1: 'key1',
        key2: 'key2',
    };
    const {key1, key2} = map;
    console.log(key1);
    console.log(key2);

    const arr = ['arr1', 'arr2'];
    const [arr1, arr2] = arr;
    console.log(arr1);
    console.log(arr2);

    console.log('test/index2');

    arr.forEach((item) => {
        console.log(item);
    });

    $('body').css({'background-color': '#0000ff'});
};
