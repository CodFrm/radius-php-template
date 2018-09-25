import Vue from 'vue'
import Router from 'vue-router'
import home from './../components/home.vue'
import user from './../components/user.vue'
import log from './../components/log.vue'
import server from './../components/server.vue'
import setting from './../components/setting.vue'
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/user',
        name: 'user',
        component: user
    }, {
        path: '/server',
        name: 'server',
        component: server
    }, {
        path: '/log',
        name: 'log',
        component: log
    }, {
        path: '/setting',
        name: 'setting',
        component: setting
    },
    { path: '*', redirect: '/' }
    ]
})