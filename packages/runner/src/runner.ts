import ts from 'typescript';
import safeEval from 'safe-eval';
// import m from 'module';
// import vm from 'vm';

export class Compiler {
  private js: ts.TranspileOutput;

  constructor(code: string) {
    this.js = ts.transpileModule(code, {
      compilerOptions: { module: ts.ModuleKind.CommonJS }
    });
  }

  public installDependencies() {}

  public evaluate(context?: object) {
    const ctx = { ...context, require };
    const source = `(() => {${this.js.outputText}})();`;

    // var res = vm.runInNewContext(m.wrap(this.js.outputText), context)(exports, require, module, __filename, __dirname);
    // console.log('------------', res);

    return safeEval(source, ctx);
    // return res;
  }
}
