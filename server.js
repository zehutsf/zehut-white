var express = require('express');
var bodyParser = require('body-parser');
var getConnection = require('./getConnection');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/build'))
app.use(bodyParser.json());

app.post('/api/rsvp', function(req, res) {
  var email = req.body.email;
  if (!email) {
    return res.json({error: true});
  }

  var info = {
    email: email,
    createdat: Date.now() / 1000
  };

  getConnection(function(err, connection) {
    if (err) {
      return res.json({error: true});
    }

    connection.query('INSERT INTO emailrsvp SET ?', info, function(err) {
      if (err) {
        console.log('Error inserting RSVP record: ' + err);
        res.json({error: true});
      } else {
        res.json({success: true});
      }

      connection.release();
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('Running at localhost:' + app.get('port'));
});


