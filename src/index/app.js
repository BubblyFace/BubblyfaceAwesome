const Vue = require('vue');
const VueRouter = require('vue-router');
const def = require('../public/javascripts/default');


const Vuex = require('vuex');
Vue.use(Vuex);

def.setUp();



const home = require('./view/home.vue')
const articleDetail = require('./view/articalDetail.vue')
const myself = require('./view/myself.vue')
const ablums = require('./view/ablums.vue')
const router = new VueRouter({
        //滚轮行为
        scrollBehavior: () => ({x: 0, y: 0}),
    routes: [
        {path: '/', name: 'home', component: home},
        {path: '/articleDetail', name: 'articleDetail', component: articleDetail},
        {path: '/myself',name: 'myself', component:myself},
        {path: '/ablums',name: 'ablums', component:ablums},
]
});

new Vue({
    router,
}).$mount('#app');