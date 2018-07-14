const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const script1 = path.join(__dirname, 'archive.js');
const script2 = path.join(__dirname, 'arc.js');
const demoDir = path.join(__dirname, 'demo');

describe('archive command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  afterAll(() => {
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  test('archive a non-existed directory', done => {
    const child = spawn('node', [path.join(__dirname, 'not-exist.js')]);

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
      expect(stderrMessage).toContain("Missing 'dist' directory for command: archive.");
      done();
    });
  });

  test('archive', done => {
    const child = spawn('node', [script1]);

    // Last message
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain("Pack 'dist' directory successfully!");
      done();
    });
  });

  test('arc', done => {
    const child = spawn('node', [script2]);

    // Last message
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain("Pack 'dist' directory successfully!");

      let zipFilesCount = 0;
      fs.readdirSync(demoDir).filter(file => {
        if (file.slice(-4) === '.zip') {
          zipFilesCount += 1;
        }
      });

      expect(zipFilesCount).toBe(2);

      done();
    });
  });
});
