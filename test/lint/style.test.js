const path = require('path');
const { spawn } = require('child_process');

describe('stylelint command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  test('stylelint without name', done => {
    const child = spawn('node', [path.join(__dirname, 'style-no-name.js')]);

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
      expect(stderrMessage).toContain('Missing module name for command: stylelint.');
      done();
    });
  });

  test('stylelint module by name [test]', done => {
    const child = spawn('node', [path.join(__dirname, 'style.js')]);

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
      expect(stdoutMessage).toContain('No errors occurred');
      done();
    });
  });

  test('stylelint module by name [test-2/*]', done => {
    const child = spawn('node', [path.join(__dirname, 'style-2.js')]);

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
      expect(stdoutMessage).toContain('No errors occurred');
      done();
    });
  });

  test('stylelint module by name [*]', done => {
    const child = spawn('node', [path.join(__dirname, 'style-3.js')]);

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
      expect(stdoutMessage).toContain('No errors occurred');
      done();
    });
  });
});
