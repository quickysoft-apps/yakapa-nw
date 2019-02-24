const spawn = require('child_process').spawn;
const nw = require('nw');

const parcel_process = spawn('node',  ['./parcel.js']);
// findpath returns the executable
// nw js lacks any other programatic API
const nw_process = spawn(nw.findpath(), ['.'].concat( process.argv.slice(2)));

parse_output(parcel_process);
parse_output(nw_process);

// Mainly needed because parcel otherwise overwrites the last line in the output,
// a new log level will be introduced for this.
function parse_output (process) {

    process.stdout.setEncoding('utf8');
    process.stdout.on('data', function (data) {
        const str = data.toString();
        const lines = str.split(/(\r?\n)/g);
        console.log(lines.join(""));

    });

    process.on('close', function (code) {
        console.log('process exit code ' + code);
    });
}

parcel_process.unref();
nw_process.unref();