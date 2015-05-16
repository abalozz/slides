process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
express.io = io;
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')();
var session = require('express-session');
var csrf = require('csurf');
var passport = require('passport');
var RedisStore = require('connect-redis')(session);
var mongoose = require('mongoose');

var config = require('./config');
var routes = require('./routes/index');
var ioRoutes = require('./routes/io');

var sessionStore = session({
  resave: true,
  saveUninitialized: true,
  store: new RedisStore(),
  secret: config.REDIS_SECRET
});

mongoose.connect(config.MONGO_DATABASE);

require('./config/passport')();


// Vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser);
app.use(sessionStore);
app.use(passport.initialize());
app.use(passport.session());
app.use(csrf());

app.use(function (req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(function (req, res, next) {
  res.locals.auth = req.auth = !!req.user;
  res.locals.guest = req.guest = !req.user;
  next();
});

// Rutas
app.use(routes);

// Socket.io
io.use(function (socket, next) {
  var req = socket.handshake;
  var res = {};
  cookieParser(req, res, function(err) {
    if (err) { return next(err); }
    sessionStore(req, res, next);
  });
});
var User = require('./models/user');
io.use(function (socket, next) {
  if (!socket.handshake.session.passport) { return next(); }

  User.findOne({
    _id: socket.handshake.session.passport.user
  }, function (err, user) {
    if (err) { return next(err); }
    socket.handshake.session.user = user;
    return next();
  });
});
io.on('connection', ioRoutes);

// Páginas no encontradas
app.use(function (req, res, next) {
  res
    .status(404)
    .render('error', {
      message: 'No hemos podido encontrar esta página :('
    });
});

// Errores en desarrollo
if (app.get('env') === 'development') {
  var errorhandler = require('errorhandler');
  app.use(errorhandler());
}

// Errores en producción
app.use(function(err, req, res, next) {
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});


module.exports = http;
