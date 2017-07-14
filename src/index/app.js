const Vue = require('vue');
const VueRouter = require('vue-router');
const def = require('../public/javascripts/default');
const store =require( '../libs/vuex/store').default;
def.setUp();


//主路由使用五个
const home = require('./view/home.vue')
const articleDetail = require('./view/articalDetail.vue')
const ablumDetail = require('./view/ablumDetail.vue')
const myself = require('./view/myself.vue')
const ablums = require('./view/ablums.vue')


const router = new VueRouter({
        //滚轮行为
        scrollBehavior: () => ({x: 0, y: 0}),
    routes: [
        {path: '/', name: 'home', component: home},
        {path: '/articleDetail/:articleId/', name: 'articleDetail', component: articleDetail},
        {path: '/myself/:id/:Item',name: 'myself', component:myself},
        {path: '/ablums/:ablumItem',name: 'ablums', component:ablums},
        {path: '/ablums/ablumDetail/:id',name: 'ablums', component:ablumDetail, },
]
});

new Vue({
    router,
    store:store,
    methods:{
        stateTest(){
            console.log(store.state)
            alert(store.state)
        }
    }
}).$mount('#app');