import util from './Util'
import Http from './Http'

function initData(data) {
    data.humanID = util.getRequestParam("humanID");
    data.humanName = util.getRequestParam("humanName");
    data.cardID = util.getRequestParam("cardID");
}

function add1pxStyle() {

    function transformForScreen(classNode, side, which, scale) {
        let translateY = ''
        if (classNode == '.bdr-b' && window.devicePixelRatio > 1) {
            //保证下分割线真的在最底部
            translateY = `translateY(${window.devicePixelRatio - 1}px)`
        }
        return `${classNode}::${side}{
                    transform:${which}(${scale});
                    -webkit-transform:${which}(${scale})${translateY} 
                }\n`
    }

    var ratio = 1 / window.devicePixelRatio;
    var css = transformForScreen('.bdr-r', 'after', 'scaleX', ratio);
    css += transformForScreen('.bdr-l', 'before', 'scaleX', ratio);
    css += transformForScreen('.bdr-b', 'after', 'scaleY', ratio);
    css += transformForScreen('.bdr-t', 'before', 'scaleY', ratio);

    util.insertCss(css);
}

function setAgentType() {
    var UA = typeof window !== 'undefined'
        && window.navigator.userAgent.toLowerCase();
    window.isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
    window.isAndroid = UA && UA.indexOf('android') > 0;
}

/**
 * 用来简化界面是否刷新的判断逻辑：当调用<code>router.push()</code>
 * 时向route中插入newPage的标记，而调用<code>router.back()</code>
 * 时则没有，在页面的<code>beforeRouterEnter</code>回调中进行判断，通过
 * <code>Vue.prototype.isNewPage</code>来判断是否需要刷新界面。
 * <p>
 * 使用方式如下：
 * <pre>
 *   beforeRouteEnter(to, from, next) {
 *          next(vm => {
 *              if (vm.isNewPage(to)) {
 *                  vm.initPage()
 *              }
 *          })
 *      }
 * </pre>
 */
function makePushBrute(router) {
    var origin = router.push;
    router.push = function () {
        var obj = arguments[0];
        if (!obj.params) {
            obj.params = {};
        }
        obj.params.newPage = true;
        origin.apply(router, arguments);
    }
}

/**
 * 保证第一次跳转，未使用push的情况下也向route插入newPage的标记，
 * 具体意义参见makePushBrute
 */
function decorateHomePage(router) {
    var isActive = false;
    router.beforeEach((to, from, next) => {
        if (!isActive) {
            isActive = true;
            if (!to.params) {
                to.params = {};
            }
            to.params.newPage = true;
        }
        next();
    })
}

function supportVue(vue) {
    vue.prototype.isNewPage = function (route) {
        var params = route && route.params ||
            this.$route && this.$route.params
        return params && params.newPage
    }
}

/**
 * @param options
 *
 * debug[Boolean] 是否是调试模式
 * showHeader[Boolean] 是否显示ActionBar
 * requestType[Http.js::TYPE] 网络类型，v11 or v14
 * data[Object] 作为zhixin.data的__proto__属性
 */
module.exports.setUp = function (options) {

    if (options && options.debug) {
        window.__DEBUG__ = true;
    }

    if (options && options.showHeader) {
        window.__HEADER__ = true;
    }

    if (options && options.requestType) {
        Http.setRequestType(options.requestType)
    }

    if (options && options.data) {
        this.data.__proto__ = options.data
    }

    require('mint-ui/lib/style.css');

    const Vue = require('vue');
    supportVue(Vue);

    const VueRouter = require('vue-router');
    Vue.use(VueRouter);

    const Vuex = require('vuex');
    Vue.use(Vuex);

    const MintUI = require('mint-ui');
    Vue.use(MintUI);

    require('./common.css');
    require('./flexgrid.css');

    require('./font-awesome.min.css');
    require('./icomoon.css');

    initData(this.data);

    setAgentType();

    const zxHeader = require('./widget/Header.vue');
    Vue.component('mt-header', zxHeader);

    add1pxStyle();

    require('fixMint')
    require('fixX5')
}
/**
 * 保证此方法在mount之前调用，以使decorateHomePage生效
 */
module.exports.setUpBackHandler = function (router, homePath) {
    makePushBrute(router);
    decorateHomePage(router);

    homePath = homePath ? homePath : '/';
    window.goBack = function (force) {
        var route = router.app && router.app.$route;
        var interceptClick = route && route.params && route.params.onBackClick;
        if (!force && interceptClick && interceptClick()) {
            return;
        }
        if (route && route.path == homePath) {
            if (window.jsInterface && window.jsInterface.close) {
                window.jsInterface.close();
            }
        } else {
            router.back();
        }
    };
}
//全局状态，不会改变的，会改变的最好放在store中
module.exports.data = {
    humanID: null,//字符串，不是数字
    humanName: null,//用户名，一般为手机号
    cardID: null
}
