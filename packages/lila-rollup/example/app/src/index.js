console.log('test');
// console.log(hello.hi); // eslint-disable-line

fetch('/src/mock/?key1=value1&key2=value2').then(res => {
  console.log("get['/src/mock']", res);
});
fetch('/src/mock.json', { method: 'post' }).then(res => {
  console.log("post['/src/mock.json']", res);
});
