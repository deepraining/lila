// eslint-disable-next-line import/no-unresolved
import print from '../.tmp/print';

print();

console.log('test');
// console.log(hello.hi); // eslint-disable-line

fetch('/src/mock.json').then(res => {
  console.log("get['/src/mock.json']", res);
});
fetch('/src/mock.json', { method: 'post' }).then(res => {
  console.log("post['/src/mock.json']", res);
});
fetch('/api').then(res => {
  console.log("get['/api']", res);
});
fetch('/api/index', { method: 'post' }).then(res => {
  console.log("post['/api/index']", res);
});
fetch('/str/?key1=value1&key2=value2').then(res => {
  console.log("get['/str']", res);
});
fetch('/obj').then(res => {
  console.log("get['/obj']", res);
});
fetch('/func').then(res => {
  console.log("get['/func']", res);
});
fetch('/func').then(res => {
  console.log("get['/func']", res);
});
fetch('/info/123').then(res => {
  console.log("get['/info/123']", res);
});
fetch('/article/123/detail/456').then(res => {
  console.log("get['/article/123/detail/456']", res);
});
fetch('/article/123/detail/456', { method: 'put' }).then(res => {
  console.log("put['/article/123/detail/456']", res);
});
