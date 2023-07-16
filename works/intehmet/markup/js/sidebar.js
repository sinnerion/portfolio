$(document).ready(function () {
  // Sidebar-news/articles
  $('#sidebar-block-carousel_1').slick({
    slidesToShow: 1,
    arrows: true,
    appendArrows: $('#sidebar-block-arrows_1'),
  });

  $('#sidebar-block-carousel_2').slick({
    slidesToShow: 1,
    arrows: true,
    appendArrows: $('#sidebar-block-arrows_2'),
  });
});