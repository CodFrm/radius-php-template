require('./../css/admin.css');

$(function() {
    $('.nav-left>.nav-item>.nav-ic').click(function() {
        $(this).parent().children('.sub-nav').slideToggle().end();
    });
    $('.mobile-menu').click(function() {
        $('.nav-left').slideToggle().end();
    });
})

window.popWind = function popWind() {
    this.prompt = function(content, icon, color) {
        color = color || '#000';
        var pop = $('<div class="pop-wid prompt" style="color:' + color + '"></div>');
        pop.html('<i class="iconfont icon-' + icon + '"></i><span style="margin-left:6px;">' + content + '</span>');
        $('body').append(pop);
        setTimeout(function() {
            pop.css('z-index', -1);
            pop.css('opacity', 0);
            setTimeout(function() {
                pop.remove();
            }, 500);
        }, 3000);
        setTimeout(function() {
            pop.css('z-index', 1000);
            pop.css('opacity', 1);
        }, 200);
    }
    return this;
}