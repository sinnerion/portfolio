// Smooth transition of sections

$(document).ready(function() {
    $(".scroll-to").click(function () {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
        return false;
    });
});