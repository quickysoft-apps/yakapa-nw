import { series } from 'gulp';
import { exec } from 'child_process';
import del from 'del';
import ParcelBundler from 'parcel-bundler';
import { Runner } from 'nwjs-builder-phoenix';

function cleanDist(cb: (err?: Error) => void) {
  return del(['dist/*.{js, map, html}']);
}

async function startParcel(cb: (err?: Error) => void) {
  exec(
    '../../node_modules/.bin/parcel watch src/**/* --public-url ./',
    (error, stdout, stderr) => {
      console.log(stdout);
    }
  );
  const bundler = new ParcelBundler('src/**/*', {
    watch: true,
    publicUrl: './'
  });
  await bundler.bundle();
  cb();
}

function startNW(cb: Function) {
  const runner = new Runner({ x64: true, mirror: 'https://dl.nwjs.io/' }, [
    '.'
  ]);
  runner.run();
  cb();
}

export const start = series(cleanDist, startParcel, startNW);
