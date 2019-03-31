import path from 'path';
import pacote from 'pacote';
import { Project, ScriptTarget, SourceFile, Directory } from 'ts-morph';
import { NodeVM } from 'vm2';
import { ModuleKind, ModuleResolutionKind } from 'typescript';

export interface Script {
  source: string;
}

export class Runner {
  private sourceFile?: SourceFile;
  private projectDirectory?: Directory;

  constructor(private script: Script) {}

  public async install(installPath: string) {
    const project = new Project({
      compilerOptions: {
        target: ScriptTarget.ES5,
        module: ModuleKind.CommonJS,
        moduleResolution: ModuleResolutionKind.NodeJs,
        esModuleInterop: true,
        outDir: `${installPath}/dist`
      }
    });

    this.projectDirectory = project.createDirectory(installPath);
    this.sourceFile = this.projectDirectory.createSourceFile('source.ts', this.script.source, { overwrite: true });
    this.sourceFile.save();
    this.sourceFile.emit();

    await this.installPackages();
  }

  public run(args?: object) {
    if (!this.sourceFile) {
      throw new Error('Scripts must be installed first');
    }

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
    }
  }

  private async installPackages() {
    if (!this.sourceFile || !this.projectDirectory) return;

    const projectPath = this.projectDirectory.getPath();
    await Promise.all(
      this.sourceFile.getImportDeclarations().map(async importDeclaration => {
        const moduleName = importDeclaration.getModuleSpecifierValue();
        return pacote.extract(`${moduleName}@latest`, path.resolve(projectPath, 'node_modules', moduleName), { cache: path.resolve(projectPath, '.cache') });
      })
    );
  }
}
