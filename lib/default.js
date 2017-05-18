import ElementUI from 'element-ui'
module.exports.setUp = function (options) {
    require('element-ui/lib/theme-default/index.css');
    const Vue = require('vue');
    supportVue(Vue);

    const VueRouter = require('vue-router');
    Vue.use(VueRouter);

    const Vuex = require('vuex');
    Vue.use(Vuex);

    Vue.use(ElementUI)

    require('./font-awesome.min.css');
}

function supportVue(vue) {
    vue.prototype.isNewPage = function (route) {
        var params = route && route.params ||
            this.$route && this.$route.params
        return params && params.newPage
    }
}