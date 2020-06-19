/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var validateRequest = require('../validate-request');

module.exports = function (app) {

  //const CONNECTION_STRING = 'mongodb://hcheung:hc802660mlab@ds145072.mlab.com:45072/freecodecamp';
  const CONNECTION_STRING = process.env.DB;

  //MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, function(err, client) {
    //const db = client.db('freecodecamp');
    //const collection = db.collection('Issues');

    app.route('/api/issues/:project')

      .get(function (req, res){
        var project = escape(req.params.project);

      })

      .post(function (req, res) {
        const {error, value} = validateRequest(req.body);
        if (error == null) {
          //await collection.insertOne(req.body, function(err, result) {
            //if (err) {
              //res.status(500).send({error: "Database Error"});
            //} else {
              res.send(req.body);
           //}
          //});
        } else {
          res.status(400).send({error: error.message});
        }
      })

      .put(function (req, res){
        var project = escape(req.params.project);

      })

      .delete(function (req, res){
        var project = escape(req.params.project);

      });

  //});

};
