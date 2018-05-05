var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const { Observable, Subject } = require('rxjs');

const dataUrl = 'http://jsonplaceholder.typicode.com/users';

/* GET users listing. */
router.get('/', function (req, res, next) {
  fetchUsers().then(data => {
    res.render('users', {title: 'User Table', users: data});
  }).catch(err => {
    res.end(err);
  });

  // fetchUsersAsync().then(data => {
  //   res.render('users', {title: 'User Table', users: data});
  // }).catch(err => {
  //   res.end(err);
  // });

  // let userData = new Subject(); 

  // userData.subscribe(
  //   (data) => {
  //     res.render('users', {title: 'User Table', users: data});
  // }, (err) => {
  //   console.log(err);
  //   res.end(err);
  // });

  // fetchUsersSubject(userData);

});

function fetchUsers() {
  return new Promise((resolve, reject) => {
    fetch(dataUrl).then(data => {
      data.json().then(values => {
       resolve(values);
      });
    }).catch(err => {
      reject(new Error(err));
    });
  });
}

function fetchUsersSubject(userData) {
  fetchUsers().then(users => {
    userData.next(users);
    userData.complete();
  }).catch(err => {
    userData.error(err);
  });
}

async function fetchUsersAsync() {
    try {
      const data = await fetch(dataUrl);
      const users = await data.json();
      return users;
    } catch (err) {
      return new Error(err);
    }
}

module.exports = router;
