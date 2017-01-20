'use strict';

const MongoClient = require('mongodb').MongoClient;
import check from 'check-types';

let myCollection;

function startDb(url, cb) {

  MongoClient.connect(url, (err, db) => {

    if(err) throw new Error(err);

    myCollection = db.collection('university');

    cb(null, db);
  });
}

function find(data, cb) {
  myCollection.find(data).toArray((err, res) => {
    cb(err, res);
  });
}

function save(data, cb) {
  myCollection.insert(data, (err, res) => {
    cb(err, res);
  });
}

function del(data, cb) {
  myCollection.deleteMany(data, (err, res) => {
    cb(err, res);
  });
}

/*
{
"id": {"$gt": ""}
}
 */

module.exports = {
  startDb,
  save,
  find,
  del
};
