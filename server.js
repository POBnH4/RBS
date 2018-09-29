
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/users";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const USER_DOES_NOT_EXIST = 0, USER_EXISTS = 1;
const USERNAME_VALIDITY = new RegExp("[a-zA-Z](?=.{6,12})");
const PASSWORD_VALIDITY = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,20})");
//the password must contain at least one lowercase letter,
// one uppercase letter, one digit, and be between 8 and 20 characters;

// ----- - - - - - - - - - LOGIN --- - - - - - - -- - - - --  - --
 app.use(express.static('public'))
 app.get('/', function(req, res){
 res.send("Hello world! by express");
});
app.listen(8080);
var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening....');
});

app.get('/', function(req,res) {
  res.render('index')
});

app.post('/userDetails', function(req,res) {
  // db.collection("users").findOne({"email": req.body.email, "password" : req.body.password}, function(err, result) {
  //   if (err) throw err;
  //   console.log(result.name lo);
  //   db.close();
  // });
    db.collection('users').count({"email": req.body.email, "password" : req.body.password}).then((occurences) => {
         if(occurences >= USER_EXISTS){
             req.session.loggedin = true;
             console.log(req.body.email + ' logged in');
             // login in information....
         }else{
           console.log('You username or password is incorrect');
         }
    });
});

//- - - -- - - -- - - - REGISTER  - - - - - - - - - - - - - -  --

       app.post('/registerDetails', function (req,res){
         db.collection('users').count({"username":req.body.username, "password": req.body.password}).then((occurrences) => {
             if(occurrences == USER_DOES_NOT_EXIST){

               var correctUsername = false,correctPassword = false;
               if(USERNAME_VALIDITY.test(req.body.username)){
                 correctUsername = true;
               }else{
                 console.log('Username should be: between 6 and 18 characters(only letters and numbers, no special characters)');
               }

               if(PASSWORD_VALIDITY.test(req.body.password)){
                correctPassword = true;
               }else{
                 console.log("Password should contain: 1 lowercase,1 uppercase, 1 digit, between 8 and 20 characters");
               }

               if(correctUsername && correctPassword){
                 var info = {
                   "username": req.body.username,
                   "email": req.body.email,
                   "name":req.body.name,
                   "password": req.body.password
                 };
                 db.collection('users').save(info, function(err, result) {
                   if (err) throw err;
                   console.log(req.body.username + ' saved to database');
                   res.redirect('/');
                 })
               }

            }else{
              console.log("User already exists with that email!");
              res.redirect('/');
            }
          });
        });

// ----- - - - - - - - - - LOGIN --- - - - - - - -- - - - --  - --

app.post('/userDetails', function(req,res) {
  // db.collection("users").findOne({"email": req.body.email, "password" : req.body.password}, function(err, result) {
  //   if (err) throw err;
  //   console.log(result.name lo);
  //   db.close();
  // });
    db.collection('users').count({"username": req.body.username, "password" : req.body.password}).then((occurrences) => {
         if(occurrences >= USER_EXISTS){
             req.session.loggedin = true;
             console.log(req.body.username + ' logged in');
             // login in information....
         }else{
           console.log('You username or password is incorrect');
         }
    });
});


//- - - - - -  -- - - -  - -LOGOUT - - -- - - - -- - - - - - -

app.get('/logout', function(req,res){
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/')
});
//- - - - - -  -- - - -  - -LOGOUT - - -- - - - -- - - - - - -

app.get('/logout', function(req,res){
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/')
});

var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening....');
});

app.get('/', function(req,res) {
  res.render('pages/index')
});
//tell express to use sessions
app.use(session({secret: 'example'}));


// Node.js body parsing middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

//- - - - - - - - - - -  Get the modal - - - - - - - -   - - - - - - - - - - - -
