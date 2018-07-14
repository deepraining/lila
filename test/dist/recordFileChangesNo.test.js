const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const demoDir = path.join(__dirname, 'demo');
const runtimeDir = path.join(__dirname, 'runtime/recordFileChangesNo');
const distDir = path.join(runtimeDir, 'project/dist');

describe('dist recordFileChangesNo', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    fse.copySync(demoDir, runtimeDir);
  });
  afterAll(() => {
    if (fs.existsSync(runtimeDir)) {
      fse.removeSync(runtimeDir);
    }
  });

  test('dist: recordFileChanges[false]', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')], {
      env: Object.assign({}, process.env, {
        local: 'recordFileChanges',
        runtimeDir: 'runtime/recordFileChangesNo',
      }),
    });

    let stdoutMessage;

    child.stdout.on('data', data => {
      stdoutMessage = data.toString();
    });

    child.on('close', code => {
      expect(code).toBe(0);
      // Has stdout
      expect(stdoutMessage).not.toBeUndefined();
      // Has stdout
      expect(stdoutMessage).toContain('Pack source codes and static files into production successfully.');
      // 4 files
      expect(filesCount(distDir)).toBe(4);

      const secondChild = spawn('node', [path.join(__dirname, 'dist.js')], {
        env: Object.assign({}, process.env, {
          local: 'recordFileChanges',
          runtimeDir: 'runtime/recordFileChangesNo',
        }),
      });

      let secondStdoutMessage;

      secondChild.stdout.on('data', data => {
        secondStdoutMessage = data.toString();
      });

      secondChild.on('close', code => {
        expect(code).toBe(0);
        // Has stdout
        expect(secondStdoutMessage).not.toBeUndefined();
        // Has stdout
        expect(secondStdoutMessage).toContain('Pack source codes and static files into production successfully.');
        // 4 files
        expect(filesCount(distDir)).toBe(4);

        done();
      });
    });
  });
});
