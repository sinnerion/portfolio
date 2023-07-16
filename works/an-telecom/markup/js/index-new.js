$(document).ready(function () {
  /* empty links */
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

  /* top-banner */
  $('.top-banner-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  /* header mobile */
  var mainNavToggle = $('.main-nav-toggle'),
      contactsBlockToggle = $('.contacts-block-toggle'),
      searchBlockToggle = $('.search-block-toggle');

  mainNavToggle.on('click', function () {
    // $(this).toggleClass('main-nav-toggle_active');
  });

  $('.main-nav__inner').hcOffcanvasNav({
    disableAt: 1200,
    customToggle: mainNavToggle,
    navTitle: '',
    levelTitles: true,
    labelBack: 'Назад',
    levelTitleAsBack: true
  });

  /* auth-block */
  $('.auth-block__btn').on('click', function () {
    $('.new-header').toggleClass('new-header_active');
    $('.auth-form_header').fadeToggle();
    if($(window).width() < 1200) {
      $('.contacts-block_header').slideUp();
      $('.search-block_header').fadeOut();
    }
  });
  contactsBlockToggle.on('click', function () {
    $('.contacts-block_header').slideToggle();
    if($(window).width() < 1200) {
      $('.auth-form_header').fadeOut();
      $('.search-block_header').fadeOut();
    }
  });
  searchBlockToggle.on('click', function () {
    $('.search-block_header').fadeToggle();
    $('.search-block_header .search-form__input').focus();
    if($(window).width() < 1200) {
      $('.auth-form_header').fadeOut();
      $('.contacts-block_header').slideUp();
    }
  });

  /* Up-btn */
  var upBtn = $('#up-btn');
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      upBtn.fadeIn();
    } else {
      upBtn.fadeOut();
    }
  });
  upBtn.on('click', function () {
    $("html:not(:animated),body:not(:animated)").animate({
      scrollTop: 0
    }, 600);
  });

  /* input-mask */
  $('.form-control[type="tel"]').mask('+7-999-999-99-99');

  /* auth-form */
  $('#authFormRegistrationPassword, #authFormRegistrationConfirmPassword').on('keyup', function () {
    var authFormRegistrationPassword = $('#authFormRegistrationPassword'),
        authFormRegistrationConfirmPassword = $('#authFormRegistrationConfirmPassword');
    if(authFormRegistrationPassword.val() !== '' || authFormRegistrationConfirmPassword.val() !== '') {
      if (authFormRegistrationPassword.val() !== authFormRegistrationConfirmPassword.val()) {
        $('#authFormConfirmMessage').slideDown(500).html('Пароли не совпадают');
        $('#authFormRegistrationPassword, #authFormRegistrationConfirmPassword').addClass('form-control_invalid');
      } else {
        $('#authFormConfirmMessage').slideUp(500).html('');
        $('#authFormRegistrationPassword, #authFormRegistrationConfirmPassword').removeClass('form-control_invalid').addClass('form-control_valid');
      }
    } else {
      $('#authFormConfirmMessage').slideUp(500).html('');
      $('#authFormRegistrationPassword, #authFormRegistrationConfirmPassword').removeClass('form-control_invalid').removeClass('form-control_valid');
    }
  });
  
  /* Search-typing */
  var searchInput = $('.search-form__input');
  $('.search-form').append('<span class="search__cover-span"></span>');
  var searchInputCoverSpan = $('.search__cover-span');
  setTimeout(function () {
    searchInputCoverSpan.css('background', '#fff')
  }, 9900);
  setTimeout(function () {
    searchInputCoverSpan.each(function () {
      $(this).typeIt({
        speed: 200,
        autoStart: true,
        loop: true,
        loopDelay: 2000,
      })
          .tiType('IP-телефония').tiPause(1000).tiDelete()
          .tiType('Номера 8-800').tiPause(1000).tiDelete()
          .tiType('Поиск');
    });
  }, 10000);
  searchInputCoverSpan.on('click', function () {
    $(this).addClass('d-none');
    $(this).siblings('.search-form__input').focus();
  });
  searchInput.on('blur', function () {
    if ($(this).val() === '') {
      $(this).siblings('.search__cover-span').removeClass('d-none');
      searchInput.val('');
    }
  });
  /* Search-typing END */
});