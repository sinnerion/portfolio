// Progress bar for about-page -----------------------------------------

$(document).ready(function(){
    jQuery('.skillbar').each(function(){
        jQuery(this).find('.skillbar-bar').animate({
            width:jQuery(this).attr('data-width')
        },2500);
    });
    jQuery('.skill-bar-percent').each(function(){
        jQuery(this).animate({
            left:jQuery(this).attr('data-percent')
        },3300);
    });
});

// Smooth transition to sections ----------------------------------------------

$(document).ready(function() {
    jQuery("a.scrollto").click(function () {
        elementClick = jQuery(this).attr("href")
        destination = jQuery(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
        return false;
    });
});

// ViewportChecker

(function($){
    $.fn.viewportChecker = function(useroptions){
        // Define options and extend with user
        var options = {
            classToAdd: 'visible-block',
            offset: 100,
            callbackFunction: function(elem){}
        };
        $.extend(options, useroptions);

        // Cache the given element and height of the browser
        var $elem = this,
            windowHeight = $(window).height();

        this.checkElements = function(){
            // Set some vars to check with
            var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html'),
                viewportTop = $(scrollElem).scrollTop(),
                viewportBottom = (viewportTop + windowHeight);

            $elem.each(function(){
                var $obj = $(this);
                // If class already exists; quit
                if ($obj.hasClass(options.classToAdd)){
                    return;
                }

                // define the top position of the element and include the offset which makes is appear earlier or later
                var elemTop = Math.round( $obj.offset().top ) + options.offset,
                    elemBottom = elemTop + ($obj.height());

                // Add class if in viewport
                if ((elemTop < viewportBottom) && (elemBottom > viewportTop)){
                    $obj.addClass(options.classToAdd);

                    // Do the callback function. Callback wil send the jQuery object as parameter
                    options.callbackFunction($obj);
                }
            });
        };

        // Run checkelements on load and scroll
        $(window).scroll(this.checkElements);
        this.checkElements();

        // On resize change the height var
        $(window).resize(function(e){
            windowHeight = e.currentTarget.innerHeight;
        });
    };
})(jQuery);

// Smooth appearance -------------------------------------------------

$(document).ready(function() {
    $('.to-top').addClass("hidden-block").viewportChecker({
        classToRemove: 'hidden-block',
        classToAdd: 'visible-block animated fadeInUp',
        offset: 100
    });
});

$(document).ready(function() {
    $('.to-right').addClass("hidden-block").viewportChecker({
        classToRemove: 'hidden-block',
        classToAdd: 'visible-block animated fadeInLeft',
        offset: 100
    });
});

$(document).ready(function() {
    $('.to-left').addClass("hidden-block").viewportChecker({
        classToRemove: 'hidden-block',
        classToAdd: 'visible-block animated fadeInRight',
        offset: 100
    });
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

// Perfect scrollbar ----------------------------------------

$(function() {
    Ps.initialize(document.getElementById('container'));
});

// Portfolio filter

$('#filter').on('click', 'button', function () {
    $('.active-button').removeClass('active-button');
    $(this).addClass('active-button');
    var buttonAttr = $(this).attr('data-filter');
    $('.preview-block').each(function(){
        var previewAttr = $(this).attr('data-filter');
        if( previewAttr !== buttonAttr && buttonAttr !== 'all' ) {
           $(this).addClass('preview-hidden');
        } else if( previewAttr === buttonAttr) {
            $(this).removeClass('preview-hidden');
         } else {
            $('.preview-block').removeClass('preview-hidden');
        }
    });
});

