import http from 'Http'

let interceptor

function intercept(funName) {
    let originAjax = http[funName]
    http[funName] = function (requestParam) {
        if (interceptor && interceptor(requestParam)) {
            return
        }
        originAjax(requestParam)
    }
}

intercept('ajax')
intercept('ajaxV11')

/**
 * @param p 拦截的方法，返回true则不调用原来的请求
 */
export default function setInterceptor(p) {
    interceptor = p
}


