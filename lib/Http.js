const Vue = require('vue')
// import VueResource from 'vue-resource'

const VueResource = require('vue-resource')
//123
Vue.use(VueResource)
import {encoder as base64Encoder} from './base64'
const Util = require('./Util')
const {log} = require('./egovanative')

import {data as gData} from './zhixin'

function getServerUrl() {
    return Util.getServerUrl()
}

function getV2ServerUrl() {
    return Util.getV2ServerUrl()
}

function buildOptions(requestParam) {
    var options = {

        timeout: 120 * 1000,
    };
    if (requestParam.before && (typeof requestParam.before == 'function')) {
        options.before = requestParam.before
    }
    options.xhr = {withCredentials: true}
    return options;
}

//参考angularjs实现
function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'))
}

const TYPE = {
    zx: 1,
    v11: 2,
    v14: 3
}

let requestType = TYPE.zx

function getTypeImpl(rp) {
    return rp && rp.requestType || requestType
}

function setTypeImpl(type) {
    requestType = type
}

export default {
    TYPE: TYPE,
    setRequestType: setTypeImpl,
    getRequestType: getTypeImpl,
    /**
     * @param requestParam: hook包括start, error, success, finally
     */
    ajax(requestParam) {
        let {url, extract} = strategy(requestParam)

        Util.log("url = " + url)

        var finallyCallback = function (data) {
            if (requestParam.final) {
                requestParam.final(extract(data, 'final'))
            } else if (requestParam.finally) {
                requestParam.finally(extract(data, 'final'))
            }
        }

        var successCallback = function (data) {
            if (requestParam.success) {
                try {
                    requestParam.success(extract(data, 'success'))
                } catch (e) {
                    console.error(e)
                }
            }
            finallyCallback(data)
        }

        var failCallback = function (data) {
            try {
                log(`URL:${url}\n\n${extract(data)}`)
                if (requestParam.error) {
                    requestParam.error(extract(data, 'fail'))
                }
            } catch (e) {
                console.log(e)
            }
            finallyCallback(data)
        }

        var startCallback = function () {
            if (requestParam.start) {
                requestParam.start()
            }
        }
        startCallback()

        var options = buildOptions(requestParam)

        if (getTypeImpl(requestParam) == TYPE.zx) {
            if (requestParam.method && requestParam.method.toUpperCase() == "GET") {
                Vue.http.get(url, options).then(successCallback, failCallback)
            } else {
                Vue.http.post(url, null, options).then(successCallback, failCallback)
            }
        } else {
            Vue.http.jsonp(url, null, options).then(successCallback, failCallback)
        }
    },

    ajaxV11: function (requestParam) {
        requestParam.requestType = TYPE.v11
        ajax(requestParam)
    }
}

function appendParams(url, params, useUtf8) {
    if (url.indexOf('?') < 0) {
        url += '?'
    }
    if (params) {
        for (var key in params) {
            let c = url[url.length - 1]
            if (c != '?' && c != '&') {
                url += "&"
            }
            url += encodeUriQuery(key) + "=" + encodeUriQuery(params[key])
        }
    }
    return url
}

function cleanPath(path) {
    return path && path.replace(/([^:]|^)\/{2,}/g, '$1/')
}

function strategy(rp) {
    let type = getTypeImpl(rp)
    let result = {}
    if (type == TYPE.zx) {
        result.url = buildUrlZx(rp)
    } else if (type == TYPE.v11) {
        result.url = buildUrlV11(rp)
    } else if (type == TYPE.v14) {
        result.url = buildUrlV14(rp)
        result.extract = (obj, func)=> {
            return obj && obj.body && obj.body.resultInfo
        }
    }
    if (!result.extract) {
        result.extract = (obj, func)=> {
            return obj && obj.body
        }
    }
    return result
}

function buildUrlZx(rp) {
    let serverUrl = getServerUrl()
    if (!rp.params) {
        rp.params = {}
    }

    rp.params.isMobileQuest = 1
    rp.params.isJsonp = 1
    rp.params.companyID = Util.getRequestParam("companyID")
    rp.params.token = Util.getRequestParam("token")
    rp.params.loginHumanID = Util.getRequestParam("loginHumanID")

    return appendParams(cleanPath(serverUrl + '/' + rp.functionName), rp.params)
}

function buildUrlV11(rp) {
    let serverUrl = getV2ServerUrl()

    let baseUrl = serverUrl + "/home/MIServlet/httpProcess.htm?product=68&jsonp=JSON_CALLBACK&"

    rp.params.productID = Util.getProductID()
    return baseUrl
        + "functionName=" + rp.functionName
        + "&params=" + encodeURIComponent(JSON.stringify(rp.params))
}


function buildUrlV14(rp) {
    // let serverUrl = getV2ServerUrl()
    let serverUrl = "http://192.168.32.224:8080/zy"

    if (!rp.methodName) {
        rp.methodName = '/home/mobile/inspect'
        rp.params = {
            functionParams: base64Encoder(JSON.stringify(rp.params))
        }
    }

    rp.params.productID = Util.getProductID()
    rp.params.product = Util.getProductID()
    rp.params.functionName = rp.functionName
    if (gData.getToken) {
        rp.params.token = gData.getToken()
    }

    return appendParams(cleanPath(serverUrl + '/' + rp.methodName), rp.params, true)
}