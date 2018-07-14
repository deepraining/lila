const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const script = path.join(__dirname, 'index.js');
const demoDir = path.join(__dirname, 'demo');
const distDir = path.join(__dirname, 'demo/dist');
const bakDir = path.join(__dirname, 'demo/bak');

describe('clean command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  afterAll(() => {
    if (fs.existsSync(distDir)) {
      fse.removeSync(distDir);
    }
    fs.readdirSync(demoDir).filter(file => {
      if (file.slice(-4) === '.zip') {
        fse.removeSync(path.join(demoDir, file));
      }
    });
  });

  test('clean by no dist directory', done => {
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
      expect(stderrMessage).toContain("Missing 'dist' directory for command: clean.");
      done();
    });
  });

  test('clean', done => {
    const child = spawn('node', [script]);

    // Last message
    let stdoutMessage = '';

    child.stdout.on('data', data => {
      stdoutMessage += data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('abcdef123456789abcdef123456789bb.js');
      expect(stdoutMessage).toContain('inner/123456789abcdef123456789abcdef33.css');
      expect(stdoutMessage).toContain('229.e2025f09faac9dd460cbac6913cfbd78.js');
      expect(stdoutMessage).toContain('9.7b7c4210539c2c41354207f419ec0243.js');
      // Deleted 4 files
      expect(filesCount(distDir)).toBe(filesCount(bakDir) - 4);
      expect(fs.existsSync(path.join(distDir, 'abcdef123456789abcdef123456789bb.js'))).toBeFalsy();
      expect(fs.existsSync(path.join(distDir, 'inner/123456789abcdef123456789abcdef33.css'))).toBeFalsy();
      expect(fs.existsSync(path.join(distDir, '229.e2025f09faac9dd460cbac6913cfbd78.js'))).toBeFalsy();
      expect(fs.existsSync(path.join(distDir, 'abcdef123456789abcdef123456789bb.js'))).toBeFalsy();
      done();
    });
  });
});
