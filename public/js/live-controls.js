;(function (f) {

  f(window, document);

}(function (window, document){

  var socket = io();
  var keynoteId = document.querySelector('#keynoteId').value;
  var isSpeaker = document.querySelector('#isSpeaker').value;
  var totalSlides = document.querySelector('#totalSlides').value;

  var visibleSlide = document.querySelector('#visibleSlide');

  // Izquierda: 37, Arriba: 38, Derecha: 39, Abajo: 40
  var LEFT = 37;
  var UP = 38;
  var RIGHT = 39;
  var DOWN = 40;

  var count = totalSlides;
  var maximumIndex = count - 1;
  var visibleSlideIndex = 0;

  var updateVisibleSlide = function (newIndex) {
    if (newIndex >= 0 && newIndex <= maximumIndex && newIndex !== visibleSlideIndex) {
      visibleSlideIndex = newIndex;
      visibleSlide.innerHTML = visibleSlideIndex + 1;
    }
  };

  socket.on('connect', function () {
    socket.emit('connect to room', keynoteId);
  });

  socket.on('change to slide', function (slide) {
    console.log('cambiando a la slide número', slide);
    updateVisibleSlide(slide);
  });

  if (isSpeaker === '1') {
    window.addEventListener('keydown', function (e) {
      if (e.which === RIGHT) {
        updateVisibleSlide(visibleSlideIndex + 1);
        socket.emit('change to slide', visibleSlideIndex);
      } else if (e.which === LEFT) {
        updateVisibleSlide(visibleSlideIndex - 1);
        socket.emit('change to slide', visibleSlideIndex);
      }
    });

    document.querySelector('#next').addEventListener('click', function (e) {
        updateVisibleSlide(visibleSlideIndex + 1);
        socket.emit('change to slide', visibleSlideIndex);
    });

    document.querySelector('#prev').addEventListener('click', function (e) {
        updateVisibleSlide(visibleSlideIndex - 1);
        socket.emit('change to slide', visibleSlideIndex);
    });
  }

}));
