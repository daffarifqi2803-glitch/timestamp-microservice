// server.js
var express = require('express');
var app = express();

// enable CORS agar API bisa dites dari freeCodeCamp
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', function (req, res) {
  const { date } = req.params;
  let parsed;

  if (!date) {
    // parameter kosong: pakai waktu saat ini
    parsed = new Date();
  } else if (/^-?\d+$/.test(date)) {
    // hanya angka: anggap sebagai timestamp Unix dalam milidetik
    parsed = new Date(parseInt(date, 10));
  } else {
    // string tanggal biasa, misalnya "2015-12-25"
    parsed = new Date(date);
  }

  if (isNaN(parsed.getTime())) {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsed.getTime(),
    utc: parsed.toUTCString(),
  });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});