const { fork } = require('child_process');
const fs = require('fs');
const url = require('url');
const path = require('path');
const server = require('http').createServer();

server.on('request', (req, res) => {
    const urlObj = url.parse(req.url, true);
    getFilePath(urlObj)
        .then(function(filePath) {
            const childProcess = fork('ex1server.js');
            childProcess.send(filePath);
            childProcess.on('message', (data) => {
                console.log(data);
                res.end(data.toString());
            });

        }).catch(function(error) {
            res.end(error);
        });      
}).listen(3000);

function getFilePath(urlObj) {
    return new Promise(function (resolve, reject) {
        if (!urlObj.query['url']) {
            reject('Missing url path');
        }
    
        const filePath = path.join(__dirname, urlObj.query.url);
    
        fs.exists(filePath, (exists) => {
            if (!exists) {
                reject('File not found');
            } else {
                resolve(filePath);
            }
        }); 
    });
}