const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dns = require('dns');
require('dotenv').load();

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true }, function(err) {
  if (err) console.log("MongoDB connection error");
  console.log("MongoDB Connected");
});

const Schema = mongoose.Schema;
const mySchema = new Schema({
  url:  {type: String, unique: true},
  index: {type: Number, index: true}
});
const UrlList = mongoose.model('UrlList', mySchema);

const countSchema = new Schema({
  _id: String,
  counter: Number
});
const Count = mongoose.model("Count", countSchema);

// Create a counts collection if it does not exist yet
Count.findOne({_id: "myCounter"}, function(err, doc) {
  if (!doc) {
    new Count({_id:'myCounter', counter: 0}).save(function(err, cnt) {
      if (err) return console.log(err);
    });
  }
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.post('/api/shorturl/new', (req, res) => {
  const protocolPattern = /^https?:\/{2}/;
  if (protocolPattern.test(req.body.url_input)) {    //check for http(s) protocol header
    const hostnamePattern = /[a-z_\-]+\.?[a-z_\-]*\.[a-z]+/i;
    let matched = req.body.url_input.match(hostnamePattern);
    let submittedHostname = req.body.url_input.slice(matched['index'],-1);
    if (matched[0] && submittedHostname) {    // avoid half matched string
      dns.lookup(matched[0], function(err, addr, family) {    //dns lookup for exist hostname
        if (err) return res.json({"error": "invalid URL"});
        // check if the url is in database
        UrlList.findOne({url: req.body.url_input}, function(err, doc) {
          if (err) return console.log(err);
          if (doc!=null) {    // if it is in the database, just send it
            res.json({original_url:doc.url, short_url:doc.index});
          } else {    // else generate it, save it and send it
            Count.findOneAndUpdate({}, {$inc: {counter: 1}}, {new:true}, function(err, cnt) {
              UrlList.create({url:req.body.url_input, index: cnt.counter}, function(err, doc) {
                res.json({original_url:doc.url, short_url:doc.index});
              });
            });
          };
        });
      });
    } else {
      res.json({"error": "invalid URL"});    //invalid hostname
    }
  } else {
    res.json({"error": "invalid URL"});    //protocol is not http(s)
  }
});

app.get('/api/shorturl/:url_id', (req, res) => {
  //find the original url and redirect
  UrlList.findOne({index: req.params.url_id}, function(err, doc) {
    if (err) return console.log(err);
    if (doc !=null) {
      res.redirect(doc.url);
    } else {
      res.json({"error": "invalid_URL"});
    }
  });
});

app.use( (req, res, next) => {
  res.status(404);
  res.type('txt').send('Not found');
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at port ${port}`));
