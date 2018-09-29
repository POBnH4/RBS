const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/munrospotter";
const express = require('express'); //npm install express
const session = require('express-session'); //npm install express-session
const bodyParser = require('body-parser'); //npm install body-parser
const app = express();


const USERNAME_VALIDITY = new RegExp("[a-zA-Z](?=.{6,12})");
//const EMAIL_VALIDITY = new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
const PASSWORD_VALIDITY = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,20})");
//the password must contain at least one lowercase letter,
// one uppercase letter, one digit, and be between 8 and 20 characters;

// ----- - - - - - - - - - LOGIN --- - - - - - - -- - - - --  - --
var express = require('express');
var app = express();
 app.use(express.static('public'))
 app.get('/'
, function(req, res){
 res.send("Hello world! by express");
});
app.listen(8080);

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

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
