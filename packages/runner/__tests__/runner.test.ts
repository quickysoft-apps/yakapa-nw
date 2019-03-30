import { Compiler } from '../src/runner';

describe('typescript', () => {
  it('returns result from the simpliest script', () => {
    const expected = 'Hello World';
    const compiler = new Compiler('hello-world', `export = () => '${expected}'`);
    const result = compiler.run();
    expect(result).toBe(expected);
  });

  it('return result from a script with es6 class', async () => {
    const expected = 'Hello World';

    const code = `
      class MyClass {
        public function helloWorld() {
          return '${expected}';
        }
      }
      export = () => {
        const myClass = new MyClass();
        return myClass.helloWorld();
      }
      `;

    const compiler = new Compiler('es6', code);
    const result = await compiler.run();
    expect(result).toBe(expected);
  });

  it('return result conditioned by input args', () => {
    const expected = 5;
    const code = `export = (args: {a: number, b: number}) => args.a + args.b;`;
    const compiler = new Compiler('args', code);
    const result = compiler.run({ a: 3, b: 2 });
    expect(result).toBe(expected);
  });

  it('return result from a script with third party lib import', async () => {
    const source = `      
      import faker from 'faker';
      class MyClass {
        contructor() {

        }
        public fakeEmail() {
          return faker.internet.email();
        }
      }
      export = () => {
        const myClass = new MyClass();
        return myClass.fakeEmail();
      }
      `;

    const compiler = new Compiler('imports', source);
    const result = await compiler.run();
    expect(typeof result).toBe('string');
  });
});
