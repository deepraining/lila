const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const script = path.join(__dirname, 'demo.js');
const demoDir = path.join(__dirname, 'demo');

describe('new command', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    if (fs.existsSync(demoDir)) {
      fse.removeSync(demoDir);
    }
  });

  afterAll(() => {
    if (fs.existsSync(demoDir)) {
      fse.removeSync(demoDir);
    }
  });

  test('create project without name', done => {
    const child = spawn('node', [path.join(__dirname, 'no-name.js')]);

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
      expect(stderrMessage).toContain('Missing project name for command: new.');
      done();
    });
  });

  test('create project by name [demo]', done => {
    const child = spawn('node', [script]);

    let stdoutCount = 0;
    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutCount += 1;
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has one stdout
      expect(stdoutCount).toBe(1);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('successfully!');
      // Has demo string in package.json
      expect(fse.readFileSync(path.join(demoDir, 'package.json'), 'utf8')).toContain('demo');
      // Has demo string in README.md
      expect(fse.readFileSync(path.join(demoDir, 'README.md'), 'utf8')).toContain('demo');
      // 14 files, include .gitkeep
      expect(filesCount(demoDir)).toBe(14);
      done();
    });
  });

  test('create project by name [demo] second times', done => {
    const child = spawn('node', [script]);

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
      expect(stderrMessage).toContain('has already been created.');
      done();
    });
  });
});
