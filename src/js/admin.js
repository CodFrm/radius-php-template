import Vue from 'vue'
import router from './router'
// // import css
// import 'vue-easytable/libs/themes-base/index.css'

// // import table and pagination comp
// import {
//     VTable,
//     VPagination
// } from 'vue-easytable'

// // Register to global
// Vue.component(VTable.name, VTable)
// Vue.component(VPagination.name, VPagination)

require('./../css/admin.css');

// const route = new VueRouter({
//     routes
// })
// Vue.prototype.$goRoute = function(index) {
//     this.$router.push(index)
// }

new Vue({
    router
}).$mount('#app');

$(function() {
    $('.nav-left>.nav-item>.nav-ic').click(function() {
        //改变箭头指向
        console.log($(this).parent().children('.sub-nav').css('display'));
        if($(this).parent().children('.sub-nav').css('display')=='block'){
            $(this).children('.arrow').removeClass('icon-down');
            $(this).children('.arrow').addClass('icon-up');
        }else{
            $(this).children('.arrow').addClass('icon-down');
            $(this).children('.arrow').removeClass('icon-up');
        }
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