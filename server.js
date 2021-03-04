console.log(`
  ____ _  ___  _
 / ___/ |/ _ \\| |_ _ __ __ _  ___ ___
| |   | | (_) | __| '__/ _\` |/ __/ _ \\
| |___| |\\__, | |_| | | (_| | (_|  __/
 \\____|_|  /_/ \\__|_|  \\__,_|\\___\\___|
`);


const mongoose = require('mongoose');
const express = require('express')
const app = express()
var path = require('path');
const port = 4000


const log_folder = `logs`
const url = `http://0.0.0.0:4000/`
var opn = require('opn');
var _ = require('underscore');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// serve react files
app.use(express.static(path.join(__dirname, 'build')));

// Connect to mongodb
mongoose.connect('mongodb+srv://user:pLpy6uTQY2RFKNJt@cluster0-i1an0.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, '[ERROR] MongoDB connection error:'));
db.once('open', function() {
    console.log("MongoDB connected");
});
mongoose.set('useFindAndModify', false); // get rid of deprecation warning


//
// MongoDB schemas
var Exposure = mongoose.model('Exposures', new mongoose.Schema({
  date: String,
  randomid: {
      type: String,
      unique: true
  }
}));

// watch log folder and insert new logs into database
var chokidar = require('chokidar');
const readline = require('readline');
const fs = require('fs');
var watcher = chokidar.watch(log_folder, {ignored: /^\./, persistent: true});

function read_logs(path)  {
      const rl = readline.createInterface({
        input: fs.createReadStream(path)
      });

      rl.on('line', (line) => {
          var [timestamp, randomid] = line.split('#');

          Exposure.create({
              date: timestamp,
              randomid: randomid,
          });
      });
}

watcher
  .on('add', function(path) {
      console.log('File', path, 'has been added');
      read_logs(path);
  })
  .on('change', function(path) {
      console.log('File', path, 'has been changed');
      read_logs(path);
  })
  .on('error', function(error) {console.error('Error happened', error);})


app.post('/checklogin', (req, res) => {
    if (req.body.username === "admin" && req.body.password === "admin") {
    res.json("login ok");
    }
    else {
    res.json("bad login");
    }
})

app.post('/searchids', (req, res) => {

    Exposure.find({}, 'randomid', function (err, exposures) {
        if (err) return handleError(err);

        var randomids = _.map(exposures, function (element) {
          return element.randomid;
        });


        res.json(randomids);
    }).select("randomid")
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

app.listen(port, () => {
    console.log(`backend server listening on ${url}`)
    opn("http://localhost:4000/");
})

