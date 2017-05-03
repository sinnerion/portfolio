// Progress bar for summary
jQuery(document).ready(function(){
    jQuery('.skillbar').each(function(){
        jQuery(this).find('.skillbar-bar').animate({
            width:jQuery(this).attr('data-percent')
        },2500);
    });
});

// Smooth transition of sections
$(document).ready(function() {
    $("a.scrollto").click(function () {
        elementClick = $(this).attr("href")
        destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
        return false;
    });
});

// Summary list-heading border-top
$(document).ready(function(){
    var sWidth = $(window).width();
    if (sWidth < 992) {
        $('p.list-heading').addClass('summary-title');
    } else {
        $('.list-heading.summary-title').removeClass('summary-title');
    }
});

// Example-full-img
$(document).ready(function(){
    $('.example-preview').on('click', function(){
       $('body').find('.hidden').removeClass('hidden');
    });
    $('.example-full-img').on('click', function(){
        $(this).addClass('hidden');
    });
});
