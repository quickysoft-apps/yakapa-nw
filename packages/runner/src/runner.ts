import path from 'path';
import pacote from 'pacote';
import { Project, ScriptTarget, SourceFile, Directory } from 'ts-morph';
import { NodeVM } from 'vm2';
import { ModuleKind, ModuleResolutionKind } from 'typescript';

export interface Script {
  filename?: string;
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
    this.sourceFile = this.projectDirectory.createSourceFile(this.script.filename || 'source.ts', this.script.source, { overwrite: true });
    this.sourceFile.save();
    this.sourceFile.emit();

    await this.installPackages();
  }

  public runSync<T>(args?: object): T | null {
    const func = this.getRunnable();
    return func(args) as T;
  }

  public async run(args: object = {}, callback: (...args: any[]) => void, timeout: number = 30000) {
    const func = this.getRunnable();
    const timeoutPromise = new Promise(resolve => setTimeout(() => resolve(func), timeout));
    const funcPromise = new Promise(_ => func(args, callback));
    return Promise.race([funcPromise, timeoutPromise]);
  }

  private getRunnable() {
    if (!this.sourceFile || !this.projectDirectory) {
      throw new Error('Scripts must be installed first');
    }

    const emitOutput = this.sourceFile.getEmitOutput();
    const match = path.basename(this.script.filename || 'source', '.ts');
    const source = emitOutput.getOutputFiles().find(file => file.getFilePath().includes(match));

    if (source) {
      const vm = new NodeVM({
        require: {
          external: true,
          builtin: ['fs', 'path'],
          root: this.projectDirectory.getPath()
        }
      });

      return vm.run(source.getText(), source.getFilePath());
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
