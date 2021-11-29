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
let inputUrl=req.body['url'];
let regx = "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=])"
//let regx="/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi"
let urlRegex=new RegExp(regx)
if(!inputUrl.match(urlRegex)){
  res.json({error:'invalid url'})
  return 
}

resObj['original_url']=inputUrl;
let inputShort=1
Url.findOne({})
  .sort({short:'desc'})
  .exec((err,result)=>{
   if(!err &&  result!==undefined){
     inputShort=result.short+1
   } 
   if(!err){
     Url.findOneAndUpdate(
       {original:inputUrl},
       {original:inputUrl,short:inputShort},
       {new:true,upsert:true},
       (error,saveUrl)=>{
         if(!error){
           resObj['short_url']=saveUrl.short
           res.json(resObj)
         }
       }
     )
   }
  }
)
})

app.get('/api/shorturl/:short_url', function(req, res) {
  let shortURL=req.params.short_url;
  Url.findOne(
    {short:shortURL}
  ,(err,reslt)=>{
      if (err) throw err;

 //res.json(reslt)
  //res.writeHead(301, { Location: '/api/shorturl/'+reslt.original });
  res.writeHead(301, { Location: reslt.original });
  res.end()

})
})


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
