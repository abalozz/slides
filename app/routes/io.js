var express = require('express');
var io = express.io;
var Keynote = require('../models/keynote');

module.exports = function (socket) {

  var roomName = '';
  var isSpeaker = false;

  socket.on('disconnect', function(){
    console.log('Usuario desconectado');
  });

  socket.on('connect to room', function (keynoteId) {
    socket.join(keynoteId);
    roomName = keynoteId;
    console.log('usuario conectado a la sala ', roomName);

    Keynote.findById(keynoteId, function (err, keynote) {
      if (err) {
        console.error('Ha ocurrido un error al seleccionar la keynote', err);
        return;
      }
      if (socket.handshake.session.passport &&
          keynote.user.toString() === socket.handshake.session.passport.user) {
        isSpeaker = true;
      }
      console.log('isSpeaker', isSpeaker);
    });
  });

  socket.on('change to slide', function (slide) {
    if (isSpeaker) {
      io.to(roomName).emit('change to slide', slide);
    }
  });

};
