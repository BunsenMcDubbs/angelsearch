var express = require('express');
var app = express();

// set up static files
app.use('/', express.static('public/views'));
app.use(express.static('public'));

// ajax routes
app.get('/search', function (req, res) {
  console.log('search!', req.query.q);
  res.send(req.query.q);
});

// start the server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
