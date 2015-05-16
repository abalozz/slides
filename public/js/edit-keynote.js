(function (f) {

  f(window, document);

}(function (window, document){

  // Izquierda: 37, Arriba: 38, Derecha: 39, Abajo: 40
  var LEFT = 37;
  var UP = 38;
  var RIGHT = 39;
  var DOWN = 40;

  var slides = document.querySelectorAll('.slide');
  var slideNumber = document.querySelector('#slide-number');
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
      slideNumber.textContent = visibleSlideIndex + 1;
    }
  };

  document.querySelector('#next').addEventListener('click', function (e) {
      updateVisibleSlide(visibleSlideIndex + 1);
  });

  document.querySelector('#prev').addEventListener('click', function (e) {
      updateVisibleSlide(visibleSlideIndex - 1);
  });

}));
