import path from 'path';
import fs from 'fs';
import rimraf from 'rimraf';
import { Runner } from '../src/runner';

describe('runner', () => {
  const scriptsDir = path.resolve(__dirname, 'data/scripts');
  beforeAll(() => {
    rimraf.sync(path.resolve(__dirname, 'data/scripts'));
  });

  it('return result from the simpliest script', async () => {
    const expected = 'Hello World';
    const runner = new Runner({ source: `export = () => '${expected}'` });
    await runner.install(path.resolve(scriptsDir, 'hello-world'));
    const result = runner.runSync();
    expect(result).toBe(expected);
  });

  it('should throw error when running a script without installation', async () => {
    const runner = new Runner({ source: `export = () => return 'WTF'` });
    expect(() => runner.runSync()).toThrow('Scripts must be installed first');
  });

  it('return result from a script with es6 class', async () => {
    const expected = 'Hello World';

    const source = `
      class MyClass {
        public helloWorld() {
          return '${expected}';
        }
      }
      export = () => {
        const myClass = new MyClass();
        return myClass.helloWorld();
      }
      `;

    const runner = new Runner({ source });
    await runner.install(path.resolve(scriptsDir, 'es6'));
    const result = runner.runSync();
    expect(result).toBe(expected);
  });

  it('return result conditioned by input args', async () => {
    const expected = 5;
    const source = `export = (args: {a: number, b: number}) => args.a + args.b;`;
    const runner = new Runner({ source });
    await runner.install(path.resolve(scriptsDir, 'args'));
    const result = runner.runSync({ a: 3, b: 2 });
    expect(result).toBe(expected);
  });

  it('return result from a script with third party lib import', async () => {
    const source = `      
      import faker from 'faker';
      class MyClass {
        public fakeEmail() {
          return faker.internet.email();
        }
      }
      export = (args: any) => {
        const myClass = new MyClass();
        return myClass.fakeEmail();
      }
      `;

    const runner = new Runner({ source });
    await runner.install(path.resolve(scriptsDir, 'imports'));
    const result = runner.runSync();
    expect(typeof result).toBe('string');
  });

  it('handles async pattern', async () => {
    const rootDir = path.resolve(scriptsDir, 'async');
    const logsDir = path.resolve(rootDir, 'logs');
    const source = `
      import fs from 'fs';

      type WatcherEventHandler = (eventType: string, filename: string) => void;

      export = (args: {filepath: string}, callback: WatcherEventHandler) => {
        return fs.watch(args.filepath, (eventType, filename) => {
          if (filename) {
            callback(eventType, filename);
          }
        });
      }
    `;
    const runner = new Runner({ source, filename: 'async.ts' });
    await runner.install(rootDir);
    fs.mkdirSync(logsDir);
    const filename = path.resolve(logsDir, 'log.txt');
    let fd = fs.openSync(filename, 'a');
    fs.appendFileSync(filename, 'Line1');
    fs.closeSync(fd);

    const promise = () =>
      new Promise(resolve => {
        runner.run({ filepath: path.resolve(rootDir, logsDir, 'log.txt') }, (...args) => {
          //Send back script results stored in args from here (ex: eventType and filename)
          resolve(args);
        });
        setTimeout(() => {
          fd = fs.openSync(filename, 'a');
          fs.appendFileSync(fd, '\r\nLine2');
          fs.closeSync(fd);
        }, 1000);
      });

    const result = await promise();
    expect(result).toMatchObject(['change', 'log.txt']);
  });
});
