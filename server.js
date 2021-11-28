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

let uri='mongodb+srv://rabbinath:'+ process.env.PW +'@cluster0.0zmv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true});


let urlSchema=new mongoose.Schema({
  original:{type:String, required:true},
  short:Number
})
let Url=mongoose.model('Url',urlSchema)



let resObj={};
app.post('/api/shorturl',bodyParser.urlencoded({ extended: false }),function(req,res){
resObj['original_url']=req.body['url'];
let inputShort=1
Url.findOne({})
  .sort({short:'desc'})
  .exec((err,result)=>{
   if(!err &&  (result!=='undefined'|| result!==null)){
     inputShort=result.short+1
   } 
   if(!err){
     Url.findOneAndUpdate(
       {original:inputUrl},
       {original:inputUrl,short:inputShort},
       {new:true,upsert:true},
       (error,saveUrl)=>{
         if(!err){
           resObj['short_url']=saveUrl.short
           res.json(resObj)
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
