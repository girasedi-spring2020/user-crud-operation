var express = require('express');
var app = express(); 
var bodyParser=require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/loginDB', { useNewUrlParser: true }); 
var db=mongoose.connection; 
var Sample = require('./model/sample');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function(req, res) {
  res.sendfile('./public/views/index.html'); // load our public/index.html file
});

app.post('/user/create', function(req, res) {
  console.log("hello");
  var login = new Sample(req.body);
  login.save(function(err,n){
      if (err)
          console.log('saving failed');
      console.log('saved '+ n.email);
  });
});

app.get('/user/getAll', function(req, res) {

  Sample.find(function(err, data) {
      // if there is an error retrieving, send the error.
                      // nothing after res.send(err) will execute
      if (err)
          res.send(err);
      //console.log('data', data);
      res.json(data);
  });
});

app.post('/user/delete', function(req, res) {
  //var deleteEntry = new Sample(req.body);
  var id =req.body.pwd.trim();
  console.log(id);
  Sample.deleteOne({pwd: id}, function(err, data) {
      // if there is an error retrieving, send the error.
                      // nothing after res.send(err) will execute
      if (err)
          res.send(err);
      //console.log('data', data);
      res.json("success");
  });
});


app.post('/user/edit', function(req, res) {
  console.log("hello");
  var id = req.body._id.trim();
  console.log(id);
  var email = req.body.email.trim();
  var pwd = req.body.pwd.trim();
  Sample.update({_id:id},{$set:{email:email,pwd:pwd}},{multi:false,new:false},function(err,data){
    if (err)
    console.log('saving failed');
console.log('saved ');
  })
});