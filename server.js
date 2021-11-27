require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let resObj={};
app.post('/api/shorturl',function(req,res){
resObj['original_url']=req.body.originalUrl;
resObj['short_url']=req.body.shorturl;

res.json(resObj);

});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
