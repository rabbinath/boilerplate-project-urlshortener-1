require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

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
resObj['original_url']=req.originalUrl();
resObj['short_url']=req.shorturl();

res.json(resObj);

});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
