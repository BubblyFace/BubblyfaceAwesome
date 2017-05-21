var __formatNumber__ = function (number) {
    if (number < 10) {
        return "0" + number;
    }
    return number;
};

const util = require('./Util');

var weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

module.exports = {
    //英文简写如：12:01
    FORMAT_HM: "HH:mm",

    //英文简写如：1-12 12:01
    FORMAT_MDHM: "MM-dd HH:mm",

    //中文简写如：1月12日
    FORMAT_MD_CN: "MM月dd日",

    //中文简写如：1月12日
    FORMAT_MD: "MM-dd",

    //英文简写（默认）如：2010-12-01
    FORMAT_YMD: "yyyy-MM-dd",

    //英文简写（默认）如：2010-12
    FORMAT_YM: "yyyy-MM",

    //英文全称  如：2010-12-01 23:15
    FORMAT_YMDHM: "yyyy-MM-dd HH:mm",

    //英文全称  如：2010-12-01 23:15:06
    FORMAT_YMDHMS: "yyyy-MM-dd HH:mm:ss",

    //中文简写  如：2010年12月01日
    FORMAT_YMD_CN: "yyyy年MM月dd日",

    //中文简写  如：2010年12月01日  12时
    FORMAT_YMDH_CN: "yyyy年MM月dd日 HH时",

    //中文简写  如：2010年12月01日  12时12分
    FORMAT_YMDHM_CN: "yyyy年MM月dd日 HH时mm分",

    //中文全称  如：2010年12月01日  23时15分06秒
    FORMAT_YMDHMS_CN: "yyyy年MM月dd日  HH时mm分ss秒",

    formatDate: function (timestamp, formatType) {
        if (formatType == null) {
            formatType = "yyyy-MM-dd HH:mm:ss";
        }
        var date = new Date(parseInt(timestamp));
        return this.formatDateByDate(date, formatType);
    },

    formatDateByDate: function (date, formatType) {
        var formatResult = formatType.replace("yyyy", __formatNumber__(date.getFullYear()));
        formatResult = formatResult.replace("MM", __formatNumber__(date.getMonth() + 1));
        formatResult = formatResult.replace("dd", __formatNumber__(date.getDate()));
        formatResult = formatResult.replace("HH", __formatNumber__(date.getHours()));
        formatResult = formatResult.replace("mm", __formatNumber__(date.getMinutes()));
        formatResult = formatResult.replace("ss", __formatNumber__(date.getSeconds()));
        return formatResult;
    },

    parseDate: function (dateStr) {
        return new Date(Date.parse(dateStr.replace(/-/g, "/")));
    },

    getWeek: function (date) {
        return weekList[date.getDay()];
    },

    getTodayWeek: function () {
        return weekList[new Date().getDay()];
    },

    getWeekNum: function (date) {
        var week = date.getDay();
        if (week == 0) {
            week = 7;
        }
        return week;
    },

    getShortDateDesc: function (date) {
        var hours = date.getHours();
        if (hours >= 0 && hours < 6) {
            return "凌晨" + hours + "点";
        } else if (hours >= 6 && hours < 12) {
            return "上午" + hours + "点";
        } else if (hours >= 12 && hours < 18) {
            return "下午" + hours + "点";
        } else if (hours >= 18 && hours < 24) {
            return "晚上" + hours + "点";
        } else {
            return "时间错误";
        }
    },

    getDateDesc: function (date) {
        var nowTimestamp = new Date().getTime();
        var timestamp = date.getTime();
        var diff = nowTimestamp - timestamp;
        var fix = "前";
        if (diff < 0) {
            fix = "后";
        }

        //月
        var unit = 1000 * 60 * 60 * 24 * 30;
        if (diff / unit > 1) {
            return parseInt(diff / unit) + "个月" + fix;
        }

        //周
        var unit = 1000 * 60 * 60 * 24 * 7;
        if (diff / unit > 1) {
            return parseInt(diff / unit) + "周" + fix;
        }

        //日
        unit = 1000 * 60 * 60 * 24;
        if (diff / unit > 1) {
            return parseInt(diff / unit) + "天" + fix;
        }

        //小时
        unit = 1000 * 60 * 60;
        if (diff / unit > 1) {
            return parseInt(diff / unit) + "个小时" + fix;
        }

        //分钟
        unit = 1000 * 60;
        if (diff / unit > 1) {
            return parseInt(diff / unit) + "分钟" + fix;
        }

        //秒
        unit = 1000;
        if (diff / unit > 1) {
            return "刚刚";
        }

        return formatDate(date.getTime(), FORMAT_YMDHMS);
    },

    //常规月起始日
    getFirstDayOfNormalMonth: function (year, month) {
        var date = new Date();
        date.setDate(1);
        date.setYear(year);
        date.setMonth(month - 1);
        return date;
    },

    //常规月结束日
    getLastDayOfNormalMonth: function (year, month) {
        var date = new Date();
        date.setDate(1);
        date.setYear(year);
        date.setMonth(month);
        return new Date(date.getTime() - 1000 * 60 * 60 * 24);
    },

    //考勤月起始日
    getFirstDayOfMonth: function (year, month) {
        var kqStartDay = util.getRequestParam("kqMonthStartDay");
        if(kqStartDay == null || kqStartDay == "" || kqStartDay == "null" || kqStartDay == "1") {
            return this.getFirstDayOfNormalMonth(year, month);
        } else {
            kqStartDay = parseInt(kqStartDay);
            if(kqStartDay == null || kqStartDay <= 0) {
                return this.getFirstDayOfNormalMonth(year, month);
            }
            var date = new Date();
            date.setDate(kqStartDay);
            date.setYear(year);
            date.setMonth(month - 2);
            return date;
        }
    },

    //考勤月结束日
    getLastDayOfMonth: function (year, month) {
        var kqStartDay = util.getRequestParam("kqMonthStartDay");
        if(kqStartDay == null || kqStartDay == "" || kqStartDay == "null" || kqStartDay == "1") {
            return this.getLastDayOfNormalMonth(year, month);
        } else {
            kqStartDay = parseInt(kqStartDay);
            if (kqStartDay == null || kqStartDay <= 0) {
                return this.getLastDayOfNormalMonth(year, month);
            }
            kqStartDay--;
            var date = new Date();
            date.setDate(kqStartDay);
            date.setYear(year);
            date.setMonth(month - 1);
            return date;
        }
    },

    //是否在考勤月期间内
    isInKqMonth: function(dateDesc, year, month) {
        if(dateDesc != null && year > 0 && month >= 0) {
            var beginDate = this.getFirstDayOfMonth(year, month);
            var endDate = this.getLastDayOfMonth(year, month);
            var beginDateDesc = this.formatDateByDate(beginDate, this.FORMAT_YMD);
            var endDateDesc = this.formatDateByDate(endDate, this.FORMAT_YMD);
            return beginDateDesc.localeCompare(dateDesc) <= 0 && endDateDesc.localeCompare(dateDesc) >= 0;
        }
        return false;
    },

    addDays: function (date, days) {
        return new Date(date.getTime() + days * 1000 * 60 * 60 * 24);
    },

    getToday: function() {
        return this.formatDateByDate(new Date(), this.FORMAT_YMD);
    },

    getTodayCN: function() {
        return this.formatDateByDate(new Date(), this.FORMAT_YMD_CN);
    },

    getDateCN: function(strDate) {
        if(strDate != null) {
            var date = this.parseDate(strDate);
            return this.formatDateByDate(date, this.FORMAT_YMD_CN);
        }
        return null;
    },

    getCurMonth: function() {
        return this.formatDateByDate(new Date(), this.FORMAT_YM);
    },

    getLastDay: function(strDate) {
        if(strDate != null) {
            var date = this.parseDate(strDate);
            var lastDate = this.addDays(date, -1);
            return this.formatDateByDate(lastDate, this.FORMAT_YMD);
        }
        return null;
    },

    getNextDay: function(strDate) {
        if(strDate != null) {
            var date = this.parseDate(strDate);
            var lastDate = this.addDays(date, 1);
            return this.formatDateByDate(lastDate, this.FORMAT_YMD);
        }
        return null;
    },

    getYear: function() {
        return new Date().getFullYear();
    },

    getMonth: function() {
        return new Date().getMonth() + 1;
    },

    //获取日历和自然月的开始日期和结束日期
    getBeginEndDate: function(year, month) {
        var monthBeginDate = this.getFirstDayOfMonth(year, month);
        var monthEndDate = this.getLastDayOfMonth(year, month);

        var monthBeginDateStr = this.formatDate(monthBeginDate.getTime(), this.FORMAT_YMD);
        var monthEndDateStr = this.formatDate(monthEndDate.getTime(), this.FORMAT_YMD);

        var beginWeek = this.getWeekNum(monthBeginDate);
        var endWeek = this.getWeekNum(monthEndDate);

        //日历月视图中，开始日期和结束日期
        var calenderBeginDate = this.addDays(monthBeginDate, -1 * (beginWeek - 1));
        var calenderEndDate = this.addDays(monthEndDate, (7 - endWeek));
        var calenderBeginDateStr = this.formatDate(calenderBeginDate.getTime(), this.FORMAT_YMD);
        var calenderEndDateStr = this.formatDate(calenderEndDate.getTime(), this.FORMAT_YMD);

        return {
            monthBeginDate: monthBeginDate,
            monthEndDate: monthEndDate,
            monthBeginDateStr: monthBeginDateStr,
            monthEndDateStr: monthEndDateStr,
            calenderBeginDate: calenderBeginDate,
            calenderEndDate: calenderEndDate,
            calenderBeginDateStr: calenderBeginDateStr,
            calenderEndDateStr: calenderEndDateStr
        };
    },

    //获取年考勤的开始日期和结束日期
    getYearBeginEndDate: function(year) {
        return {
            beginDate: year + "-" + "01-01",
            beginDateCN: year + "年01月01日",
            endDate: this.getToday()
        }
    }

};
