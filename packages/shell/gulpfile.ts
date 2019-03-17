import { series, src, dest } from 'gulp';
import del from 'del';
import ParcelBundler from 'parcel-bundler';
import { npmRun } from '@yakapa/shared';

type TaskCallback = (err?: Error) => void;

const buildDestination = '../../release';
const extensionsDist = './lib/extensions/';

function cleanStart() {
  return del(['lib/*.+(js|html|map)']);
}

async function startParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler('src/**/*', {
    watch: true,
    publicUrl: './',
    outDir: './lib'
  });
  await bundler.bundle();
  cb();
}

async function startNW(cb: TaskCallback) {
  npmRun('run', ['.', '--x64', '--mirror https://dl.nwjs.io/']).then(_ => cb());
}

function createReleaseFolder() {
  return src('*.*', { read: false }).pipe(dest(buildDestination));
}

function copyExtensions() {
  return src('*.*', { read: false })
    .pipe(dest(extensionsDist))
    .pipe(src('../settings/lib/**/*'))
    .pipe(dest(`${extensionsDist}/settings/`));
}

async function cleanBuild() {
  await del([`${buildDestination}/**/*`], { force: true });
  return del([`${extensionsDist}/**/*`], { force: true });
}

async function buildParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler('src/**/*', {
    watch: false,
    publicUrl: './',
    outDir: './lib'
  });
  await bundler.bundle();
  cb();
}

async function buildNW(cb: TaskCallback) {
  // const builder = new Builder(
  //   {
  //     win: true,
  //     //mac: true,
  //     x64: true,
  //     mirror: 'https://dl.nwjs.io/',
  //     destination: buildDestination
  //   },
  //   '.'
  // );
  // await builder.build();
  // cb();
  await npmRun('build', ['--tasks', 'win-x64,mac-x64', '--mirror', 'https://dl.nwjs.io/', '.']);
  cb();
}

export const start = series(cleanStart, startParcel, startNW);
export const build = series(createReleaseFolder, cleanBuild, copyExtensions, buildParcel, buildNW);
