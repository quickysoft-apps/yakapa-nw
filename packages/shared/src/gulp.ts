import path from 'path';
import { spawn, ChildProcess } from 'child_process';

function onExit(childProcess: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.once('exit', (code: number, signal: string) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error('Exit with error code: ' + code));
      }
    });
    childProcess.once('error', (err: Error) => {
      reject(err);
    });
  });
}

export async function npmRun(command: string, args: string[], exitProcess: boolean = true): Promise<string[]> {
  const cmd = `./node_modules/.bin/${command}${process.platform === 'win32' ? '.cmd' : ''}`;
  const fullpath = path.resolve(process.cwd(), cmd);

  const npmProcess = spawn(fullpath, args, { stdio: [process.stdin, process.stdout, process.stderr, 'pipe'] });

  let lines: string[] = [];
  if (npmProcess.stdout) {
    npmProcess.stdout.setEncoding('utf8');
    npmProcess.stdout.on('data', function(data) {
      var str = data.toString();
      lines = str.split(/(\r?\n)/g);
    });
  }
  try {
    await onExit(npmProcess);
    if (exitProcess) {
      process.exit(0);
    }
    return lines;
  } catch (err) {
    console.log('Error executing npm script:', err.message);
    process.exit(1);
    return [err.message];
  }
}
