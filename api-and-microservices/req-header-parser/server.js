const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', (req,res) => {
  const resObj = {
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  };
  res.json(resObj);
});

app.use( (req, res, next) => {
  res.status(404);
  res.type('txt').send('Not found');
});

app.listen(port, () => console.log(`Server is running at port ${port}`));
