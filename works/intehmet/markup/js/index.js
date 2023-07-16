$(document).ready(function () {
  // Main-carousel
  $('.main-carousel').slick({
    slidesToShow: 1,
    infinite: false,
    autoplay: true,
    fade: true,
    cssEase: 'linear',
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
        }
      }
    ]
  });
  // Partners-carousel
  $('.partners-carousel').slick({
    slidesToShow: 5,
    infinite: true,
    dots: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });
});


