const path = require('path');
const { spawn } = require('child_process');

const script = path.join(__dirname, 'index.js');

describe('new command', () => {
  test('create demo project', done => {
    const child = spawn('node', [script]);

    child.stderr.on('data', data => {
      expect(data).toBeNull();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      done();
    });
  });
});
