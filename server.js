var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

db.connect(function(err) {
  if (err) {
    console.error('Database connection error: ' + err.stack);
    return;
  }

  console.log('Database connected with id ' + db.threadId);
});

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

  db.query('INSERT INTO emailrsvp SET ?', info, function(err) {
    if (err) {
      console.log('Error inserting RSVP record: ' + err);
      return res.json({error: true});
    }

    return res.json({success: true});
  });
});

app.listen(app.get('port'), function() {
  console.log('Running at localhost:' + app.get('port'));
});


