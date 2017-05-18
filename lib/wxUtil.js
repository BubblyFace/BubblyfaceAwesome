/**
 * ACCESS_TOKEN：
 * https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=&secret=
 * TICKET:
 * https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=&type=jsapi
 */
import sha1 from 'sha1'
import http from 'Http'

let TICKET
let AppID = 'wx03bf9b7436a0b670'
let lastRefreshTime = currentTime()

const NONCE_STR = "Wm3WZYTPz0wzccnW"

require('../libs/jweixin-1.2.0')

function getTicket(delayAction) {
    http.ajax({
        methodName: '/api/v2/wxPublic/getTicket',
        params: {
            refreshFlag: 1
        },
        success: (data)=> {
            if (data.success && data.data) {
                TICKET = data.data.ticket
                AppID = data.data.appID
                lastRefreshTime = currentTime()
                delayAction()
            }
        }
    })
}

function currentTime() {
    return Math.floor(new Date().getTime() / 1000)
}

function needRefresh() {
    return !TICKET || (currentTime() - lastRefreshTime > 7200)
}

function getConfig() {
    let timestamp = currentTime()
    let url = window.location.href
    let str1 = `jsapi_ticket=${TICKET}&noncestr=${NONCE_STR}&timestamp=${timestamp}&url=${url}`
    let str2 = sha1(str1)
    return {
        timestamp: timestamp,
        nonceStr: NONCE_STR,
        signature: str2
    }
}

//TODO try again if fail
function doConfig(apiList) {
    let delay = ()=> {
        let config = getConfig()
        let obj = {
            debug: false,
            appId: AppID,
            timestamp: config.timestamp,
            nonceStr: config.nonceStr,
            signature: config.signature,
            jsApiList: [
                'checkJsApi',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
            ]
        }
        if (apiList) {
            obj.jsApiList = apiList
        }
        wx.config(obj)
    }

    if (needRefresh()) {
        getTicket(delay)
    } else {
        delay()
    }
}


export {
    doConfig
}