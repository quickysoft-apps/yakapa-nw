import { Compiler } from '../src/runner';

describe('typescript', () => {
  it('returns result from the simpliest script', () => {
    const expected = 'Hello World';
    const compiler = new Compiler(`return '${expected}'`);
    const result = compiler.evaluate();
    expect(result).toBe(expected);
  });

  it('return result from a script with es6 class', () => {
    const expected = 'Hello World';

    const code = `
      class MyClass {
        public function helloWorld() {
          return '${expected}';
        }
      }
      const myClass = new MyClass()
      return myClass.helloWorld()`;

    const compiler = new Compiler(code);
    const result = compiler.evaluate();
    expect(result).toBe(expected);
  });

  it('return result conditioned by input args', () => {
    const expected = 5;
    const code = `return a + b;`;
    const compiler = new Compiler(code);
    const result = compiler.evaluate({ a: 3, b: 2 });
    expect(result).toBe(expected);
  });

  it('return result from a script with third party lib import', () => {
    const code = `      
      //import faker from 'faker';
      const faker = require('faker');
      class MyClass {
        public function fakeEmail() {
          return faker.internet.email();
        }
      }
      const myClass = new MyClass();
      return myClass.fakeEmail()`;

    const compiler = new Compiler(code);
    const result = compiler.evaluate();
    expect(result).toMatchInlineSnapshot();
  });
});
