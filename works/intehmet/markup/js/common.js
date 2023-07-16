$(window).on('load resize', function () {
  // Main-nav
  if($(this).width() > 991) {
    $('.main-nav .dropdown-toggle').on('mouseenter', function () {
      $(this).addClass('hovered');
      $(this).parent().siblings().find('.dropdown-toggle').removeClass('hovered');
      // $(this).parent().siblings().find('.dropdown-menu').fadeOut();
    });
    $('.main-nav .dropdown').on('mouseleave',function () {
      $(this).find('.dropdown-toggle').removeClass('hovered');
    });
  }
});

$(document).ready(function () {
  // Empty links
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });
  // Main-nav mobile
  $('.main-nav-toggle').on('click', function () {
    $('.main-nav').slideToggle();
    $(this).find('i').toggleClass('d-none');
  });
  // Search-form
  $('.search-form-toggle').on('click', function () {
    $('#header-search-form').fadeIn('search-form_active');
    setTimeout(function () {
      $('#header-search-form .search-form__input').focus();
    }, 500);
  });
  $('.search-form__close').on('click', function (e) {
    e.preventDefault();
    $(this).parent().fadeOut();
  });
  $('#header-search-form .search-form__input').on('blur', function () {
    $(this).parent().fadeOut();
  });
  // Up-btn
  var upBtn = $('#up-btn');
  $(window).on('scroll', function () {
    if($(this).scrollTop() > 200) {
      upBtn.fadeIn();
    } else {
      upBtn.fadeOut();
    }
  });
  upBtn.on('click', function () {
    $("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 600);
  });

  // hs.graphicsDir = '/highslide/graphics/';
  // hs.align = 'center';
  // hs.dimmingOpacity = 0.75;
  // $('a.highslide').on('click', function () {
  //   return hs.expand(this)
  // });


  // Calculator (markup demonstration)
  $('.calculator-body__btn_calc').on('click', function (e) {
    e.preventDefault();
    var inputValue1 = parseFloat($('#calculator-body__input-1').val()),
        inputValue2 = parseFloat($('#calculator-body__input-2').val())/1000,
        inputValue3 = parseFloat($('#calculator-body__input-3').val())/1000,
        coef = 7.85,
        term,
        weight = inputValue1*inputValue2*inputValue3*coef,
        cost = weight*60 + 65;
        if(cost < 100000) {
          term = 1
        } else {
          term = 3
        }
    console.log(weight);
    console.log(cost);
    console.log(inputValue1);
    console.log(inputValue2);
    console.log(inputValue3);
    $('#calculator-body__result_weight').html(weight.toFixed(1));
    $('#calculator-body__result_cost').html(cost.toFixed(1));
    $('#calculator-body__result_term').html(term.toFixed(0));
  });
  $('.calculator-body__btn_clear').on('click', function (e) {
    e.preventDefault();
    $('.calculator-body__input').val('0');
    $('.calculator-body__result').html('0');
  });
  $('.calculator-body__submit').on('click', function (e) {
    e.preventDefault();
  })
  // Default form validation
  (function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
});

// See documentation for option details
// Toggle commented options to see effects
cssVars({
  fixNestedCalc: true,
  onlyVars: true,
  // preserve: true,
  // updateURLs: false,
  // ----------
  onlyLegacy: false
});

