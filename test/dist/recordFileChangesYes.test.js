const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');

const filesCount = require('../../util/files_count');

const demoDir = path.join(__dirname, 'demo');
const fixtureDir = path.join(__dirname, 'fixtures/recordFileChangesYes');
const manifestsDir = path.join(fixtureDir, '.lila/manifests');
const distDir = path.join(fixtureDir, 'project/dist');

describe('dist recordFileChangesYes', () => {
  // 60s timeout
  jest.setTimeout(60000);

  beforeAll(() => {
    fse.copySync(demoDir, fixtureDir);
  });
  afterAll(() => {
    if (fs.existsSync(fixtureDir)) {
      fse.removeSync(fixtureDir);
    }
  });

  test('dist: recordFileChanges[true]', done => {
    const child = spawn('node', [path.join(__dirname, 'dist.js')], {
      env: Object.assign({}, process.env, {
        fixtureDir: 'fixtures/recordFileChangesYes',
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
      // Check manifests directory.
      expect(fs.existsSync(manifestsDir)).toBeTruthy();

      const secondChild = spawn('node', [path.join(__dirname, 'dist.js')], {
        env: Object.assign({}, process.env, {
          fixtureDir: 'fixtures/recordFileChangesYes',
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

        // If not exist dist directory, normal.
        if (!fs.existsSync(distDir)) {
          done();
          return;
        }

        // Less than 4 files.
        expect(filesCount(distDir)).toBeLessThan(4);
        // Check manifests directory.
        expect(fs.existsSync(manifestsDir)).toBeTruthy();

        done();
      });
    });
  });
});
