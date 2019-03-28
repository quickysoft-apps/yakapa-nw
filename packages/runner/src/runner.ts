import { Project, MemoryEmitResult } from 'ts-morph';
import safeEval from 'safe-eval';

export class Compiler {
  private project: Project;
  private emittedJSSource: MemoryEmitResult;

  constructor(code: string) {
    this.project = new Project();
    this.project.createSourceFile('script.ts', code);
    this.emittedJSSource = this.project.emitToMemory();
  }

  public installDependencies() {}

  public evaluate(context?: object) {
    const source = `(() => {${this.emittedJSSource.getFiles()[0].text}})();`;
    return safeEval(source, context);
  }
}
