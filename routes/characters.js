const express = require('express');
const charRoutes = express.Router();
const { default: Hashids } = require('hashids/cjs/hashids');

const { ObjectId } = require('mongodb');
const dbo = require('../db/conn');

charRoutes.route('/characters').get((req, res) => {
    const db_connect = dbo.getDb();
    db_connect
      .collection('characters')
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        res.json(result);
      });
  });

charRoutes.route('/characters/:id').get((req, res) => {
    const db_connect = dbo.getDb();

    db_connect.collection("characters").findOne({charuniqueid: req.params.id}, function(err, result){
        if (err) throw err;
        res.json(result);
    });
});

charRoutes.route("/characters/add").post(async function (req, response) {
    let db_connect = dbo.getDb();

    var hashids = new Hashids(process.env.PW_HASH);
    var hash = hashids.encode(Date.now());

    let character = {
        useruniqueid: null,
        charuniqueid: hash,
        charname: req.body.charname,
        class: req.body.class,
        title: req.body.title,
        alignment: req.body.alignment,
        level: req.body.level,
        str: req.body.str,
        dex: req.body.dex,
        con: req.body.con,
        int: req.body.int,
        wis: req.body.wis,
        cha: req.body.cha,
        saving_throws: {
            D: req.body.saving_throws.D,
            W: req.body.saving_throws.W,
            P: req.body.saving_throws.P,
            B: req.body.saving_throws.B,
            S: req.body.saving_throws.S,
        },
        hp: req.body.hp,
        ac: req.body.ac,
        mel: req.body.mel,
        max_hp: req.body.max_hp,
        unac: req.body.unac,
        dex_ac: req.body.dex_ac,
        mis: req.body.mis,
        init: req.body.init,
        listendoors: req.body.listendoors,
        openstuck: req.body.openstuck,
        secretdoor: req.body.secretdoor,
        roomtrap: req.body.roomtrap,
        overland_speed: req.body.overland_speed,
        exploration_speed: req.body.exploration_speed,
        encounter_speed: req.body.encounter_speed,
    };

    db_connect.collection("characters").insertOne(character, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = charRoutes;
