$(document).ready(function () {

  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Companies filter
  $('.companies-filter_toggle').click(function () {
    $('.companies-filter .nav').toggleClass('companies-filter_nav-active')
  });

  $('.companies-filter .nav-link').click(function () {
    var thisId = $(this).attr('data-id');
    $('.companies-filter_sub-nav').removeClass('open');
    $('#' + thisId).addClass('open');
  });
  $('.companies-filter').mouseleave(function () {
    $('.companies-filter_sub-nav').removeClass('open');
  });

  // Companies rating
  $('.star-rating__input').click(function () {
    var thisValue = $(this).attr('value');
    $(this).parent().parent().parent().find('.companies-block_rating-value i').html(thisValue);
  });

  // Company tabs
  $('#companyTab a').click(function () {
    $(this).tab('show');
  });

  $('.tab-profile-form_password span').click(function () {
    $(this).parent().find('input').focus();
  });

  $('.upload-form_btn').click(function () {
    $(this).next('input').trigger('click');
  });

  // Placeholders
  $('.field-wrapper').click(function () {
    $(this).find('span').hide();
  });

});