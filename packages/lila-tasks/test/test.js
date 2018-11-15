const fs = require('fs');
const fse = require('fs-extra');
const { spawn } = require('child_process');

const { existsSync, readFileSync } = fs;
const { removeSync } = fse;

const filesCount = require('../../../test/files-count');

const appPath = `${__dirname}/app`;

describe('run through child_process', () => {
  // 60s timeout
  jest.setTimeout(60000);

  test('run entry[file]', done => {
    const child = spawn('node', [`${__dirname}/file.js`]);

    child.on('close', code => {
      expect(code).toBe(0);
      expect(filesCount(`${appPath}/target`)).toBe(2);
      expect(filesCount(`${appPath}/target`, '.php')).toBe(1);
      expect(filesCount(`${appPath}/target`, '.html')).toBe(1);
      expect(existsSync(`${appPath}/target/index.php`)).toBeTruthy();
      expect(readFileSync(`${appPath}/target/index.php`, 'utf8')).toBe(
        '<p>start</p><p>pre</p><h1>hello</h1><p>post</p><p>end</p>'
      );
      done();
    });
  });

  test('run entry[dir]', done => {
    const child = spawn('node', [`${__dirname}/dir.js`]);

    child.on('close', code => {
      expect(code).toBe(0);
      expect(existsSync(`${appPath}/dev/.keep`)).toBeTruthy();
      expect(existsSync(`${appPath}/build/.keep`)).toBeTruthy();
      expect(existsSync(`${appPath}/.lila/.keep`)).toBeTruthy();
      expect(existsSync(`${appPath}/bbuild/.keep`)).toBeTruthy();
      done();
    });
  });

  test('run entry[shell]', done => {
    const child = spawn('node', [`${__dirname}/shell.js`]);

    child.on('close', code => {
      expect(code).toBe(0);
      expect(existsSync(`${appPath}/shell/.keep`)).toBeTruthy();
      done();
    });
  });

  test('run entry[cache]', done => {
    removeSync(`${appPath}/build`);

    const child = spawn('node', [`${__dirname}/cache.js`]);

    child.on('close', code => {
      expect(code).toBe(0);
      expect(filesCount(`${appPath}/build`)).toBe(7);
      done();
    });
  });

  test('run entry[cache]', done => {
    const child = spawn('node', [`${__dirname}/cache.js`]);

    child.on('close', code => {
      expect(code).toBe(0);
      expect(existsSync(`${appPath}/.lila/cache.json`)).toBeTruthy();
      expect(filesCount(`${appPath}/build`)).toBe(0);
      done();
    });
  });

  test('run entry[del]', done => {
    const child = spawn('node', [`${__dirname}/del.js`]);

    child.on('close', code => {
      expect(code).toBe(0);
      expect(existsSync(`${appPath}/dev`)).toBeFalsy();
      expect(existsSync(`${appPath}/build`)).toBeFalsy();
      expect(existsSync(`${appPath}/tmp`)).toBeFalsy();
      expect(existsSync(`${appPath}/target`)).toBeFalsy();
      expect(existsSync(`${appPath}/shell`)).toBeFalsy();
      expect(existsSync(`${appPath}/ddev`)).toBeFalsy();
      expect(existsSync(`${appPath}/bbuild`)).toBeFalsy();
      done();
    });
  });
});
