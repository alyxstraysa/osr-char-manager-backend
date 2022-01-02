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


charRoutes.route("/characters/add").post(async function (req, response) {
    let db_connect = dbo.getDb();

    if (req.body.username == null || req.body.username == "") {
        throw err;
    }
    else if (req.body.password == null || req.body.password == "") {
        throw err;
    }

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
        HP: req.body.HP,
        AC: req.body.AC,
        MEL: req.body.MEL,
        MAX_HP: req.body.MAX_HP,
        UNAC: req.body.UNAC,
        DEX_AC: req.body.DEX_AC,
        MIS: req.body.MIS,
        INIT: req.body.INIT,
        LISTENDOORS: req.body.LISTENDOORS,
        OPENSTUCK: req.body.OPENSTUCK,
        SECRETDOOR: req.body.SECRETDOOR,
        ROOMTRAP: req.body.ROOMTRAP,
        OVERLAND_SPEED: req.body.OVERLAND_SPEED,
        EXPLORATION_SPEED: req.body.EXPLORATION_SPEED,
        ENCOUNTER_SPEED: req.body.ENCOUNTER_SPEED,
    };

    db_connect.collection("characters").insertOne(character, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = charRoutes;
