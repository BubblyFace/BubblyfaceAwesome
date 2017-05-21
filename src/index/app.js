const Vue = require('vue');
const VueRouter = require('vue-router');
const def = require('../public/javascripts/default');
def.setUp();

const home = require('./view/home.vue')
const articleDetail = require('./view/articalDetail.vue')
const router = new VueRouter({
        //滚轮行为
        scrollBehavior: () => ({x: 0, y: 0}),
    routes: [
        {path: '/', name: 'home', component: home},
        {path: '/articleDetail', name: 'articleDetail', component: articleDetail},
]
});

new Vue({
    router
}).$mount('#app');