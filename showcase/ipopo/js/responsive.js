$(document).ready(function(){
    $('.nav-trigger_small').parent().hide();
    // Cat-header wrap
    //$(function(){
    //   if($(window).width() < 992) {
    //       $('.cat-header_wrap').removeClass('no-padding');
    //   } else {
    //       $('.cat-header_wrap').addClass('no-padding');
    //   }
    //});

    // Orientation change
    $(window).bind('orientationchange', function() {
        if($(window).width() < 1199 && $(window).width() >= 768) {
            setTimeout(function () {
                window.location.reload();
            }, 2);
        }
    });

    // Small menu
    $('.nav-trigger_small').click(function(){
        $('.js-menu').slideDown(300);
        $('.js-menu_underlay').removeClass('hidden');
        $('body').css('position', 'fixed');
    });

    // More content
    $('.brand-more').slideUp();
    $('.description-more').slideUp();

    // Inputs scripts Надо подкорректировать

    //$('.market-search > form').focusout(function(){
    //    $('.market-search_input').val('');
    //});

    // JS menu
    $(document).scroll(function(){
        var previousScroll = 0;
        var currentScroll = $(this).scrollTop();
        if(currentScroll > previousScroll){
            $('.menu.js-menu').addClass('navbar-fixed-top');
        } else {
            $('.menu.js-menu').removeClass('navbar-fixed-top');
        }
    });

    // mCustomScrollbar
    $(".sidebar-brand").mCustomScrollbar({
        autoHideScrollbar: false,
        theme: "light-blue"
    });
    $("#brand").mCustomScrollbar({
        autoHideScrollbar: false,
        theme: "light-blue"
    });

    // Sidebar-nav, popup-nav
    $('.nav a.dropdown-toggle_special').click(function () {
        var thisParent = $(this).parent();
        thisParent.siblings().removeClass('open-link');
        $(this).parent().toggleClass('open-link');
    });
    $('.nav li.open-link').mouseleave(function () {
        $(this).removeClass('open-link');
    });

    // Owl carousel

    //-------------------------------
    $('.content-carousel').each(function (ind, elem) {
        var showcaseCarousel = $(elem);
        showcaseCarousel.owlCarousel({
            loop: false,
            stagePadding: 5,
            responsive: {
                0: {
                    margin: 5,
                    center: true,
                    items: 1.3
                },
                480: {
                    items: 2,
                    center: false
                },
                641: {
                    items: 3
                },
                992: {
                    // margin: 0,
                    items: 3
                },
                1200: {
                    margin: 0,
                    items: 4
                }

            }
        });
        $(elem).parent().find('.owl-next-btn').on('click',function(e){
            showcaseCarousel.trigger('next.owl.carousel');
        });
        $(elem).parent().find('.owl-prev-btn').on('click',function(e){
            showcaseCarousel.trigger('prev.owl.carousel');
        });
    });
    $('.owl-stage').addClass('equal-height');
    $('.owl-item').addClass('equal-height_item');
    
    $('.brand-trigger-1').click(function () {
        $(this).toggleClass('active');
        $('.brand-more-1').slideToggle();
    });
    $('.brand-trigger-2').click(function () {
        $(this).toggleClass('active');
        $('#brand-more-2').slideToggle();
    });
    $('.brand-trigger-3').click(function () {
        $(this).toggleClass('active');
        $('#brand-more-3').slideToggle();
    });
    $('.product-more').click(function () {
        $(this).toggleClass('active');
        $('#description-more-1').slideToggle();
    });

    // Carousel hover
    $(".prod.carousel-item:not(.carousel-more)").hover(function(){
        if($(window).width() > 1024 ) {
            var _this = $(this),
                popover = $('#popover-content'),
                _left = 0,
                _top = 0,
                thisShowHidden = _this.find('.show-hidden');
            popover.html(thisShowHidden.html());

            _top = _this.offset().top - 4;
            left = _this.offset().left;

            if (_left+popover.outerWidth() > $(window).width()){
                _left = $(window).width() - popover.outerWidth();
            }
            if (left < 0){ left = 0; }
            popover.css({'top': _top, 'left': left});
            popover.addClass('popover-active');
        }
    });
    $('#popover-content').mouseleave(function(){
        var _this = $(this),
            popover = $('#popover-content');
        popover.removeClass('popover-active');
    });

    // For popups
    $(function() {
        $('.modal-open .modal').css({
            height: $('body').height() + 'px'
        });
    });

    $('#search-small').click(function(){
        $(window).scrollTop(87);
        if($(window).width() < 992){
            $('#popup-search').addClass('popup-search-open');
            $('.popup-search-open').css('top', '44px');
            $('#menu').css({
                'position': 'relative'
            });
            $('.popup-search-open .market-search_input').focus()
        }
    });
    $('.popup-search_underlay').click(function(){
        $('.popup-search-open').removeClass('popup-search-open');
        $('#popup-search .market-search_input').val('')
    });

    // Header scripts
    var catHeaderSmallBtn = $('.cat-header_small-btn');
    var catHeaderSmallSearch = $('.cat-header_small-search');
    $(document).scroll(function(){
        var previousScroll = 0;
        if($(window).width() < 992) {
            var currentScroll = $(this).scrollTop();
            if (currentScroll > 86){
                $('.nav-trigger_small').parent().show();
                $('#menu').css({
                    'position': 'fixed',
                    'top': '0',
                    'z-index': '1000',
                    'width': '100%'
                });
                $('.scroll-menu_btn').removeClass('hidden');
                $('.popup-search-open').css('top', '43px');

            } else {
                $('.nav-trigger_small').parent().hide();
                $('#menu').css({
                    'position': 'relative'
                });
                $('.scroll-menu_btn').addClass('hidden');
                $('.popup-search-open').css('top', '0');
            }
            previousScroll = currentScroll;
        }
    });

    // Popup slider
    $('.price-in_small').on('change', function () {
        var max = $('#max-price-1').val(),
            min = $('#min-price-1').val();
        var h = $('#price-1').attr('href').split('price/');
        h[1] = min + '-' + max;
        $('#price-1').attr('href', h[0] + 'price/' + h[1]);
        $('#slider-1').slider('values', [min, max]);
    });
});
