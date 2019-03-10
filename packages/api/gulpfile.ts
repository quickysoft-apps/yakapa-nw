import path from "path";
import del from "del";
import { ChildProcess, spawn } from "child_process";
import { series, watch } from "gulp";

type TaskCallback = (err?: Error) => void;

const PRISMA_PATH = "./node_modules/.bin/prisma";

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

async function npmRun(command: string, args: string[]): Promise<string[]> {
  const fullpath = path.resolve(__dirname, command);
  const npmProcess = spawn(fullpath, args, { stdio: "pipe" });

  let lines: string[] = [];
  if (npmProcess.stdout) {
    npmProcess.stdout.setEncoding("utf8");
    npmProcess.stdout.on("data", function(data) {
      var str = data.toString();
      lines = str.split(/(\r?\n)/g);
    });
  } else console.log("no stdtout");
  await onExit(npmProcess);
  return lines;
}

async function generate(cb: TaskCallback) {
  await del("./generated/**/*");
  await npmRun(PRISMA_PATH, ["generate"]);
  cb();
}

export async function deploy(cb: TaskCallback) {
  await npmRun(PRISMA_PATH, ["deploy"]);
  cb();
}

export const start = series(deploy, generate);

watch("./*.+(prisma|yml)", { queue: true }, start);
