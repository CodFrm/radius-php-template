import Vue from 'vue'
import router from './router'
import 'vue-easytable/libs/themes-base/index.css'
import {
    VTable,
    VPagination
} from 'vue-easytable'
import config from "./../config";
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
require('./../css/admin.css');

var vue = new Vue({
    router,
    data() {
        return {
            group: []
        };
    },
    created() {
        fetch(config.url + config.aapi + 'usergroup', {
                credentials: "include"
            }).then(function(response) {
                return response.json();
            })
            .then(function(json) {
                vue.group = json["rows"];
            });
    },
}).$mount('#app');

$(function() {
    $('.nav-left>.nav-item>.nav-ic').click(function() {
        //改变箭头指向
        if ($(this).parent().children('.sub-nav').css('display') == 'block') {
            $(this).children('.arrow').removeClass('icon-down');
            $(this).children('.arrow').addClass('icon-up');
        } else {
            $(this).children('.arrow').addClass('icon-down');
            $(this).children('.arrow').removeClass('icon-up');
        }
        $(this).parent().children('.sub-nav').slideToggle().end();
    });
    $('.mobile-menu').click(function() {
        $('.nav-left').slideToggle().end();
    });
    $(document).on('click', function(e) {
        if (!($(document).width() < 720 && $('.nav-left').css('display') == 'block')) {
            return;
        }
        var e = e || window.event;
        var elem = e.target || e.srcElement;
        while (elem) {
            if (elem.className && elem.className.indexOf('mobile-menu') >= 0) {
                return;
            }
            elem = elem.parentNode;
        }
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

window.show_box = function(id) {
    document.getElementById(id).style.opacity = "1";
    document.getElementById(id).style.height = "auto";
    document.getElementById(id).style.zIndex = "100";
    document.getElementById(id).style.pointerEvents = "all";
};

window.close_box = function(id) {
    document.getElementById(id).style.opacity = "0";
    setTimeout(function() {
        document.getElementById(id).style.height = "0px";
        document.getElementById(id).style.zIndex = "-1";
        document.getElementById(id).style.pointerEvents = "none";
    }, 500);
};