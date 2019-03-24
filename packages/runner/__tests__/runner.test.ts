import { run } from '../src/runner';

describe('typescript', () => {
  it('returns result from the simpliest script', () => {
    const result = run(`return 'Hello World'`);
    expect(result).toBe('Hello World');
  });
});
