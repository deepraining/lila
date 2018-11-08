const { spawn } = require('child_process');

describe('run through child_process', () => {
  // 60s timeout
  jest.setTimeout(60000);

  test('-h', done => {
    const child = spawn('node', [`${__dirname}/help.js`]);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('--core');
      expect(msg).toContain('--root');
      expect(msg).toContain('--version');
      expect(msg).toContain('--help');
      expect(msg).toContain('run tasks');
      expect(msg).toContain('demo cmd');
      done();
    });
  });

  test('run -h', done => {
    const child = spawn('node', [`${__dirname}/run-help.js`]);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('<entry> [extraEntries...]');
      expect(msg).toContain('run tasks');
      expect(msg).toContain('--aa');
      expect(msg).toContain('--bb');
      expect(msg).toContain('--help');
      done();
    });
  });

  test('run test test2', done => {
    const child = spawn('node', [`${__dirname}/run.js`]);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      expect(msg).toContain('cmd:run ...');
      expect(msg).toContain('test:log ...');
      expect(msg).toContain('test:log:2 ...');
      expect(msg).toContain('test2:log ...');
      expect(msg).toContain('test2:log:2 ...');

      expect(msg).toContain('configOptions.entry: string');
      expect(msg).toContain('configOptions.entry: "test"');
      expect(msg).toContain('configOptions.entry: "test2"');
      expect(msg).toContain('configOptions.argv: object');
      expect(msg).toContain('configOptions.cmd: string');
      expect(msg).toContain('configOptions.cmd: "run"');

      expect(msg).toContain('taskOptions.entry: string');
      expect(msg).toContain('taskOptions.entry: "test"');
      expect(msg).toContain('taskOptions.entry: "test2"');
      expect(msg).toContain('taskOptions.args: object');
      expect(msg).toContain('taskOptions.argv: object');
      expect(msg).toContain('taskOptions.cmd: string');
      expect(msg).toContain('taskOptions.cmd: "run"');
      expect(msg).toContain('taskOptions.config: object');
      expect(msg).toContain('taskOptions.lila: object');
      expect(msg).toContain('taskOptions.gulp: object');
      done();
    });
  });

  test('demo', done => {
    const child = spawn('node', [`${__dirname}/demo.js`]);

    let msg = '';

    child.stdout.on('data', data => {
      msg += data.toString();
    });

    child.stderr.on('data', data => {
      msg += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      expect(msg).toContain('ReferenceError');
      expect(msg).toContain('hello is not defined');
      done();
    });
  });
});
