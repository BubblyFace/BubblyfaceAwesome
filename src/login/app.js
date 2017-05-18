const Vue = require('vue');
const VueRouter = require('vue-router');
const def = require('../../lib/default');
def.setUp();

const login = require('./view/login.vue')
const router = new VueRouter({
    //滚轮行为
    scrollBehavior: () => ({x: 0, y: 0}),
    routes: [
        {path: '/', name: 'login', component: login},
    ]
});

new Vue({
    router
}).$mount('#app');