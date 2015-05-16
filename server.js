var app = require('./app');

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening on %s:%s', host, port);
});
