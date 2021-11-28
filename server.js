require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

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

let urlSchema=new mongoose.Schema({
  orginal:{type:String, required:true},
  short:Number
})
let Url=mongoose.model('Url',urlSchema)

let url='mongodb+srv://rabbinath:'+process.env.PW+'@cluster0.0zmv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

let resObj={};
app.post('/api/shorturl',bodyParser.urlencoded({ extended: false }),function(req,res){
resObj['original_url']=req.body['url'];
let inputShort=1
Url.findOne({})
  .sort({short:'desc'})
  .exec((error,result)=>{
   if(!error && result!=undefinded){
     inputShort=result.short+1
   } 
   if(!error){
     Url.FindOneAndUpdate(
       {original:inputUrl},
       {original:inputUrl,short:inputShort},
       {new:true,upsert:true},
       (error,saveUrl)=>{
         if(!error){
           resObj['short_url']=saveUrl.short
         }
       }
     )
   }
  }
)
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
