const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, resp) => {
    fs.createReadStream('./big.txt').pipe(resp);
}).listen('8989');

// server.on('request', (req, res) => {
//     fs.readFile('./big.txt', (err, data) => {
//         if (err) throw err;
//         res.end(data);
//     });
// }).listen('8989');
