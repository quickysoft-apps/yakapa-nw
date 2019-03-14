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

export async function npmRun(
  command: string,
  args: string[]
): Promise<string[]> {
  const cmd = `./node_modules/.bin/${command}${
    process.platform === 'win32' ? '.cmd' : ''
  }`;
  const fullpath = path.resolve(__dirname, cmd);
  const npmProcess = spawn(fullpath, args, { stdio: 'pipe' });

  let lines: string[] = [];
  if (npmProcess.stdout) {
    npmProcess.stdout.setEncoding('utf8');
    npmProcess.stdout.on('data', function(data) {
      var str = data.toString();
      lines = str.split(/(\r?\n)/g);
    });
  }
  await onExit(npmProcess);
  return lines;
}
