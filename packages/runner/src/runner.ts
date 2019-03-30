import path from 'path';
import pacote from 'pacote';
import { Project, ScriptTarget, SourceFile, Directory } from 'ts-morph';
import { NodeVM } from 'vm2';
import { ModuleKind, ModuleResolutionKind } from 'typescript';

export class Compiler {
  private sourceFile: SourceFile;
  private projectDir: Directory;

  constructor(private projectName: string, source: string) {
    const scriptsDir = path.resolve(__dirname, '..', 'scripts');

    const project = new Project({
      compilerOptions: {
        target: ScriptTarget.ES5,
        module: ModuleKind.CommonJS,
        moduleResolution: ModuleResolutionKind.NodeJs,
        esModuleInterop: true,
        outDir: `${scriptsDir}/${projectName}/dist`
      }
    });

    this.projectDir = project.createDirectory(path.resolve(scriptsDir, this.projectName));
    this.sourceFile = this.projectDir.createSourceFile('source.ts', source, { overwrite: true });
    this.sourceFile.save();
    this.sourceFile.emit();
  }

  public async run(args?: object) {
    const projectDir = this.projectDir.getPath();
    const importDeclaration = this.sourceFile.getImportDeclarations()[0];
    const moduleName = importDeclaration.getModuleSpecifierValue();
    await pacote.extract(`${moduleName}@latest`, path.resolve(projectDir, 'node_modules', moduleName), { cache: path.resolve(projectDir, 'node_modules', '.cache') });

    const emitOutput = this.sourceFile.getEmitOutput();
    const source = emitOutput.getOutputFiles().find(file => file.getFilePath().includes('source.js'));

    if (source) {
      const vm = new NodeVM({
        require: {
          external: true
        }
      });

      const func = vm.run(source.getText(), source.getFilePath());
      return func(args);
    } else {
      return null;
    }
  }
}
