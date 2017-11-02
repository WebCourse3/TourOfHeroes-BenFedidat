var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

heroes = [
  {"id": 1, name:"superman"}, 
  {"id": 2, name:"batman"}, 
  {"id": 3, name:"green lantern"}
];
app.get('/heroes', (req, res) => {
    res.send(heroes);
});
app.get('/heroes/:id', (req, res) => {
  var hero = heroes.find(hero => hero.id == req.params.id);
  if(!hero)
    return res.status(404).send("hero not found");
  return res.send(hero);
});
app.put('/heroes/:id', (req, res) => {
  if(req.params.id != req.body.id) {
    return res.status(400).send("inconsistent id");
  }
  if(heroes.find(hero => hero.id === req.body.id)) {
    return res.status(400).send("hero already exists");
  }
  if(!req.body.name) {
    return res.status(400).send("missing name");
  }
  heroes.push({"id": req.body.id, "name": req.body.name});
  return res.send("success");
});
app.post('/heroes', (req, res) => {
  if(!req.body.id) {
    return res.status(400).send("missing id");
  }
  if(!req.body.name) {
    return res.status(400).send("missing name");
  }
  if(!heroes.find(hero => hero.id == req.body.id)) {
    heroes.push({"id": req.body.id, "name": req.body.name});
  }
  else {
    heroes.find(hero => hero.id === req.body.id).name = req.body.name;
  }
  return res.send("success");
});
app.delete('/heroes/:id', (req, res) => {
  var index = heroes.findIndex(hero => hero.id == req.params.id);
  if (index < 0) {
    return res.status(404).send("hero not found");
  }
  heroes.splice(index, 1);
  return res.send("success");
});
app.delete('/heroes', (req, res) => {
  if(!req.query.name) {
    return res.status(400).send("missing name");
  }
  var index = heroes.findIndex(hero => hero.name == req.query.name);
  if (index < 0) {
    return res.status(404).send("hero not found");
  }
  heroes.splice(index, 1);
  return res.send("success");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function () {
  console.log('Tour of Heroes')
})

module.exports = app;
