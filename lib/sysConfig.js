/**
 * 系统参数配置
 */
module.exports = {
    //考勤签到签退切换时间
    kqSwitchTime: "16:00",
    //类型：签到
    TYPE_CHECK_IN: 1,
    //类型：签退
    TYPE_CHECK_OUT: 2,
    //类型：记录位置
    TYPE_CHECK_LOC: 3,
    //图例类型-全勤
    LEGEND_QUANQIN: 0,
    //图例类型-迟到
    LEGEND_CHIDAO: 1,
    //图例类型-早退
    LEGEND_ZAOTUI: 2,
    //图例类型-缺勤
    LEGEND_QUEQIN: 3,
    //图例类型-旷工
    LEGEND_KUANGGONG: 4,
    //图例类型-异常
    LEGEND_EXCEPTION: 5,
    //图例类型-请假
    LEGEND_LEAVE: 6,
    //图例类型-工作日打卡
    LEGEND_GONGZUORI: 7,
    //图例类型-休息日打卡
    LEGEND_XIUXIRI_DAKA: 8,
    //图例类型-出勤
    LEGEND_CHUQIN: 9,
    //图例类型-未打卡
    LEGEND_NOT_CHECK: 10,
    //全勤
    TYPE_QUANQIN: 0,
    //缺勤
    TYPE_QUEQIN: 1,
    //旷工
    TYPE_KUANGGONG: 2,
    //请假
    TYPE_QINGJIA: 3,
    //迟到
    TYPE_CHIDAO: 4,
    //早退
    TYPE_ZAOTUI: 5,
    //位置异常
    TYPE_DIZHI: 6,
    //代打卡异常
    TYPE_DAIDAKA: 7,
    //日历最大行数
    MAX_ROW: 6,
    //日历最大列数
    MAX_COL: 7,
    //每页显示的条目数量
    COUNT_PER_PAGE: 10,

    //情况说明类型：签到位置异常
    EXPLAIN_TYPE_SITE_EXCEPTION_IN: 4,
    //情况说明类型：签退位置异常
    EXPLAIN_TYPE_SITE_EXCEPTION_OUT: 5,
    //情况说明类型：签到代打卡异常
    EXPLAIN_TYPE_CHECK_EXCEPTION_IN: 6,
    //情况说明类型：签退代打卡异常
    EXPLAIN_TYPE_CHECK_EXCEPTION_OUT: 7,
    //情况说明类型：签到申请地与打卡地不一致异常
    TYPE_APPLY_SITE_EXCEPTION_IN: 8,
    //情况说明类型：签退申请地与打卡地不一致异常
    TYPE_APPLY_SITE_EXCEPTION_OUT: 9,
    //待审批的
    CHECK_NEW: 0,
    //审批通过
    CHECK_YES: 1,
    //审批不通过
    CHECK_NO: 2,
    //情况说明类型：上午缺勤
    EXPLAIN_TYPE_QUEQIN_AM: 1,
    //情况说明类型：下午缺勤
    EXPLAIN_TYPE_QUEQIN_PM: 2,
    //情况说明类型：旷工
    EXPLAIN_TYPE_KUANGGONG: 3,
    //项目进度
    PROJECT_STAGE_LIST: [{projectStageId: 1, projectStageName: "初步接触"},
        {projectStageId: 2, projectStageName: "售前跟进"},
        {projectStageId: 3, projectStageName: "招标准备"},
        {projectStageId: 4, projectStageName: "投标准备"},
        {projectStageId: 5, projectStageName: "中标实施"},
        {projectStageId: 6, projectStageName: "项目丢标"},
        {projectStageId: 7, projectStageName: "初步验收"},
        {projectStageId: 8, projectStageName: "项目终验"},
        {projectStageId: 9, projectStageName: "维护拓展"}
    ],

    getProjectStage: function (id) {
        for (var i = 0; i < this.PROJECT_STAGE_LIST.length; i++) {
            if (id == this.PROJECT_STAGE_LIST[i].projectStageId) {
                return this.PROJECT_STAGE_LIST[i];
            }
        }
        return {projectStageId: -1, projectStageName: "未知阶段"};
    },
    //销售日志类型列表
    SALELOG_TYPE_LIST: [{id: 1, name: "项目推进"}, {id: 2, name: "其他工作"}],
    getSalelogType: function (id) {
        for (var i = 0; i < this.SALELOG_TYPE_LIST.length; i++) {
            if (id == this.SALELOG_TYPE_LIST[i].id) {
                return this.SALELOG_TYPE_LIST[i];
            }
        }
        return {id: -1, name: "未知类型"};
    },

    EXPLAIN_REASON_TYPE_LIST: [{name: "其他原因", id: 1, validFlag: 1}, {name: "技术原因", id: 2, validFlag: 1}],
    //人员头像背景色
    humanPhotoColorList: ["#3E9FBA", "#20638C", "#379F77", "#6183D8", "#9678B8", "#3985BF", "#4773C4", "#2DA099"],
    //获取人员的背景色
    getPhotoColor: function(humanID) {
        var id = parseInt(humanID);
        if (isNaN(id) || id < 0) {
            id = 0;
        }
        return this.humanPhotoColorList[id % this.humanPhotoColorList.length];
    },
    //获取人员的背景色样式
    getPhotoColorCss: function(humanID) {
        return {"background": this.getPhotoColor(humanID)};
    },
    //类型：人员
    TYPE_HUMAN: 0,
    //类型：部门
    TYPE_UNIT: 1,
    getShortName: function(name) {
        if (name != null) {
            var index = name.indexOf("(");
            if(index >= 0) {
                name = name.substring(0, index);
            }
            index = name.indexOf("（");
            if(index >= 0) {
                name = name.substring(0, index);
            }
            var length = name.length;
            if (length <= 2) {
                return name;
            } else {
                return name.substring(length - 2, length);
            }
        }

        return name;
    },

    //智云开关
    IS_ZHIYUN: false,
    //判断是否是智云
    getIsZhiyun: function(){
        return this.IS_ZHIYUN;
    },

    TOKEN:"",
    getToken: function () {
        return this.TOKEN;
    },

    setToken: function (token) {
        this.TOKEN = token;
    },

    SESSIONID:"",
    getSessionID: function () {
        return this.SESSIONID;
    },

    setSessionID: function (sessionID) {
        this.SESSIONID = sessionID;
    },
    
    USERID:"",
    getUserID: function () {
        return this.USERID;
    },

    setUserID: function (userID) {
        this.USERID  = userID;
    },

    //是否显示图例图表的背景marker效果
    isShowLegendMarker: false,

    //图例列表
    getLegendList: function() {
        return [[{
            isShow: true,
            isInversQuery: true,
            isTopMenu: true,
            color: "#cccccc",
            markerColor: "#bbbbbb",
            css: {background: "#ffffff", color: "#555555", border: "#cccccc 1px solid"},
            markerCss: {background: "#bbbbbb"},
            name: "出勤",
            type: this.LEGEND_CHUQIN,
            count: 0,
            where: "(workDayFlag = 1 and kuanggongAmFlag = 0 and kuanggongPmFlag = 0 and leaveFlag = 0)",
            statRecordList: new Array()
        },{
            isShow: true,
            isInversQuery: true,
            isTopMenu: false,
            color: "#108626",
            markerColor: "#DAF2EA",
            css: {background: "#108626", color: "#ffffff"},
            markerCss: {background: "#DAF2EA"},
            name: "全勤",
            type: this.LEGEND_QUANQIN,
            count: 0,
            where: "normalFlag = 1",
            statRecordList: new Array()
        },{
            isShow: true,
            isInversQuery: true,
            isTopMenu: false,
            color: "#FF6AA9",
            markerColor: "#FADDD1",
            css: {background: "#FF6AA9", color: "#ffffff"},
            markerCss: {background: "#FADDD1"},
            name: "缺勤",
            type: this.LEGEND_QUEQIN,
            count: 0,
            where: "(queqinAmFlag = 1 or queqinPmFlag = 1)",
            statRecordList: new Array()
        }],[{
            isShow: true,
            isInversQuery: true,
            isTopMenu: false,
            color: "#FFBB37",
            markerColor: "#FFEAC3",
            css: {background: "#FFBB37", color: "#ffffff"},
            markerCss: {background: "#FFEAC3"},
            name: "迟到",
            type: this.LEGEND_CHIDAO,
            count: 0,
            where: "(chidaoAmFlag = 1 or chidaoPmFlag = 1)",
            statRecordList: new Array()
        },{
            isShow: true,
            isInversQuery: true,
            isTopMenu: false,
            color: "#DBAD55",
            markerColor: "#FFEC8B",
            css: {background: "#DBAD55", color: "#555555"},
            markerCss: {background: "#FFEC8B"},
            name: "早退",
            type: this.LEGEND_ZAOTUI,
            count: 0,
            where: "(zaotuiAmFlag = 1 or zaotuiPmFlag = 1)",
            statRecordList: new Array()
        },{
            isShow: true,
            isInversQuery: true,
            isTopMenu: false,
            color: "#d09625",
            markerColor: "#FFEAC3",
            css: {background: "#d09625", color: "#ffffff"},
            markerCss: {background: "#FFEAC3"},
            name: "异常",
            type: this.LEGEND_EXCEPTION,
            count: 0,
            where: "(inAmSiteExceptionFlag = 1 or outAmSiteExceptionFlag = 1 or inAmCheckExceptionFlag = 1 or outAmCheckExceptionFlag = 1)",
            statRecordList: new Array()
        }],[{
            isShow: true,
            isInversQuery: true,
            isTopMenu: true,
            color: "#FF425D",
            markerColor: "#FAD7DC",
            css: {background: "#FF425D", color: "#555555"},
            markerCss: {background: "#FAD7DC"},
            name: "旷工",
            type: this.LEGEND_KUANGGONG,
            count: 0,
            where: "(kuanggongAmFlag = 1 or kuanggongPmFlag = 1)",
            statRecordList: new Array()
        },{
            isShow: true,
            isInversQuery: true,
            isTopMenu: true,
            color: "#5fade2",
            markerColor: "#E4DAF1",
            css: {background: "#5fade2", color: "#555555"},
            markerCss: {background: "#E4DAF1"},
            name: "请假",
            type: this.LEGEND_LEAVE,
            count: 0,
            where: "leaveFlag = 1",
            statRecordList: new Array()
        },{
            isShow: true,
            isInversQuery: true,
            isTopMenu: true,
            color: "#4fcc67",
            markerColor: "#D9E3F7",
            css: {background: "#4fcc67", color: "#ffffff"},
            markerCss: {background: "#D9E3F7"},
            name: "打卡",
            type: this.LEGEND_XIUXIRI_DAKA,
            count: 0,
            where: "(notWorkDayInFlag = 1)",
            statRecordList: new Array()
        }]];
    },

    //兼容其他界面，之前的列表就不动了，下面添加了【未打卡】的类型
    getLegendListFlatten() {
        var list = [].concat.apply([], this.getLegendList());
        list.push({
            isShow: true,
            isInversQuery: true,
            isTopMenu: true,
            color: "#FF425D",
            markerColor: "#FAD7DC",
            css: {background: "#FF425D", color: "#555555"},
            markerCss: {background: "#FAD7DC"},
            name: "未打卡",
            type: this.LEGEND_NOT_CHECK,
            count: 0,
            where: "(weidakaflag = 1)",
            statRecordList: []
        })
        return list
    },

    getLegendColor(legendType) {
        var legendList = this.getLegendList();
        for(var i=0; i<legendList.length; i++) {
            var legendRow = legendList[i];
            for(var j=0; j<legendRow.length; j++) {
                var legend = legendRow[j];
                if(legend.type == legendType) {
                    return legend.color;
                }
            }
        }
        return "#bbbbbb";
    },
    getLegendMarkerColor(legendType) {
        if(this.isShowLegendMarker == true) {
            var legendList = this.getLegendList();
            for(var i=0; i<legendList.length; i++) {
                var legendRow = legendList[i];
                for(var j=0; j<legendRow.length; j++) {
                    var legend = legendRow[j];
                    if(legend.type == legendType) {
                        return legend.markerColor;
                    }
                }
            }
            return "#dddddd";
        } else {
            return "#ffffff";
        }
    },
    getLegendCss(legendType) {
        return {background: this.getLegendColor(legendType), color: "#ffffff"};
    },
    getLegendMarkerCss(legendType) {
        return {background: this.getLegendMarkerColor(legendType)};
    },
    plugin: {
        ACTION_REFRESH_PLUGIN_COUNT : "cn.com.egova.egovamobile.plugins.BC_GET_PLUGIN_MYTASK_COUNT",
        PLUGIN_KQ : 'Kq',
        ACTION_REFRESH_TODAY_KQ : "cn.com.egova.egovamobile.plugins.kq.refreshTodayKq",
        PLUGIN_GS: 'Gongshi'
    },
    concernType: {
        KQ_HUMAN : 1,
        SALELOG_PROJECT : 2,
        SALELOG_HUMAN : 3
    }
}
