const express = require('express');
const app = express();
const mongo = require('mongodb');
const mongoose = require('mongoose')
const multer = require('multer')
const moment = require('moment-timezone')
const methodOverride = require('method-override')
var bodyParser = require('body-parser')
var Schema = mongoose.Schema;
var upload = multer()
//const dateTaipei = moment.tz("Asia/Taipei").format("YYYY/MM/DD");

const PORT = process.env.PORT || 4001;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(methodOverride('_method'))
//local:用此mongoose.connect('mongodb://localhost:27017/vghks',{user:'root', pass:'qeasdwsxzc!@3'},{useNewUrlParser: true});
//cloud:用此mongoose.connect('mongodb+srv://John:a4a5gynn@cluster0-jzbmu.mongodb.net/test',{useNewUrlParser: true});
// Use connect method to connect to the server
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true});
    var blogSchema = new Schema({
    bday:  String,//{type: Date, default: Date.now},
    room:  String,
    entertime: String,
    anetime: String,
    doctortime:  String,
    interval: String
  })
var Project = mongoose.model('Project', blogSchema);
//var doc2 = new Project({title:'nodejs',author:'christiene',body:'somebody'})
/*doc2.save(function (err) {
  if (err) throw err;
  console.log('save successfully')
  // saved!
});
Project.deleteOne({title:'ruby'},function (err) {
  if (err) throw err;
  console.log('save3 successfully')
  // saved!
});  */
// Find all data in the Todo collection
Project.find(function (err, project) {
  if (err) return console.error(err);
  console.log(project)
});

//Model.findOneAndUpdate([conditions], [update], [options], [callback])
// callback function to avoid duplicating it all over


app.get('/search',(req,res)=>{
  Project.find({},function(err,task){
    if (err)
      res.send(err);
      
      //task.bday = dateTaipei
      res.json(task)
  
  }).sort({_id:-1})
})
app.post('/b',(req,res)=>{
  var result = { bday:req.body.bday,room: req.body.room ,entertime: req.body.entertime, anetime: req.body.anetime, doctortime: req.body.doctortime};
 
  Project.find( { $or: [{bday:req.body.bday},{room: req.body.room},{entertime: req.body.entertime}, {anetime: req.body.anetime}, {doctortime: req.body.doctortime}]},(err,task)=>{
    if (err)
      res.send(err);
      //res.send('<a href=http://localhost:4001/search2.html>搜尋成功,按此回上一頁</a>');
    res.json(task)
  })
})
app.post('/search', upload.array(),(req,res)=>{
  var result = new Project(req.body)
  //result.bday = dateTaipei

  result.save(function(err,task){
    if (err)
      res.send(err);
     
      //res.send(task)
      res.send('<a href="http://localhost:4001/search.html">存檔成功,按此看資料結果</a>')

  })
})
app.post('/a',(req,res)=>{
const filter =  req.body._id;
const update = { bday:req.body.bday ,room: req.body.room ,entertime: req.body.entertime, anetime: req.body.anetime, doctortime: req.body.doctortime};

  Project.findByIdAndUpdate(filter, update, function(err, task) {
    if (err)
      res.send(err);
    res.send('<a href=http://localhost:4001/search.html>修改成功,按此回上一頁</a>');
  });
})
app.post('/search/delete',(req,res)=>{
  var result = req.body._id
  Project.deleteOne({_id:result},(err,task)=>{
    if (err)
      res.send(err);
    res.send('<a href=http://localhost:4001/search.html>刪除成功,按此回上一頁</a>')
  })
})
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
