import { series, src, dest, watch } from 'gulp';
import del from 'del';
import ParcelBundler from 'parcel-bundler';
import { npmRun } from '@yakapa/shared';

type TaskCallback = (err?: Error) => void;

function clean() {
  return del(['./lib/**/*.+(js|html|map|json)']);
}

function copyManifest() {
  return src('manifest.json').pipe(dest('./lib/'));
}

async function startParcel(cb: TaskCallback) {
  npmRun('parcel', [
    'watch',
    'src/**/*',
    '--public-url',
    ' ./',
    '--out-dir',
    './lib/build',
    '--no-source-maps'
  ]);
  cb();
}

async function buildParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler('src/**/*', {
    watch: false,
    outDir: './lib/build'
  });
  await bundler.bundle();
  cb();
  process.exit(0);
}

export const start = series(clean, copyManifest, startParcel);
export const build = series(clean, copyManifest, buildParcel);

watch('manifest.json', { queue: true }, copyManifest);
