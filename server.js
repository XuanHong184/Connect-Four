var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/connectFour');

var playerScoreSchema = mongoose.Schema({
  name: String,
  score: String
});

var Player = mongoose.model('Player', playerScoreSchema);

var app = express();

app.use(express.static(__dirname + '/client/dist'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/scores', function(req, res) {
  var data = '';
  console.log(req.method, req.path);
  scores.GET(res);
});

app.post('/scores', function(req, res) {
  var data = '';
  console.log(req.method, req.path);
  req.on('data', function(chunk) {
    data += chunk.toString();
  })
  req.on('end', function() {
    console.log(data);
    scores.POST(res, data);
  });
});

app.listen(process.env.PORT || 3000);

var scores = {
  GET: function(res) {
    var db = mongoose.connection;
    db.once('open', function() {
      Player.find(function(err, player) {
        if(err) throw err;
        console.log('Responded with scores', player);
        res.type = 'text';
        res.statusCode = 200;
        res.end(JSON.stringify(player));
        db.close();
      })
    })
  },
  POST: function(res, playerColor) {
    var db = mongoose.connection;
    db.once('open', function() {
      var playerScoreSchema = mongoose.Schema({
        name: String,
        score: String
      });
      Player.findOne({name: playerColor}, function(err, player) {
        if(err) throw err;
        player.score++;
        player.save(function(err) {
          if(err) throw err;
          console.log('Updated Player');
          db.close();
          res.end('Added score');
        });
      })
    })
  }
}
