import { series, src, dest, watch } from 'gulp';
import del from 'del';
import ParcelBundler from 'parcel-bundler';
import path from 'path';
import { ChildProcess, spawn } from 'child_process';

type TaskCallback = (err?: Error) => void;

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

async function npmRun(command: string, args: string[]) {
  const fullpath = path.resolve(__dirname, command);
  console.log('---------------------', fullpath);
  const npmProcess = spawn(fullpath, args, {
    stdio: [process.stdin, process.stdout, process.stderr]
  });

  npmProcess.on('close', function(code) {
    process.exit(code);
  });

  npmProcess.on('error', (err: Error) => {
    console.log('Error', err.message);
  });

  onExit(npmProcess);
}

function clean() {
  return del(['./dist/**/*.+(js|html|map|json)']);
}

function copyManifest() {
  return src('manifest.json').pipe(dest('./dist/'));
}

async function startParcel(cb: TaskCallback) {
  npmRun('./node_modules/.bin/parcel.cmd', [
    'watch',
    'src/**/*',
    '--public-url',
    ' ./',
    '--out-dir',
    './dist/build'
  ]).then(_ => cb());
}

async function buildParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler('src/**/*', {
    watch: false,
    outDir: './dist/build'
  });
  await bundler.bundle();
  cb();
  process.exit(0);
}

export const start = series(clean, copyManifest, startParcel);
export const build = series(clean, copyManifest, buildParcel);

watch('manifest.json', { queue: true }, copyManifest);
