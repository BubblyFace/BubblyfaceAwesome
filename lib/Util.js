import {plugin} from './sysConfig'
import {sendBroadcast, getMd5Array} from './egovanative'
module.exports = {
    FunStub(){
    },
    trim(text) {
        if (!text) {
            return text;
        }
        return text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    },
    isStrEmpty(text) {
        if (!text) {
            return true;
        }
        return this.trim(text) == '';
    },
    getRequestParam(val) {
        var uri = window.location.search;
        var re = new RegExp("[&?]" + val + "=([^&?]*)");
        var result = uri.match(re);
        return result ? decodeURIComponent(result[1]) : null;
    },
    clearList(list) {
        if (list) {
            list.splice(0, list.length);
        }
    },
    removeItemFromList(list, testFunc) {
        if (!list) return false;
        for (var i = 0, len = list.length; i < len; i++) {
            if (testFunc(list[i], i)) {
                list.splice(i, 1);
                return true;
            }
        }
        return false;
    },
    //获取人员名字简称
    getShortName (name) {
        if (name != null) {
            var length = name.length;
            if (length <= 2) {
                return name;
            } else {
                var end = name.indexOf('（');
                if (end < 0) {
                    end = name.indexOf('(');
                }
                if (end > 0) {
                    var start = end - 2 < 0 ? 0 : end - 2;
                    return name.substring(start, end);
                }
                return name.substring(length - 2, length);
            }
        }
        return name;
    },
    getHeaderHeight() {
        return window.__DEBUG__ ? (window.isIOS ? 64 : 50) : 0;
    },
    brToNewLine(str) {
        return str ? str.replace(/\<br\>/g, "\n") : str;
    },
    newLineToBr(str) {
        return str ? str.replace(/\n/g, "\<br\>") : str;
    },
    selectById(id) {
        return document.getElementById(id);
    },
    select(query) {
        var select = document.querySelectorAll.bind(document);
        return select(query);
    },
    resetObject(target, source) {
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    },
    getHash () {
        const href = window.location.href
        const index = href.indexOf('#')
        return index === -1 ? '' : href.slice(index + 1)
    },
    goBack() {
        window.goBack(true);
    },
    formatTitle(title, count) {
        return count > 0 ? `${title}(${count})` : title;
    },
    getIntValue: function (val) {
        if (val == null) {
            return 0;
        } else {
            return val;
        }
    },
    clone: function (obj) {
        var o;
        switch (typeof obj) {
            case 'undefined':
                break;
            case 'string'   :
                o = obj + '';
                break;
            case 'number'   :
                o = obj - 0;
                break;
            case 'boolean'  :
                o = obj;
                break;
            case 'object'   :
                if (obj === null) {
                    o = null;
                } else {
                    if (obj instanceof Array) {
                        o = [];
                        for (var i = 0, len = obj.length; i < len; i++) {
                            o.push(this.clone(obj[i]));
                        }
                    } else {
                        o = {};
                        for (var k in obj) {
                            o[k] = this.clone(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj;
                break;
        }
        return o;
    },
    getObjectByKey: function (key) {
        try {
            var obj = localStorage.getItem(key);
            return JSON.parse(obj);
        } catch (e) {
            return null;
        }
    },
    saveObject: function (key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    },
    registerMap() {

    },
    refreshPluginCount() {
        sendBroadcast(plugin.ACTION_REFRESH_PLUGIN_COUNT, {
            PluginCode: plugin.PLUGIN_KQ
        })
    },
    refreshTodaykq() {
        sendBroadcast(plugin.ACTION_REFRESH_TODAY_KQ, {
            PluginCode: plugin.PLUGIN_KQ
        })
    },
    doCallback(inst, result) {
        var callback = inst.$route.params && inst.$route.params.callback;
        callback && callback(result);
    },
    log(e) {
        if (window.__DEBUG__) {
            console.log(e)
        }
    },
    getServerUrl() {
        var serverUrl = null;
        var host = window.location.protocol + "//" + window.location.host;
        var array = window.location.href.split(host);
        if (array != null && array.length > 1) {
            var fixUrl = array[1];
            array = fixUrl.split("/");
            if (array != null && array.length > 1) {
                serverUrl = host + "/" + array[1];
            }
        }
        return serverUrl;
    },
    getV2ServerUrl(){
        //内蒙东胜
        return "http://124.67.69.106:88/zxserver";
        //益阳
        // return "http://27.17.34.21:8088/MobileInspectServer/";
        //荆州区
        // return "http://221.233.43.46:8182/eGovaZXServer";
        //测试
        // return "http://192.168.32.13:8080/nmzx";
    },
    getProductID(){
        return "68";
    },
    md5(message) {
        var md5 = require('md5');
        var result = md5(message);
        var byteSeq = getMd5Array().split('');

        for (var i = 0; i < result.length; i++) {
            result[i] = byteSeq[parseInt(result[i], 16)];
        }
        return result;
    },
    insertCss(code) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = code;
        document.getElementsByTagName("head")[0].appendChild(style);
    },
    getStartDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate + " 00:00:00";
        return currentdate;
    },
    getNowDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
        return currentdate;
    }
};