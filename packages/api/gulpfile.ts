import { series, watch } from 'gulp';
import { npmRun } from '@yakapa/shared';

type TaskCallback = (err?: Error) => void;

export async function deploy(cb: TaskCallback) {
  npmRun('prisma', ['deploy'], false);
  cb();
}

export const start = series(deploy);

watch('./*.+(prisma|yml)', { queue: true }, start);
