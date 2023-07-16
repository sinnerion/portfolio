$(document).ready(function () {
  /* Отключение пустых ссылок (символ # в пути) */
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

  /* Маска для полей телефонного номера */
  $('input[type="tel"]').mask('+7 (000) 000-00-00');

  /* Лайдбокс для картинок */
  new jBox('Image', {
    imageCounter: true,
    imageCounterSeparator: ' из '
  });

  /* Мобильное меню */
  var mainNav = $('.main-nav'),
      mainHeader = $('.main-header'),
      mainHeaderBottom = $('.main-header-bottom'),
      mobileNavToggle = $('.mobile-nav-toggle'),
      mainNavItemIcon = $('.main-nav__item_has-child > .ui-icon');

  $(window).on('load resize', function () {
    var mainHeaderBottomHeight = mainHeaderBottom.outerHeight();

    if($(window).width() < 1200) {
      mainNav.css('top', mainHeaderBottomHeight);
    } else {
      mainNav.removeAttr('style');
    }
  });

  if (mobileNavToggle.length > 0) {
    mobileNavToggle.on('click', function () {
      mainHeader.toggleClass('main-header_shadow-none');
      mainHeaderTop.slideUp();
      searchForm.removeClass('search-form_active');
      $(this).toggleClass('mobile-nav-toggle_active');
      mainNav.slideToggle();
    });
  }

  if (mainNavItemIcon.length > 0) {
    mainNavItemIcon.on('click', function () {
      $(this).siblings('.main-subnav, .sub-menu').slideToggle();
      $(this).parent().siblings().find('.main-subnav, .sub-menu').slideUp();
      $(this).parent().toggleClass('main-nav__item_active');
      $(this).parent().siblings().removeClass('main-nav__item_active');
    });
  }

  /* Мобильный поиск */
  var searchForm = $('.search-form'),
      searchFormInput = searchForm.find('input[type="search"]'),
      mobileSearchToggle = $('.mobile-search-toggle');

  if (mobileSearchToggle.length > 0) {
    mobileSearchToggle.on('click', function () {
      mainHeader.removeClass('main-header_shadow-none');
      mainHeaderTop.slideUp();
      mainNav.slideUp();
      $(this).toggleClass('mobile-search-toggle_active');
      mobileNavToggle.removeClass('mobile-nav-toggle_active');
      searchForm.addClass('search-form_active');
      setTimeout(function () {
        console.log(searchFormInput);
        searchFormInput.focus();
      }, 500);
    });
  }
  if($(window).width() < 1200) {
    $(document).mouseup(function (e) {
      if (!searchForm.is(e.target)
          && searchForm.has(e.target).length === 0) {
        searchForm.removeClass('search-form_active');
      }
    });
  }


  /* Мобильные контакты */
  var mainHeaderTop = $('.main-header-top'),
      mobileContactsToggle = $('.mobile-contacts-toggle');

  if (mobileContactsToggle.length > 0) {
    mobileContactsToggle.on('click', function () {
      mainHeader.removeClass('main-header_shadow-none');
      mainNav.slideUp();
      searchForm.removeClass('search-form_active');
      mobileNavToggle.removeClass('mobile-nav-toggle_active');
      $(this).toggleClass('mobile-contacts-toggle_active');
      mainHeaderTop.slideToggle();
    });
  }

  /* Главный слайдер */
  var indexSlider = $('.index-slider');
  if (indexSlider.length > 0) {
    indexSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true
    });
  }

  /* Карусель отзывов (testimonials) */
  var testimonialsCarousel = $('.testimonials-carousel');
  if (testimonialsCarousel.length > 0) {
    testimonialsCarousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true
    });
  }

  /* Карусель клиентов (clients) */
  var clientsCarousel = $('.clients-carousel');
  if (clientsCarousel.length > 0) {
    clientsCarousel.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
    });
  }

  /* Эффект затемнения соседних услуг, при наведении */
  var indexServicesItem = $('.index-services-item');
  if (indexServicesItem.length > 0) {
    indexServicesItem.on('mouseenter', function () {
      $(this).siblings().addClass('index-services-item_blured');
    }).on('mouseleave', function () {
      $(this).siblings().removeClass('index-services-item_blured');
    });
  }

  /* Текст со спойлером */
  var spoilerContentBtn = $('.spoiler-content__btn');
  if (spoilerContentBtn.length > 0) {
    spoilerContentBtn.on('click', function () {
      $(this).parent().prev('.spoiler-content__more').slideToggle();
      $(this).find('span').toggleClass('d-none');
    });
  }

  /* Ссылки социальных сетей (поделиться) */
  var currentPageUrl = window.location.href,
      socialLinkVk = $('.social-list__link_vk'),
      socialLinkTelegram = $('.social-list__link_telegram');
  if (socialLinkVk.length > 0) {
    socialLinkVk.attr('href', 'https://vk.com/share.php?url=' + currentPageUrl);
  }
  if (socialLinkTelegram.length > 0) {
    socialLinkTelegram.attr('href', 'https://t.me/share/url?url=' + currentPageUrl);
  }

  /* Вслывающая форма заказа звонка */
  new jBox('Modal', {
    attach: '#myModal',
    title: 'Grab an element',
    content: $('#grabMe')
  });

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
    repositionOnOpen: false
  });

  new jBox('Modal', {
    attach: '[data-modal="checkingOrder"]',
    width: 450,
    blockScroll: true,
    animation: 'zoomIn',
    addClass: 'jbox-custom-modal',
    title: 'Заказать поверку весов',
    closeButton: 'title',
    content: $('#checking-order-modal'),
    overlay: true,
    reposition: false,
    repositionOnOpen: false
  });

  /* Базовый демонстрационый скрипт подсказок в поле поиска */
  var searchFormResults = $('.search-form__results');
  function searchPrompting() {
    if (searchFormInput.val() !== '') {
      searchFormResults.fadeIn();
      searchFormResults.html('<li>Демонстрационный текст подсказки</li><li>Ещё одна строка</li><li>И ещё...</li>');
    }
    else {
      searchFormResults.html('');
      searchFormResults.fadeOut();
    }
  }
  searchFormInput.on('keyup', searchPrompting);

  searchFormInput.on('blur', function () {
    searchFormResults.html('');
    searchFormResults.fadeOut();
  });


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

  /* Меню каталога в сайдбаре */
  var catalogNavItem = $('.catalog-nav__item');
  if(catalogNavItem.length > 0) {
    catalogNavItem.on('click', function () {
      $(this).siblings().removeClass('catalog-nav__item_active');
      $(this).siblings().children('.catalog-subnav').slideUp();
      $(this).toggleClass('catalog-nav__item_active');
      $(this).children('.catalog-subnav').slideToggle();
    });
  }

  /* Table-responsive */
  var contentTables = $('.text-content table, .detail__content table');
  contentTables.each(function () {
    if (!($(this).parent().hasClass('table-responsive'))) {
      $(this).wrap('<div class="table-responsive"></div>');
    }
  });
  /* Table-responsive END */
});