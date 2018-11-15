const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/timestamp/:date_string*?', (req,res) => {
  let date = "";
  let dateString = req.params.date_string;

  if (dateString === undefined) {    //No dateString provided
      date = new Date();
  } else if (isNaN(dateString*1)){    //Is a timestamp string
      date = new Date(dateString);
  } else {    //Is either a valid or invalid date string
      date = new Date(parseInt(dateString,10));
  }

  if (date == "Invalid Date") {
      res.json({error: "Invalid Date"});
  } else {
      res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
});

app.use( (req, res, next) => {
  res.status(404);
  res.type('txt').send('Invalid endpoint. Use /api/timestamp/:date_string (date_string is optional).');
});

app.listen(port, () => console.log(`Server is running at port ${port}`));
