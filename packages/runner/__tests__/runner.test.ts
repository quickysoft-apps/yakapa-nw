import path from 'path';
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
    const result = runner.run();
    expect(result).toBe(expected);
  });

  it('should throw error when running a script without installation', async () => {
    const runner = new Runner({ source: `export = () => return 'WTF'` });
    expect(() => runner.run()).toThrow('Scripts must be installed first');
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
    const result = runner.run();
    expect(result).toBe(expected);
  });

  it('return result conditioned by input args', async () => {
    const expected = 5;
    const source = `export = (args: {a: number, b: number}) => args.a + args.b;`;
    const runner = new Runner({ source });
    await runner.install(path.resolve(scriptsDir, 'args'));
    const result = runner.run({ a: 3, b: 2 });
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
      export = () => {
        const myClass = new MyClass();
        return myClass.fakeEmail();
      }
      `;

    const runner = new Runner({ source });
    await runner.install(path.resolve(scriptsDir, 'imports'));
    const result = runner.run();
    expect(typeof result).toBe('string');
  });
});
