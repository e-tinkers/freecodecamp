const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/whoami', (req,res) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

app.use( (req, res, next) => {
  res.status(404);
  res.type('txt').send('Invalid endpoint. Usage: /api/whoami');
});

app.listen(port, () => console.log(`Server is running at port ${port}`));
