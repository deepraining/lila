const path = require('path');
const { spawn } = require('child_process');

describe('prettier command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  test('prettier without name', done => {
    const child = spawn('node', [path.join(__dirname, 'prettier-no-name.js')]);

    let stderrCount = 0;
    let stderrMessage;

    child.stderr.on('data', data => {
      stderrCount += 1;
      stderrMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(1);
      // Has one stderr
      expect(stderrCount).toBe(1);
      // Has stderr
      expect(stderrMessage).not.toBeUndefined();
      // Has stderr
      expect(stderrMessage).toContain('Missing module name for command: prettier.');
      done();
    });
  });

  test('prettier module by name [test]', done => {
    const child = spawn('node', [path.join(__dirname, 'prettier.js')]);

    // last message
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.stderr.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', () => {
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('Done for formatting code');
      done();
    });
  });

  test('prettier module by name [test-2/*]', done => {
    const child = spawn('node', [path.join(__dirname, 'prettier-2.js')]);

    // last message
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.stderr.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', () => {
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('Done for formatting code');
      done();
    });
  });

  test('prettier module by name [*]', done => {
    const child = spawn('node', [path.join(__dirname, 'prettier-3.js')]);

    // last message
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.stderr.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', () => {
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('Done for formatting code');
      done();
    });
  });
});
