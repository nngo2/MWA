var express = require('express');
var router = express.Router();
const fs = require('fs');
const appRoot = require('app-root-path');

const title = 'Newsletter subscription';

/* Get form */
router.get('/', function (req, res, next) {
  res.render('newsletter', { title: title, msg: '' });
});

/* Post form */
router.post('/', function (req, res, next) {
  console.log(req.body);
  req.assert('email', 'email is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    res.render('newsletter', { title: title, errors: errors });
  } else {
    save(req.body.email).then(() => {
      res.render('thankyou', { title: title, msg: req.body.email });
    }).catch(err => {
      next(err);
    })
  }
});

function save(data) {
  return new Promise((resolve, reject) => {
    const filePath = appRoot + '/subscribers.txt';
    fs.exists(filePath, exists => {
      if (!exists) {
        fs.writeFile(filePath, data, function (err) {
          if (err) {
            reject(Error(err));
          } else {
            resolve();
          }
        });       
      } else {
        fs.appendFile(filePath, data, function (err) {
          if (err) {
            reject(Error(err));
          } else {
            resolve();
          }
        });
      }
    });
  });
}

module.exports = router;
