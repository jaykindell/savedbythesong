const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const database = require('../database-mongo/index');

const app = express();

const TOKEN = process.env.TOKEN;

app.use(bodyParser.json());

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

//UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

// helpers //////////////////////////////////////////////////////////////////////////
const searchGenius = (term, cb) => {
  var options = {
    method: 'GET',
    url: 'http://api.genius.com/search',
    qs: { q: term },
    headers:
      {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${TOKEN}`
      }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    cb(body);
  });
}

//end helpers /////////////////////////////////////////////////////////////////////////////////

app.post('/songs', function (req, res) {
  console.log('receieved post request');
  // console.log('request for', req.body.q);
  
  let query = req.body.q
  
  searchGenius(query, (body) => {
    let songlist = JSON.parse(body);
    
    console.log('query', query);// kk
    
    let dbEntries = songlist.response.hits.map((song) => {
      // pull out // name, artist, url, api path into new object  
      return song = {
        songName: song.result.title,
        artist: song.result.primary_artist.name,
        lyricsUrl: song.result.url,
        apiPath: song.result.api_path
      };
    });
    // console.log('db entries', dbEntries);
    const matches = [];
    let queryy = query.toLowerCase();
    if (dbEntries.length) {
      console.log('selecting');
      for (let i = 0; i < dbEntries.length; i++) {
        let quarry = dbEntries[i].songName.toLowerCase();
        if (queryy === quarry){
          matches.push(dbEntries[i]);
        }
      }
      database.save(matches, query, (err, results) => {
        if (err) console.log(err);
        else {
          res.send(results);
        }
        })
    } else {
      console.log('no songs to add');
    }
  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
  });
});
app.get('/songs', function (req, res) {
  database.retrieve.exec(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(process.env.PORT, function() {
  console.log('listening on port 3000!');
});
