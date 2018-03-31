$(document).ready(function() {

    // Portfolio more projects // This script sometimes gives bugs
    $('.more-projects').hide();
    $('.portfolio').on('click', 'portfolio-btn', function(){
        $(this).preventDefault();
        $('.more-projects').toggle('slow');
        $('.default-projects').toggle('slow');
    });

    // Portfolio filter
    $('#filter').on('click', 'button', function () {
        $('.active-btn').removeClass('active-btn');
        $(this).addClass('active-btn');
        var linkAttr = $(this).attr('data-filter');
        $('.portfolio-wrapper').each(function(){
            var previewAttr = $(this).attr('data-filter');
            if( previewAttr !== linkAttr && linkAttr !== 'all' ) {
                $(this).addClass('portfolio-wrapper_hidden');
            } else if( previewAttr === linkAttr ) {
                $(this).removeClass('portfolio-wrapper_hidden');
            } else {
                $('.portfolio-wrapper').removeClass('portfolio-wrapper_hidden');
            }
        });
    });

    // Smooth transition of sections
    $(".scroll-to").click(function () {
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
        return false;
    });

    //Form plasceholders
    $('.js-placeholder').focus(function () {
        $(this).next('.form-label').addClass('hidden');
    });
    $('.js-placeholder').blur(function () {
        if(!$(this).val()) {
            $(this).next('.form-label').removeClass('hidden');
        }
    });

    // Progressbars
    $('.skill-bar').circleProgress({
        size: 160.0,
        thickness: 12,
        emptyFill: 'rgba(0, 0, 0, .1)',
        animation: {
            duration: 2200,
            easing: 'circleProgressEasing'
        },
        animationStartValue: 0.0,
        reverse: false,
        lineCap: 'butt'
    });

    $('.skill-1').circleProgress({
        value: .9,
        startAngle: 1.55 - Math.PI,
        /**
         * Fill of the arc. You may set it to:
         *   - solid color:
         *   - { color: '#3aeabb' }
         *   - { color: 'rgba(255, 255, 255, .3)' }
         *   - linear gradient (left to right):
         *   - { gradient: ['#3aeabb', '#fdd250'], gradientAngle: Math.PI / 4 }
         *   - { gradient: ['red', 'green', 'blue'], gradientDirection: [x0, y0, x1, y1] }
         *   - image:
         *   - { image: 'http://i.imgur.com/pT0i89v.png' }
         *   - { image: imageObject }
         *   - { color: 'lime', image: 'http://i.imgur.com/pT0i89v.png' } - color displayed until the image is loaded
         */
        fill: {
            color: "#30bae7"
        }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html(parseInt(90 * progress) + '<i>%</i>');
    });
    $('.skill-2').circleProgress({
        value: .75,
        startAngle: 1.55 - Math.PI,
        fill: {
            color: "#d74680"
        }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html(parseInt(75 * progress) + '<i>%</i>');
    });
    $('.skill-3').circleProgress({
        value: .7,
        startAngle: 1.55 - Math.PI,
        fill: {
            color: "#15c7a8"
        }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html(parseInt(70 * progress) + '<i>%</i>');
    });
    $('.skill-4').circleProgress({
        value: .85,
        startAngle: 1.55 - Math.PI,
        fill: {
            color: "#eb7d4b"
        }
    }).on('circle-animation-progress', function(event, progress) {
        $(this).find('strong').html(parseInt(85 * progress) + '<i>%</i>');
    });

});
