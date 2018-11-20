const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shortid = require('shortid');
require('dotenv').load();
const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true }, function(err) {
  if (err) console.log("MongoDB connection error");
  console.log("MongoDB Connected");
});
const User = require('./models/users');
const Log = require('./models/logs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get('/api/exercise/log', (req, res) => {

  let {userId, from, to, limit} = req.query;
  from = (from === undefined) ? new Date(0) : new Date(from);
  to = (to === undefined) ? new Date() : new Date(to);

  User.findOne({userId: userId}, function(err, user, next) {
    if (err) return next(err);
    if (user) {
      Log
      .find({userId: userId, date: {$gte: new Date(from), $lte: new Date(to)}},
        {_id: 0, __v: 0})
      .sort({date: 1})
      .limit(parseInt(limit))
      .exec(function(err, logs) {
        res.json({
          _id:user.userId,
          username:user.username,
          count:logs.length,
          log: logs.map(function(log) {
                  return {
                    description: log.description,
                    duration: log.duration,
                    date: log.date.toDateString()
                  }
          })
        });
      });
    } else {
      res.send("unknown userId");
    }
  });
});

app.post('/api/exercise/new-user', (req, res, next) => {
  User.findOne({username: req.body.username}, function(err, doc){
    if (err) return next(err);
    if (doc) {
      res.send('username already taken');
    } else {
      let query = {userId: shortid.generate(), username: req.body.username};
      User.create(query, function(err, user) {
        res.json({_id:user.userId, username: user.username});
      });
    }
  });
});

app.post('/api/exercise/add', (req, res, next) => {
  let {userId, description, duration, date} = req.body;
  User.findOne({userId: userId}, function(err, user) {
    if (err) return next(err);
    if (!user) {
      res.status(400).send("unknown _Id");
    }

    date = (date)? new Date(date) : new Date();
    const query = {
      userId: userId,
      description: description,
      duration: duration,
      date: date
    };

    Log.create(query, function(err, doc) {
      if (err) return next(err);
      res.json({
        username:user.username,
        description: doc.description,
        duration:doc.duration,
        _id:doc.userId,
        date: doc.date.toDateString()
      })
    });

  });
});

app.use( (req, res, next) => {
  res.status(404).send('404 - Not found');
});

app.use(function(err, req, res, next) {
  if (err.errors) {    //mongoose errors
    const keys=Object.keys(err.errors);
    return res.status(400).send(err.errors[keys[0]].message);
  }
  else {    // node/express error
    console.log(err);
    return res.status(500).send("Internal error");
  }
});

app.listen(port, () => console.log(`Server is running at port ${port}`));
