import { series, src, dest } from 'gulp';
import del from 'del';
import ParcelBundler from 'parcel-bundler';
import { npmRun } from '@yakapa/shared';

type TaskCallback = (err?: Error) => void;

const buildDestination = '../../release';
const extensionsDist = '../../release/extensions';

function cleanStart() {
  return del(['lib/*.+(js|html|map)']);
}

async function startParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler('src/index.html', {
    watch: true,
    publicUrl: './',
    outDir: './lib'
  });
  await bundler.bundle();
  cb();
}

async function startNW(cb: TaskCallback) {
  npmRun('run', ['.', '--x64', '--mirror https://dl.nwjs.io/']);
  cb();
}

function createReleaseFolder() {
  return src('*.*', { read: false }).pipe(dest(buildDestination));
}

function copyExtension(extensionName: string) {
  return src('*.*', { read: false })
    .pipe(dest(extensionsDist))
    .pipe(src(`../${extensionName}/lib/**/*`))
    .pipe(dest(`${extensionsDist}/${extensionName}/`));
}

function copyExtensions(cb: TaskCallback) {
  copyExtension('settings');
  copyExtension('networks');
  cb();
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
  // const platforms = 'win-x64,mac-x64';
  const platforms = 'mac-x64';
  npmRun('build', ['--tasks', platforms, '--mirror', 'https://dl.nwjs.io/', '.']).then((_: any) => cb());
}

export const start = series(cleanStart, startParcel, startNW);
export const build = series(createReleaseFolder, cleanBuild, copyExtensions, buildParcel, buildNW);
