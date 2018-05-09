var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbUrl = "mongodb://localhost:27017";
const dbName = "testDB";
const ObjectId = require('mongodb').ObjectId;

function findAllLocations() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function (err, client) {
      if (err) {
        reject(err);
      } else {
        const db = client.db(dbName);
        db.collection("locations").find({}).toArray(function (err, items) {
          if (err) {
            reject(err);
          } else {
            resolve(items);
          }
          client.close();
        })
      }
    });
  });
}

function searchLocations(location) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function (err, client) {
      if (err) {
        reject(err);
      } else {
        const db = client.db(dbName);
        let query = {category: location.category, coord: {$near: [parseFloat(location.lon), parseFloat(location.lat)]} }
        if (location.name) {
          query.name = location.name;
        } 
        db.collection('locations').find(query).limit(3).toArray(function (err, items) {
          if (err) {
            reject(err);
          } else {
            resolve(items);
          }
          client.close();
        })
      }
    });
  });
}

function findLocationById(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function (err, client) {
      if (err) {
        reject(err);
      } else {
        const db = client.db(dbName);
        db.collection("locations").findOne({_id: ObjectId(id)}, function(err, item) {
          if (err) {
            reject(err);
          } else {
            resolve(item);
          }
          client.close();
        });
      }
    });
  });
}

function addLocation(location) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function (err, client) {
      if (err) {
        reject(err);
      } else {
        const db = client.db(dbName);
        db.collection("locations").insertOne(location, function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
          client.close();
        });
      }
    });
  });
}

function editLocation(id, location) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function (err, client) {
      if (err) {
        reject(err);
      } else {
        const db = client.db(dbName);
        db.collection("locations").findOne({_id: ObjectId(id)}, function(err, doc) {
          if (err) {
            reject(err);
          } else {
            let query = {_id : ObjectId(id)}; 
            let operator =   {$set: {
              name: location.name,
              category: location.category,
              coord: [parseFloat(location.lon), parseFloat(location.lat)]
            }};
            db.collection("locations").updateOne(query, operator).then(result => {
              resolve(result);
            }).catch(err => {
              reject(err);
            });
            client.close();
          }
        });
      }
    });
  });
}

function deleteLocation(id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, function(err, client) {
      if(err) {
        reject(err);
      } else {
        const db = client.db(dbName);
        db.collection('locations').deleteOne({_id: ObjectId(id)}, function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      }
    })
  });
}

router.get('/', function (req, res, next) {
  findAllLocations().then(items => {
    res.render('locations', { locations: items });
  }).catch(err => {
    next(err);
  });
});

router.get('/edit/:id', function (req, res, next) {
  findAllLocations().then(items => {
    findLocationById(req.params.id).then(item => {
      if (item === null) {
        res.redirect('/locations'); // something wrong
      } else {
        res.render('editLocation', { location: item });
      }
    })
    .catch(err => {
      next(err);
    });
  }).catch(err => {
    next(err);
  });
});

router.post('/edit/:id', function (req, res, next) {
  console.log(req.body);
  req.assert('name', 'name is required').notEmpty();
  req.assert('lon', 'longitude is required').notEmpty();
  req.assert('lon', 'longitude is invalid').isFloat();
  req.assert('lat', 'latitude is required').notEmpty();
  req.assert('lat', 'latitude is invalid').isFloat();  
  const errors = req.validationErrors();
  if (errors) {
    const editted = {
      _id: req.params.id,
      name: req.body.name,
      category: req.body.category,
      coord: [parseFloat(req.body.lon), parseFloat(req.body.lat)]
    };
    res.render('editLocation', {location: editted, errors: errors});
  } else {
    editLocation(req.params.id, req.body).then(result => {
      res.redirect('/locations');
    }).catch(err => {
      next(err);
    });
  }
});

router.post('/add', function (req, res, next) {
  console.log(req.body);
  req.assert('name', 'name is required').notEmpty();
  req.assert('lon', 'longitude is required').notEmpty();
  req.assert('lon', 'longitude is invalid').isFloat();
  req.assert('lat', 'latitude is required').notEmpty();
  req.assert('lat', 'latitude is invalid').isFloat();  
  const errors = req.validationErrors();
  if (errors) {
    findAllLocations().then(items => {
      res.render('locations', { errors: errors, locations: items });
    }).catch(err => {
      next(err);
    });
  } else {
    const loc = {
      name: req.body.name,
      category: req.body.category,
      coord: [parseFloat(req.body.lon), parseFloat(req.body.lat)]
    }
    addLocation(loc).then(result => {
      res.redirect('/locations');
    }).catch(err => {
      next(err);
    });
  }
});

router.get('/delete/:id', function (req, res, next) {
  deleteLocation(req.params.id).then(result => {
    res.redirect('/locations');
  }).catch(err => {
    next(err);
  });
});

router.get('/search', function (req, res, next) {
    res.render('search', { locations: [] });
});

router.post('/search', function (req, res, next) {
  console.log(req.body);
  req.assert('category', 'category is required').notEmpty();
  req.assert('lon', 'longitude is required').notEmpty();
  req.assert('lon', 'longitude is invalid').isFloat();
  req.assert('lat', 'latitude is required').notEmpty();
  req.assert('lat', 'latitude is invalid').isFloat();  
  const errors = req.validationErrors();
  if (errors) {
    res.render('search', { errors: errors, locations: [] });
  } else {
    searchLocations(req.body).then(items => {
      res.render('search', { errors: errors, locations: items });
    }).catch(err => {
      next(err);
    });
  }
});

module.exports = router;
