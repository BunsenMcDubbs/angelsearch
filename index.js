var express = require('express');
var app = express();

// set up static files
app.use('/', express.static('public/views'));
app.use(express.static('public'));

// controllers
var AngelSearchCtrl = require('./controllers/angelsearch');

// ajax routes
app.get('/search', function (req, res) {
  var query = req.query.q;
  console.log('search!', query);
  AngelSearchCtrl.search(query)
    .then(function(results) {
      res.send({
        results: results,
      });
    });
});

// start the server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
