$(function () {
  $('.jcarousel').jcarousel({
    transitions: true,
    animation: 'slow'
  });

  $('.jcarousel-prev').click(function () {
    $('.jcarousel').jcarousel('scroll', '-=1');
  });

  $('.jcarousel-next').click(function () {
    $('.jcarousel').jcarousel('scroll', '+=1');
  });
});

$(window).load(function () {
  var slider = $('#slider');
  if (slider.length) {
    slider.nivoSlider({
      effect: 'fade',
      controlNav: false,
      afterChange: function () {
        var activeSlide = $('.nivo-main-image').attr('src').split('\\').pop().split('/').pop().split('.').shift();
        var sliderBox = $('.slider');
        sliderBox[0].className = 'slider';
        sliderBox.addClass(activeSlide + '-bgr');
      }
    });
  }
});
