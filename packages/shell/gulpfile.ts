import { series, src, dest } from "gulp";
import del from "del";
import ParcelBundler from "parcel-bundler";
import { Builder } from "nwjs-builder-phoenix";
import { spawn } from "child_process";

type TaskCallback = (err?: Error) => void;

const buildDestination = "../../release";
const extensionsDist = "./dist/extensions/";

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
  // const runner = new Runner(
  //   { x64: true, mirror: "https://dl.nwjs.io/", detached: false },
  //   ["."]
  // );
  // runner.run().then(code => {
  //   process.exit(code);
  // });

  const process = spawn("./node_modules/.bin/run", [
    "--x64",
    "--mirror https://dl.nwjs.io/",
    "."
  ]);
  process.stdout.setEncoding("utf8");
  process.stdout.on("data", function(data) {
    const str = data.toString();
    const lines = str.split(/(\r?\n)/g);
    console.log(lines.join(""));
  });

  process.on("close", function(code) {
    console.log("process exit code " + code);
  });
  cb();
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
