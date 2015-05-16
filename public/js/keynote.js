(function (f) {

  f(window, document);

}(function (window, document){

  // Izquierda: 37, Arriba: 38, Derecha: 39, Abajo: 40
  var LEFT = 37;
  var UP = 38;
  var RIGHT = 39;
  var DOWN = 40;

  var slides = document.querySelectorAll('.slide');
  var count = slides.length;
  var maximumIndex = count - 1;
  var visibleSlide = slides[0];
  var visibleSlideIndex = 0;

  var updateVisibleSlide = function (newIndex) {
    if (newIndex >= 0 && newIndex <= maximumIndex && newIndex !== visibleSlideIndex) {
      visibleSlideIndex = newIndex;
      visibleSlide.classList.remove('visible');
      visibleSlide = slides[visibleSlideIndex];
      visibleSlide.classList.add('visible');
    }
  };

  window.addEventListener('keydown', function (e) {
    if (e.which === RIGHT) {
      updateVisibleSlide(visibleSlideIndex + 1);
    } else if (e.which === LEFT) {
      updateVisibleSlide(visibleSlideIndex - 1);
    }

  });

}));
