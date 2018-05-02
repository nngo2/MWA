const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();

const input = fs.createReadStream(__dirname + '/big.txt');
const output = fs.createWriteStream(__dirname + '/big.txt.gz');
input.pipe(gzip).pipe(output);

output.on('close', function() {
    const input2 = fs.createReadStream(__dirname + '/big.txt.gz');
    const output2 = fs.createWriteStream(__dirname + '/big2.txt');
    input2.pipe(gunzip).pipe(output2);
});

