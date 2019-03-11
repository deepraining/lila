// eslint-disable-next-line import/no-unresolved
import print from '../.tmp/print';

print();

console.log('test');
// console.log(hello.hi); // eslint-disable-line

fetch('/src/mock.json', { method: 'post' }).then(res => {
  console.log("post['/src/mock.json']", res);
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
