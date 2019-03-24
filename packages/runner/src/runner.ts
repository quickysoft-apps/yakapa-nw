import * as ts from 'typescript';
import safeEval from 'safe-eval';

export const run = (code: string): any => {
  const source = `    
    (() => {${code}})();    
  `;

  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
  });

  const result = safeEval(js.outputText);

  return result;
};
