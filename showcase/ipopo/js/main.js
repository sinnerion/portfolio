$(function () {
    $('#brand-more').slideUp();

        $('a[href="/wishlist.html"]').click(function (e) {
            e.preventDefault();
            // $.get('http://www.ipopo.com/rus/wishlist.html');
            showForm();
            // $.getJSON('/session.php',function(res){
            //     var lang = res.LANG.toLowerCase(),
            //         auth = res.sd_user.authorised,
            //         wl_id = res.wishlist_id,
            //         u_str = res.unique_str,
            //         wl_url = '/'+lang+'/my-wishlist-edit/'+wl_id+'/'+u_str+'.html';
            //
            //
            //     if (auth == 0 && wl_id != undefined ) {
            //         location.href = wl_url;
            //     }
            //     if (wl_id == undefined  || auth == 1){
            //
            //     }
            //     console.log(res)
            // });
        });

    function showForm() {
        var ww = $(window).width(),
            wh = $(window).height();
        $('html').css({'overflow':'hidden'});
        $('body').css({
            'overflow':'hidden',
            'width': ww,
            'height': wh,
            'position':'static'
        }).append('<div id="form"></div>');
        $('body #form').load('form.html');

    }

    var allBrands = '';
    $('.brand-item input').each(function () {
        if (allBrands == '') {
            allBrands += $(this).val();
        } else {
            allBrands += ',' + $(this).val();
        }
    });
    $('.dropdown').on('click',function (e) {
       e.preventDefault();
        $(this).toggleClass('is-active');
    });

    // Js-menu
    //$('.js-menu').hide();
    $('.menu-trigger').on('click',function (e) {
        e.preventDefault();
        // $('.js-menu').slideUp(1);
        $('.js-menu').addClass('is-active').slideUp(1);;
        $('.js-menu').slideDown(300);
        $('.js-menu_underlay').removeClass('hidden');
        $('body').css('position', 'fixed');
    });

    $('#form-close, .js-menu_underlay').on('click',function (e) {
       e.preventDefault();
        // $('.js-menu').removeClass('is-active');
        $('.js-menu').slideUp(300);
        $('.js-menu_underlay').addClass('hidden');
        $('body').css('position', 'relative');
    });
    $('#s_shop').on('keyup',function () {
        var val = $(this).val();

        $.get('/category/ajax',{q: val},function(res){
            $('#resp').show();
            $('#resp').html(res);
        })
    });
    $('#s_shop').on('blur',function () {
        $('#resp').hide().html('');
    });


    $('.brand-item input').change(function () {
        var brands = '',
            price = $('#min-price').val() + '-' + $('#max-price').val();
        $('.brand-item input:checked').each(function () {

            if (brands == '') {
                brands += $(this).val();
            } else {
                brands += ',' + $(this).val();
            }

        });
        if (brands == '') {
            brands = allBrands;
        }
        $.get('/category/index', {brands: brands, price: price}, function (res) {
            var content = $(res).find('.items').children(),
                pagination = $(res).find('#pagination').children();
            $('.items').html('');
            $('.items').append(content);
            $('#pagination').html('');
            $('#pagination').append(pagination);
            // console.log(res);
        });
    });
    $('.cat-trigger').click(function () {
        $('.catalogue').toggle();
    });

    $('#catalogue li').hover(
        function () {
            $(this).addClass('active');
    },function () {
            $(this).removeClass('active');
    });

    $('.load-more').click(function (e) {
        e.preventDefault();
        var url = $(this).attr('href'),
            order = $(this).data('order');
        $.get(
            url,
            {order: order},
            function (res) {
                var more_url = $(res).find('.load-more').attr('href'),
                    content = $(res).find('.items').children();
                $('.items').append(content);
                // For marketplace
                $('.marketplace-content').append(content);
                // -----------------------------
                $('.load-more').attr('href', more_url);

                var li = $('.pagination').find('.active:last').index() + 1;
                $('.pagination li').eq(li).addClass('active');
            });

    });

    $('.owl').owlCarousel({
        items: 4,
        slideBy: 'page',
        loop: true,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                loop:false
            },
            600:{
                items:3
            },
            1000:{
                items:4

            }
        }
    });
    var owl = $('.owl');
    $('#next').on('click', function () {
        owl.trigger('next.owl.carousel');
    });
    $('#prev').on('click', function () {
        owl.trigger('prev.owl.carousel');
    });

    $('a[href="#"]').click(function (e) {
        e.preventDefault();
    });

    $('#brand-trigger').click(function () {
        $(this).toggleClass('active');
        $('#brand-more').slideToggle();
    });

    $('.price-in').on('change', function () {
        var max = $('#max-price').val(),
            min = $('#min-price').val();
        var h = $('#price').attr('href').split('price/');
        h[1] = min + '-' + max;
        $('#price').attr('href', h[0] + 'price/' + h[1]);
        $('#slider').slider('values', [min, max]);
    });


});
