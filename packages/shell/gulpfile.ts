import { series, src, dest } from "gulp";
import del from "del";
import ParcelBundler from "parcel-bundler";
import { Builder } from "nwjs-builder-phoenix";
import { spawn, ChildProcess } from "child_process";
import path from "path";

type TaskCallback = (err?: Error) => void;

const buildDestination = "../../release";
const extensionsDist = "./dist/extensions/";

function onExit(childProcess: ChildProcess): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.once("exit", (code: number, signal: string) => {
      if (code === 0) {
        resolve(undefined);
      } else {
        reject(new Error("Exit with error code: " + code));
      }
    });
    childProcess.once("error", (err: Error) => {
      reject(err);
    });
  });
}

function cleanStart() {
  return del(["dist/*.+(js|html|map)"]);
}

async function startParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler("src/**/*", {
    watch: true,
    publicUrl: "./"
  });
  await bundler.bundle();
  cb();
}

async function startNW(cb: TaskCallback) {
  const runPath = path.join(__dirname, "./node_modules/.bin/run");
  const runProcess = spawn(
    runPath,
    [".", "--x64", "--mirror https://dl.nwjs.io/"],
    { stdio: [process.stdin, process.stdout, process.stderr] }
  );

  runProcess.on("close", function(code) {
    process.exit(code);
  });

  onExit(runProcess).then(_ => cb());
}

function createReleaseFolder() {
  return src("*.*", { read: false }).pipe(dest(buildDestination));
}

function copyExtensions() {
  return src("*.*", { read: false })
    .pipe(dest(extensionsDist))
    .pipe(src("../settings/dist/**/*"))
    .pipe(dest(`${extensionsDist}/settings/`));
}

async function cleanBuild() {
  await del([`${buildDestination}/**/*`], { force: true });
  return del([`${extensionsDist}/**/*`]);
}

async function buildParcel(cb: TaskCallback) {
  const bundler = new ParcelBundler("src/**/*", {
    watch: false,
    publicUrl: "./"
  });
  await bundler.bundle();
  cb();
}

async function buildNW(cb: TaskCallback) {
  const builder = new Builder(
    {
      win: true,
      x64: true,
      mirror: "https://dl.nwjs.io/",
      destination: buildDestination
    },
    "."
  );
  await builder.build();
  cb();
}

export const start = series(cleanStart, startParcel, startNW);
export const build = series(
  createReleaseFolder,
  cleanBuild,
  copyExtensions,
  buildParcel,
  buildNW
);
