var mongoose = require('mongoose');
var configs = require('../config');
// mongoose.connect('mongodb://localhost/test');

let MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var songSchema = mongoose.Schema({
  songName: String,
  artist: String,
  lyricsUrl: String,
  apiPath: String
});

const Song = mongoose.model('Song', songSchema);

const selectAll = function(callback) {
  Song.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

const save = (songs, query, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB



  Song.find({ songName: query }, function (err, docs) {
    if (docs.length > 0) {
      Song.updateMany(songs, function (error, docs) {
        if (error) {
          cb(error)
        }
        cb(null, docs)
      });
    } else {
      Song.insertMany(songs, function (error, doc) {
        if (error) {
          cb(error)
        }
        cb(null, doc)
      });
    }
  })
}

const retrieve = Song.find({});

module.exports.selectAll = selectAll;
module.exports.save = save;
module.exports.retrieve = retrieve;