var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/connectFour');

var playerScoreSchema = mongoose.Schema({
  name: String,
  score: String
});

module.exports = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   var playerScoreSchema = mongoose.Schema({
//     name: String,
//     score: String
//   });
//   var Player = mongoose.model('Player', playerScoreSchema);
//   Player.find(function(err, player) {
//     if(err) throw err;
//     console.log(player);
//   });
//   // var red = new Player({name: 'red', score: '0'});
//   // var black = new Player({name: 'black', score: '0'});
//   // red.save(function(err, red) {
//   //   if(err) throw err;
//   //   console.log(red);
//   // })
//   // black.save(function(err, black) {
//   //   if(err) throw err;
//   //   console.log(black);
//   // })
// });
