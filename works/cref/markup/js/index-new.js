$(document).ready(function () {
  /* Отключение пустых ссылок (символ # в пути) */
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

  /* Маска для полей телефонного номера */
  $('input[type="tel"]').mask('+7 (000) 000-00-00');

  /* Фиксация шапки */
  var mainHeaderBottom = $('.main-header__bottom');
  $(window).on('load scroll', function () {
    var mainHeaderTop = $('.main-header__top').outerHeight();
    if($(window).scrollTop() >= mainHeaderTop && $(window).width() > 1199) {
      mainHeaderBottom.addClass('main-header__bottom_fixed');
    } else {
      mainHeaderBottom.removeClass('main-header__bottom_fixed');
    }
  });

  /* Карусель условий на главной */
  var termsCarousel = $('.terms-carousel');
  if(termsCarousel.length > 0) {
    termsCarousel.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          }
        }
      ]
    })
  }

  /* Мобильное меню */
  var mobileNavToggle = $('.mobile-nav-toggle'),
      mainNavSublistToggle = $('.main-nav__sublist-toggle');
  mobileNavToggle.on('click', function () {
    $(this).toggleClass('mobile-nav-toggle_active');
    $('.main-nav').slideToggle();
  });
  mainNavSublistToggle.on('click', function () {
    $(this).parent().toggleClass('main-nav-list__item_active');
    $(this).siblings('.main-nav-sublist').slideToggle(250);

    $(this).parent().siblings().removeClass('main-nav-list__item_active');
    $(this).parent().siblings().find('.main-nav-sublist').slideUp(250);
  });


  /* Мобильные контакты */
  var mainBody = $('body');
  mainBody.on('click', '.mobile-contacts-toggle', function () {
    $(this).toggleClass('mobile-contacts-toggle_active');
    $('.main-header__top').slideToggle();
  });

  /* Поле поиска */
  var searchForm = $('.search-form'),
      searchFormToggle = $('.search-form-toggle'),
      searchFormClose = $('.search-form__close');

  searchFormToggle.on('click', function () {
    searchForm.addClass('search-form_active').find('.search-form__input').focus();
  });

  searchFormClose.on('click', function (e) {
    e.preventDefault();
    searchForm.removeClass('search-form_active');
  });

  /* Лайдбокс для картинок */
  new jBox('Image', {
    imageCounter: true,
    imageCounterSeparator: ' из '
  });

  /*--------- Вслывающие окна ---------*/

  /* Вслывающая форма заказа звонка */
  new jBox('Modal', {
    attach: '[data-modal="callback"]',
    width: 400,
    blockScroll: true,
    animation: 'zoomIn',
    addClass: 'jbox-custom-modal',
    title: 'Перезвоните мне',
    closeButton: 'title',
    content: $('#callback-modal'),
    overlay: true,
    reposition: false,
    repositionOnOpen: false,
    onOpen: function() {
      if(mainHeaderBottom.hasClass('main-header__bottom_fixed')) {
        mainHeaderBottom.css('width', $(window).width());
      }
    },
    onClose: function() {
      mainHeaderBottom.removeAttr('style');
    }
  });

  /* Вслывающая форма теста */
  new jBox('Modal', {
    attach: '[data-modal="takeTest"]',
    width: 400,
    blockScroll: true,
    animation: 'zoomIn',
    addClass: 'jbox-custom-modal',
    title: 'Заявка на прохождение теста',
    closeButton: 'title',
    content: $('#take-a-test-modal'),
    overlay: true,
    reposition: false,
    repositionOnOpen: false,
    onOpen: function() {
      if(mainHeaderBottom.hasClass('main-header__bottom_fixed')) {
        mainHeaderBottom.css('width', $(window).width());
      }
    },
    onClose: function() {
      mainHeaderBottom.removeAttr('style');
    }
  });

  /* Кнопка "вверх" */
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
  /* Кнопка "вверх" КОНЕЦ */

  /* Кастомизированный select */
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "simple-select": */
  x = document.getElementsByClassName("simple-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("ul");
    b.setAttribute("class", "list-unstyled select-items select-hide");

    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("li");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.setAttribute("tabnidex", "0");
      c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);

});