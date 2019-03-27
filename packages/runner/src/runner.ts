import ts from 'typescript';
import safeEval from 'safe-eval';

export class Compiler {
  private js: ts.TranspileOutput;

  constructor(code: string) {
    this.js = ts.transpileModule(code, {
      compilerOptions: { module: ts.ModuleKind.CommonJS }
    });
  }

  public installDependencies() {}

  public evaluate(context?: object) {
    const source = `(() => {${this.js.outputText}})();`;
    return safeEval(source, context);
  }
}
