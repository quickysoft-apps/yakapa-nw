import { series, src, dest, watch } from 'gulp';
import del from 'del';
import ParcelBundler from 'parcel-bundler';

type TaskCallback = (err?: Error) => void;

function clean(cb: TaskCallback) {
  return del(['./dist/**/*.+(js|html|map|json)']);
}

function copyManifest(cb: TaskCallback) {
  return src('manifest.json').pipe(dest('./dist/'));
}

async function startParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler('src/**/*', {
    watch: true,
    outDir: './dist/build'
  });
  await bundler.bundle();
  cb();
}

async function buildParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler('src/**/*', {
    watch: false,
    outDir: './dist/build'
  });
  await bundler.bundle();
  cb();
}

export const start = series(clean, copyManifest, startParcel);
export const build = series(clean, copyManifest, buildParcel);

watch('manifest.json', copyManifest);
