$(document).ready(function () {
  /* Scroll-to links */
  $('a.scroll-to').on('click', function (e) {
    e.preventDefault();
    var anchor = $(this).attr('href');
    $('html, body')
        .stop()
        .animate({
      scrollTop: $(anchor).offset().top - 75
    }, 800)
  });
  /* Scroll-to links END*/

  /* Clients-carousel */
  var clientsCarousel = $('.clients-carousel');
  if(clientsCarousel.length > 0) {
    clientsCarousel.slick({
      mobileFirst: true,
      slidesToShow: 1,
      dots: false,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2500,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
          }
        },
      ]
    });
  }
  /* Clients-carousel END */

  /* ---------Calculator--------- */
  var numbersCalculatorSeriesInput = $('.numbers-calculator-series-carousel__item .checkbox-block__input'),
      numbersCalculatorSearchInput =  $('#numbersCalculatorSearchInput'),
      numbersCalculatorSearchPrefix =  $('#numbersCalculatorSearchPrefix'),
      numbersCalculatorSeriesInputValue = '301';
  /* Custom select */
  var selectPrefix = '8-800';
  $('.select').on('click','.placeholder',function(){
    var parent = $(this).closest('.select');
    if ( !parent.hasClass('is-open')){
      parent.addClass('is-open');
      $('.select.is-open').not(parent).removeClass('is-open');
    } else{
      parent.removeClass('is-open');
    }
  }).on('click','ul>li',function(){
    var thisParent = $(this).closest('.select'),
        thisParentId = thisParent.attr('id');
    thisParent.removeClass('is-open').find('.placeholder').html( $(this).html() );
    thisParent.removeClass('is-open').find('.placeholder').attr( 'title', $(this).html() );
    thisParent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );
    /* Number calculator prefixes */
    if(thisParentId === 'selectNumbersPrefix') {
      selectPrefix = $(this).attr('data-value');
      numbersCalculatorSearchPrefix.val(selectPrefix);
      // console.log('selectNumbersPrefix - '+selectPrefix);
    }
    /* Contacts addresses */
    else if (thisParentId === 'selectContactsCity') {
      var targetId = '#contactsVariantsAddress_'+$(this).attr('data-value'),
          targetBlock = $('#contactsVariantsAddress_'+$(this).attr('data-value')),
          targetBlockSiblings = $('.contacts-variants-address:not('+targetId+')');
      targetBlockSiblings.slideUp(600);
      targetBlock.slideDown(600);
      setTimeout(function () {
        targetBlockSiblings.removeClass('contacts-variants-address_active');
      }, 100);
      setTimeout(function () {
        targetBlock.addClass('contacts-variants-address_active');
      }, 200);
    }
    /* Contacts addresses END */
  });
  /* Custom select END */
  var numbersCalculatorSeriesCarousel = $('.numbers-calculator-series-carousel');
  if(numbersCalculatorSeriesCarousel.length > 0) {
    numbersCalculatorSeriesCarousel.slick({
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 12,
            slidesToScroll: 3,
          }
        }
      ]
    });
  }
  numbersCalculatorSearchInput
      .mask('XXX-XX-XX', {
        translation: {
          'X': {
            pattern: /[0-9]/,
            optional: true
          }
        }
      });

  numbersCalculatorSeriesInput.on('change', function () {
    numbersCalculatorSeriesInputValue = $(this).next('.checkbox-block__label').text();
    console.log('numbersCalculatorSeriesInputValue - '+numbersCalculatorSeriesInputValue);
  });

  /* Checkbox-phone */
  $('.checkbox-block_phone .checkbox-block__input').on('change', function () {
    $(this).parent().toggleClass('added');
    $(this).siblings('.checkbox-block__label').find('span').toggleClass('d-none');
  });
  /* Checkbox-phone END */
  /* Numbers variants */
  $('.numbers-calculator__more-variants').on('click', function (e) {
    e.preventDefault();
    $(this).parent().prev()
        .find('.numbers-calculator-variants__item:nth-child(28) ~ .numbers-calculator-variants__item')
        .slideDown();
    $(this).slideUp();
  });
  /* Numbers variants END */

  /* -----------------Calculator----------------- */
  var numbersCalculatorVariantsItemCheckbox = $('.numbers-calculator-variants__item .checkbox-block__input'),
      numbersCalculatorAddedNumbers = $('.numbers-calculator-added-numbers');

  /* Demonstration prices calculation */
  var numbersCalculatorPriceCoefficient = 0,
      numbersCalculatorValueTariff = $('#numbersCalculatorValueTariff'),
      numbersCalculatorValueNumberActivation = $('#numbersCalculatorValueNumberActivation'),
      numbersCalculatorValueSubscriptionFee = $('#numbersCalculatorValueSubscriptionFee'),
      numbersCalculatorValueMinimalFee = $('#numbersCalculatorValueMinimalFee'),
      numbersCalculatorValueLandlinePhones = $('#numbersCalculatorValueLandlinePhones'),
      numbersCalculatorValueCellPhones = $('#numbersCalculatorValueCellPhones');

  function demonstrationCalc() {
    // console.log(numbersCalculatorPriceCoefficient);
    numbersCalculatorValueTariff.text((numbersCalculatorPriceCoefficient*1.5).toFixed(2));
    numbersCalculatorValueNumberActivation.text((numbersCalculatorPriceCoefficient*2.2).toFixed(2));
    numbersCalculatorValueSubscriptionFee.text((numbersCalculatorPriceCoefficient*2.4).toFixed(2));
    numbersCalculatorValueMinimalFee.text((numbersCalculatorPriceCoefficient*2.8).toFixed(2));
    numbersCalculatorValueLandlinePhones.text((numbersCalculatorPriceCoefficient*.71).toFixed(2));
    numbersCalculatorValueCellPhones.text((numbersCalculatorPriceCoefficient*2.28).toFixed(2));
  }
  /* Demonstration prices calculation END */

  /* Adding/removing numbers */
  numbersCalculatorVariantsItemCheckbox.on('change', function () {
    var checkboxParent = $(this).parent('.numbers-calculator-variants__item'),
        checkboxParentId = checkboxParent.attr('id'),
        checkboxPhoneValue = $(this).next().find('.phone-value').text();

    if($(this).is(':checked')) {
      checkboxParent.addClass('added');
      numbersCalculatorAddedNumbers.append('<div class="numbers-calculator-added-numbers__item" data-parent="'+checkboxParentId+'"></div>');
      var numbersCalculatorAddedNumbersItem = $('.numbers-calculator-added-numbers__item');
      numbersCalculatorAddedNumbersItem.last().text(checkboxPhoneValue);

      /* Demonstration prices calculation */
      numbersCalculatorPriceCoefficient += 1;
      demonstrationCalc();
      /* Demonstration prices calculation END */
    } else {
      checkboxParent.removeClass('added');
      $('.numbers-calculator-added-numbers__item[data-parent="'+checkboxParentId+'"]').fadeOut().remove();

      /* Demonstration prices calculation */
      numbersCalculatorPriceCoefficient -= 1;
      demonstrationCalc();
      /* Demonstration prices calculation END */
    }
  });

  numbersCalculatorAddedNumbers.on('click', '.numbers-calculator-added-numbers__item', function () {
    var addedNumber = $(this),
        addedNumberDataParent = addedNumber.attr('data-parent');
    $('#'+addedNumberDataParent).removeClass('added').find('.checkbox-block__input').trigger('click');
    addedNumber.fadeOut().remove();
  });
  var numbersCalculatorAddedNumbersItem = $('.numbers-calculator-added-numbers__item');
  if(numbersCalculatorAddedNumbersItem.length > 0) {
    numbersCalculatorAddedNumbersItem.on('click', function () {
      numbersCalculatorPriceCoefficient -= 1;
      demonstrationCalc();
    });
  }
  /* Adding/removing numbers END */
  /* -----------------Calculator END----------------- */

  /* Steps-carousel */
  var stepsCarousel = $('.steps-carousel');
  if(stepsCarousel.length > 0) {
    stepsCarousel.slick({
      mobileFirst: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1199,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        }
      ]
    });
  }
  /* Steps-carousel END */

  /* Tooltips */
  new jBox('Tooltip', {
    attach: '.with-tooltip',
    width: 290,
    closeOnMouseleave: true,
    position: {
      x: 'left',
      y: 'top'
    },
    outside: 'y',
    offset: {
      x: 0,
      y: -5
    },
    pointer: false,
    addClass: 'jBox-simple-tooltip',
    animation: 'zoomIn',
    getContent: 'data-jbox-content'
  });
  /* Tooltips END */

  /* Custom tabs (Opportunities) */
  /* Custom tabs (Opportunities) END */
  $('#ipOpportunitiesNav .nav-link').on('click', function() {
    $(this).parent().addClass('nav-item_active');
    $(this).parent().siblings().removeClass('nav-item_active');
  });

  /* Table-spoiler */
  var tableSpoilerList = $('.table-spoiler__list'),
      tableSpoilerListItem = $('.table-spoiler__list li'),
      tableSpoilerBtn = $('.table-spoiler__btn');
  if(tableSpoilerBtn.length > 0) {
    tableSpoilerList.height((tableSpoilerListItem.height() * 2) + 10);
    tableSpoilerBtn.on('click', function () {
      var thisParent = $(this).parent(),
          thisParentListItem = thisParent.find('li');
      console.log(thisParentListItem.length);
      if(!thisParent.hasClass('table-spoiler_active')) {
        thisParent.addClass('table-spoiler_active');
        thisParent.find('.table-spoiler__list').animate({
          height: (thisParentListItem.height() * thisParentListItem.length) + (10 * thisParentListItem.length - 1)
        }, 500);
      } else {
        thisParent.find('.table-spoiler__list').animate({
          height: (thisParentListItem.height() * 2) + 10
        }, 500);
        setTimeout(function () {
          thisParent.removeClass('table-spoiler_active');
        }, 600)
      }
    });
  }
  /* Table-spoiler END */

  /* Solutions-carousel */
  var solutionsCarousel = $('.solutions-carousel');
  if(solutionsCarousel.length > 0) {
    solutionsCarousel.slick({
      mobileFirst: true,
      slidesToShow: 1,
      dots: false,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3500,
      pauseOnHover: true,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          }
        },
      ]
    });
  }
  /* Solutions-carousel END */

});