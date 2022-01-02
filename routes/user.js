const express = require('express');
const bcrypt = require("bcrypt");
const { default: Hashids } = require('hashids/cjs/hashids');

const userRoutes = express.Router();

const { ObjectId } = require('mongodb');
const dbo = require('../db/conn');

userRoutes.route('/users').get((req, res) => {
  const db_connect = dbo.getDb();
  db_connect
    .collection('users')
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

userRoutes.route("/users/add").post(async function (req, response) {
    let db_connect = dbo.getDb();

    var hashids = new Hashids(process.env.PW_HASH);
    var hash = hashids.encode(Date.now());

    if (req.body.username == null || req.body.username == "") {
        throw err;
    }
    else if (req.body.password == null || req.body.password == "") {
        throw err;
    }

    const salt = await bcrypt.genSalt(10);
    hashed_password = await bcrypt.hash(req.body.password, salt);

    let user = {
        uniqueid: hash,
        username: req.body.username,
        password: hashed_password,
    };

    db_connect.collection("users").insertOne(user, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

userRoutes.route("/users/:username").get(function(req, res){
    let db_connect = dbo.getDb();
    db_connect.collection("users").findOne({username: req.params.username}, function(err, result){
        if (err) throw err;
        res.json(result);
    });
});

/*

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
let db_connect = dbo.getDb();
let myquery = { _id: ObjectId( req.params.id )};
let newvalues = {
    $set: {
    person_name: req.body.person_name,
    person_position: req.body.person_position,
    person_level: req.body.person_level,
    },
};
db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    console.log("1 document updated");
    response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
let db_connect = dbo.getDb();
let myquery = { _id: ObjectId( req.params.id )};
db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
});
});
*/

module.exports = userRoutes;
