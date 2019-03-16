import { watch } from 'gulp';
import { npmRun } from '@yakapa/shared';

type TaskCallback = (err?: Error) => void;

export async function deploy(cb: TaskCallback) {
  npmRun('prisma', ['deploy'], false).then(_ => cb());
}

watch('./*.+(prisma|yml)', { queue: true }, deploy);
