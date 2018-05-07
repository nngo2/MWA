var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'testDB';

function getMessage() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function(err, client) {
      if (err) reject(Error(err));

      const db = client.db(dbName);

      db.collection('homework7').findOne({}, function(err2, doc) {
        if (err) reject(Error(err2));
        resolve(doc.message);
      });
    });
  });
}

function decrypt(message) {
  const decipher = crypto.createDecipher('aes256', 'asaadsaad');
  let decrypted = decipher.update(message, 'hex', 'utf8');
  decrypted += decipher.final('utf8'); 
  console.log(decrypted);
  return decrypted;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  getMessage().then(message => {
    const msg = decrypt(message);
    res.send('Decrypted message: ' + msg);
  }).catch(err => {
    console.log(err);
    res.end(err);
  })

});

module.exports = router;
