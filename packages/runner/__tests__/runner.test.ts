import { run } from '../src/runner';

describe('typescript', () => {
  it('returns result from the simpliest script', () => {
    const expected = 'Hello World';
    const result = run(`return '${expected}'`);
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

    const result = run(code);
    expect(result).toBe(expected);
  });

  it('return result conditioned by input args', () => {
    const expected = 5;
    const code = `return a + b;`;
    const result = run(code, { a: 3, b: 2 });
    expect(result).toBe(expected);
  });

  it('return result from a script with imports', () => {
    const expected = 'Hello World';

    const code = `
      import path from 'path';
      
      class MyClass {
        public function helloWorld() {
          return '${expected}';
        }
      }
      const myClass = new MyClass()
      return myClass.helloWorld()`;

    const result = run(code);
    expect(result).toBe(expected);
  });
});
