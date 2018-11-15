const express = require('express');
const multer = require('multer'); // refer to https://www.npmjs.com/package/multer
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.use(multer().single('upfile'));    //handling multi-part parsing and upload

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.post('/api/upload', (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size});
});

app.use( (req, res, next) => {
  res.status(404);
  res.type('txt').send('404 - Not Found.');
});

app.listen(port, () => console.log(`Server is running at port ${port}`));
