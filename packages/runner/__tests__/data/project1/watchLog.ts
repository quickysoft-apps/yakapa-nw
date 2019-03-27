import fs from 'fs';

export function watchLog(logfile: string) {
  fs.watch(logfile, (event, filename) => {
    if (filename) {
      return `${filename} file Changed`;
    } else return null;
  });
}

//watchLog(logfile);
