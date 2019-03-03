import { series, src, dest, watch } from 'gulp';
import del from 'del';
import ParcelBundler from 'parcel-bundler';

function clean(cb: (err?: Error) => void) {
  return del(['./dist/**/*.+(js|html|map|json)']);
}

function copyManifest() {
  return src('manifest.json').pipe(dest('./dist/'));
}

async function startParcel() {
  const bundler = new ParcelBundler('src/**/*', {
    watch: true,
    outDir: './dist/build'
  });
  await bundler.bundle();
}

async function buildParcel() {
  const bundler = new ParcelBundler('src/**/*', {
    watch: false,
    outDir: './dist/build'
  });
  await bundler.bundle();
}

export const start = series(clean, copyManifest, startParcel);
export const build = series(clean, copyManifest, buildParcel);

watch('manifest.json', copyManifest);
