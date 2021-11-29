const express = require('express');
const app = express();
const mongo = require('mongodb');
const mongoose = require('mongoose')
const multer = require('multer')
const moment = require('moment-timezone')
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

// Use connect method to connect to the server
mongoose.connect('mongodb+srv://John:a4a5gynn@cluster0-jzbmu.mongodb.net/test',{useNewUrlParser: true});
var blogSchema = new Schema({
    bday:  String,
    room:  String,
    entertime: String,
    anetime: String,
    doctortime: String
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
app.get('/search',(req,res)=>{
	Project.find({},function(err,task){
		if (err)
			res.send(err);
    //task.bday = dateTaipei
		res.json(task)
    
	}).sort({_id:-1})//.pretty()
})
app.get('/search/:bday',(req,res)=>{
  var result = req.params.bday
  Project.findOne({bday:result},(err,task)=>{
    if (err)
      res.send(err);
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
      res.send('<a href="localhost:4001/upload.html">存檔成功,按此回上一頁</a>')

  })
})
app.put('/search/:bday',(req,res)=>{
  Project.findOneAndUpdate({bday: req.params.bday}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
})
app.post('/search/delete',(req,res)=>{
  var result = req.body._id
  Project.deleteOne({_id:result},(err,task)=>{
    if (err)
      res.send(err);
    res.send('<a href="localhost:4001/search.html">刪除成功,按此回上一頁</a>')
  })
})
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
