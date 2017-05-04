$(document).ready(function () {
  // Progress bar for summary
  $('.skillbar').each(function () {
    $(this).find('.skillbar-bar').animate({
      width: $(this).attr('data-percent')
    }, 2500);
  });

  // Smooth transition of sections
  $("a.scrollto").click(function () {
    var elementClick = $(this).attr("href")
    var destination = $(elementClick).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
    return false;
  });

  // Summary list-heading border-top
  var sWidth = $(window).width();
  if (sWidth < 992) {
    $('p.list-heading').addClass('summary-title');
  } else {
    $('.list-heading.summary-title').removeClass('summary-title');
  }

  // Example-full-img
  $('.example-preview').on('click', function () {
    $('body').find('.hidden').removeClass('hidden');
  });
  $('.example-full-img').on('click', function () {
    $(this).addClass('hidden');
  });

  // Portfolio more
  if($(window).width() < 768) {
    $('.portfolio-hidden').hide();
  }
  $('.portfolio_more-btn').click(function () {
    $('.portfolio-hidden').slideDown(300);
    $('.portfolio_less-btn').removeClass('hidden');
    $('.portfolio_more-btn').addClass('hidden');
  });
  $('.portfolio_less-btn').click(function () {
    $('.portfolio-hidden').slideUp(150);
    $('.portfolio_more-btn').removeClass('hidden');
    $('.portfolio_less-btn').addClass('hidden');
  });
});

