const fs = require('fs');

process.on('message', (filePath) => {
    const data = fs.readFileSync(filePath, 'utf8'); 
    process.send(data);
}); 