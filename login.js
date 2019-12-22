var express = require('express');
var bodyParser = require('body-parser');
var sessions = require('express-session');

var session;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(sessions({
 secret: 'rkskekfkakqktk',//가나다라마바사
 resave: false,
 saveUninitialized: true
}))

app.get('/',function(req,res){
 res.send('첫 페이지');
});

app.get('/main',function(req,res){
 res.send('메인 페이지');
});

app.get('/login',function(req,res){
 session = req.session;
 if(session.uniqueID){
   res.redirect('/redirects');
 }
 res.sendFile('./login.html', {root: __dirname});
});

app.post('/login', function(req,res){
 //res.end(JSON.stringify(req.body));
 session = req.session;
 if(session.uniqueID){
   res.redirect('/redirects');
 }
 if(req.body.username == 'admin' && req.body.password == 'admin'){
   session.uniqueID = req.body.username;
 }
 res.redirect('/redirects');
});

app.get('/logout',function(req,res){
 req.session.destroy();
});

app.get('/redirects',function(req,res){
   session = req.session;
 if(session.uniqueID){
   console.log(session.uniqueID);
   // res.redirect('/admin'); ==
   res.redirect('/');
 } else{
   res.end('who are you?? <a href="/logout">KILL SESSION</a>');
 }
});

app.listen(7777,function(){
 console.log('Listening at Port 5000');
});