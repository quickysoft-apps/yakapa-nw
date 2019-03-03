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

async function startNW(cb: Function) {
  const runner = new Runner(
    { x64: true, mirror: 'https://dl.nwjs.io/', detached: true },
    ['.']
  );
  const code = await runner.run();
  if (code !== 0) {
    cb(new Error(`Runner exit with code ${code}`));
  } else {
    cb();
  }
}

export const start = series(cleanDist, startParcel, startNW);
