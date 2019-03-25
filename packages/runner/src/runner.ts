import * as ts from 'typescript';
import safeEval from 'safe-eval';

export const run = (code: string, context?: object): any => {
  const source = `(() => {${code}})();`;

  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  });

  const result = safeEval(js.outputText, context);

  return result;
};
