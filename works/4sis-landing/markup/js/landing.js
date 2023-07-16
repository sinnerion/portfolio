$(function () {
  /* Отключение пустых ссылок (символ # в пути) */
  $('a[href="#"]').on('click', function (e) {
    e.preventDefault();
  });

  /* Открытие модалки шоурума */
  const landingShowroomItemBtn = $('.landing-showroom-item__btn');
  landingShowroomItemBtn.on('click', function () {
    $(this).parent().next('.landing-showroom-modal').addClass('landing-showroom-modal_active')
  });

  /* Закрытие модалки шоурума */
  const landingShowroomModalClose = $('.landing-showroom-modal__close');
  landingShowroomModalClose.on('click', function () {
    $(this).parent().removeClass('landing-showroom-modal_active');
  });

  /* Карусель модалки (картинки слева) */
  const landingShowroomModalLeftCarousel  = $('.landing-showroom-modal-left-carousel');
  if(landingShowroomModalLeftCarousel.length) {
    landingShowroomModalLeftCarousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true
    });
  }

  /* Карусель модалки (основная информация) */
  const landingShowroomModalRightCarousel  = $('.landing-showroom-modal-right-carousel');
  if(landingShowroomModalRightCarousel.length) {
    landingShowroomModalRightCarousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true
    });
  }

  /* Карусель модалки (цены) */
  const landingShowroomModalPriceCarousel  = $('.landing-showroom-modal-price-carousel');
  if(landingShowroomModalPriceCarousel.length) {
    landingShowroomModalPriceCarousel.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true
    });
  }

  /* Навигация каруселей модалки */
  $(".landing-showroom-modal__prev").click(function () {
    landingShowroomModalLeftCarousel.slick("slickPrev");
    landingShowroomModalPriceCarousel.slick("slickPrev");
    landingShowroomModalRightCarousel.slick("slickPrev");
  });
  $(".landing-showroom-modal__next").click(function () {
    landingShowroomModalLeftCarousel.slick("slickNext");
    landingShowroomModalPriceCarousel.slick("slickNext");
    landingShowroomModalRightCarousel.slick("slickNext");
  });
  $('.landing-showroom-modal-price-carousel__item').each(function () {
    if(!$(this).siblings('.landing-showroom-modal-price-carousel__item').length) {
      $(this).parents('.landing-showroom-modal-price-carousel').siblings('.landing-showroom-modal__nav-btn').attr('disabled', true);
    }
  });

  /* Маска для полей формы */
  $('input[name="inputPhone"]').mask('+0 (000) 000-00-00');
  $('input[name="inputName"]').on('keyup', function() {
    this.value = this.value.replace(/[^а-яёa-z]/i, "");
  });
});