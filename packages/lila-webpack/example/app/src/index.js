import $ from 'jquery';

console.log('test');
console.log(hello.hi); // eslint-disable-line

$.get('/src/mock/?key1=value1&key2=value2', {}, res => {
  console.log("get['/src/mock']", res);
});
$.post(
  '/src/mock.json',
  {},
  res => {
    console.log("post['/src/mock.json']", res);
  },
  'json'
);
