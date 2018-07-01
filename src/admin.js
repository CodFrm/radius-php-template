require('./css/admin.css');
require('./table');

$(function () {
    $('.nav-left>.nav-item>.nav-ic').click(function () {
        $(this).parent().children('.sub-nav').slideToggle().end();
    });
    $('.mobile-menu').click(function () {
        $('.nav-left').slideToggle().end();
    });
})

