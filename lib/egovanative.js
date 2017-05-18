function nativeMeth(meth) {
    return window.jsInterface && window.jsInterface[meth];
}
var jsi = window.jsInterface || {}

//Note:在iOS中使用 nativeMeth('close') && jsi.close() 无效
module.exports = {
    isDefMethod: function (meth) {
        return !!nativeMeth(meth);
    },

    close: function () {
        jsi.close && jsi.close();
    },

    loadFinish: function () {
        jsi.loadFinish && jsi.loadFinish();
    },

    getJuniorHumanList: function (contactID, success, fail) {
        if (jsi.getJuniorHumanList && success) {
            var result = jsi.getJuniorHumanList(contactID);
            if (window.isIOS) {
                result && success(result);
            } else {
                result && success(JSON.parse(result));
            }
        }
    },

    getHuman: function (contactID, success, fail) {
        if (jsi.getHuman && success) {
            var result = jsi.getHuman(contactID);
            result && success(JSON.parse(result));
        }
    },

    startContactChooseActivity: function (paramMap) {
        var method = jsi && jsi.startContactChooseActivity;

        if (window.isIOS) {
            jsi.startContactChooseActivity && paramMap.iosCallback
            && jsi.startContactChooseActivity(function (resultSet) {
                paramMap.iosCallback(JSON.parse(resultSet));
            });
        } else {
            method && paramMap.androidCallbackMethod
            && jsi.startContactChooseActivity(paramMap.androidCallbackMethod);
        }
    },

    startSingleChat: function (contactID) {
        jsi.startChat && jsi.startChat(contactID);
    },

    bindNavBar: function (title, menu, onMenuClickListener) {
        jsi.bindNavBar && jsi.bindNavBar(title, menu ? menu : '');
        window.onMenuClick = onMenuClickListener;
    },

    sendBroadcast: function (action, obj) {
        jsi.notifyAction && jsi.notifyAction(action, JSON.stringify(obj));
    },

    sendMsg: function (humanId, msg) {
        jsi.startChatWithMsg && jsi.startChatWithMsg(humanId, msg);
    },
    getEncodeText: function () {
    },
    getMd5Array: function () {
    },
    /** log到本地 */
    log: function (content) {
        jsi.log && jsi.log(content);
    },
    goContactDetail: function (humanId) {
        jsi.goContactDetail && jsi.goContactDetail(humanId);
    },
    selectTime: function (callback, hour, minute) {
        jsi.selectTime && jsi.selectTime(callback, hour, minute);
    },
    /** 浏览地图 */
    browserMap: function (callback) {
        jsi.browserMap && jsi.browserMap(callback);
    },
    /** 综合评价反查 */
    gotoListDetail: function (callback, object) {
        jsi.gotoListDetail && jsi.gotoListDetail(callback,object);
    },
    /** 防篡改方式添加图片 */
    pickEncryptImages: function (callback) {
        jsi.pickEncryptImages && jsi.pickEncryptImages(callback);
    }

}
