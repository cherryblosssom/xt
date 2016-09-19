$(function () {
    xt.ResizeHeight(1500);
    Main.InitView();
});
var alarm_tb;
(function () {
    window.Main = {
        InitView: initView
    };

    function initView() {
        initAlarmTable();
        $("all-alarm>table").css("border-top","none");
        initAlarmBox();

        // 在线用户近5小时 
        initUserRealLine();

        // 时实在线
        initRealDashboard();

        // VIP 得分
        initVipLine();

        // VIP 当前得分（仪表盘）
        initVipDashboard();

        // 流量饼图
        initDataPie();
        
        // 流量走势图
        initDataLine();
    }

    // 时实在线
    function initRealDashboard() {
        var url = "/Modules/Common/Common.ashx?action=GetCount";
        // 在线人数
        xt.xtpost(url,{sql:"SELECT SUM(USERCOUNT) USERCOUNT FROM (SELECT STIME,SUM(小区总RRC连接统计) USERCOUNT FROM TB_PM_RRC_HW_TMP GROUP BY STIME UNION ALL SELECT STIME,ROUND(SUM(C373200030)) USERCOUNT FROM TB_PM_RRC_ZTE_TMP GROUP BY STIME)"},function(data){
           xt.InitGauge("userRealGauge",(data/1000).toFixed(2),"");
        });
    }

    // VIP 得分
    function initVipLine() {
        // VIP 评分 (ROUND(((SUM(SUCCESSRATE) + SUM(ECIO) + SUM(AVERAGEFORWARD)) / 3)/COUNT(1), 2)) 得分
        // var lineSql = "SELECT A.STIME 日期, ROUND(SUM(SUCCESSRATE * 10) + SUM(ECIO * 10) + SUM(AVERAGEFORWARD * 10) + SUM(SUCCESSRATE * 10) + SUM(CDRPRIOR * 10) + SUM(CDRREVERSE * 10) + SUM(ABNORMALTIMES * 20) / 80, 2) 得分 FROM (SELECT TO_CHAR(STIME, 'YYYY-MM-DD') STIME, CASE WHEN SUM(COUNTER19) = 0 THEN 0 ELSE ROUND(SUM(COUNTER20) / SUM(COUNTER19), 2) END SUCCESSRATE, CASE WHEN SUM(COUNTER19) = 0 THEN 0 ELSE ROUND(SUM(COUNTER21) / SUM(COUNTER19), 2) END ECIO, DECODE(SUM(CALLNUM), 0, 0, ROUND((1 - (SUM(COUNTER1) / SUM(CALLNUM))) * 100, 2)) AVERAGEFORWARD, CASE WHEN (SUM(COUNTER26) + SUM(COUNTER27) + SUM(COUNTER28) + SUM(COUNTER29) + SUM(COUNTER30) + SUM(COUNTER25)) = 0 THEN 0 ELSE ROUND(((SUM(COUNTER30)) / (SUM(COUNTER26) + SUM(COUNTER27) + SUM(COUNTER28) + SUM(COUNTER29) + SUM(COUNTER30) + SUM(COUNTER25))) * 100, 2) END AVERAGSCORE, SUM(COUNTER22) CDRPRIOR, SUM(COUNTER23) CDRREVERSE, SUM(COUNTER31) ABNORMALTIMES FROM (SELECT STIME, B.MDN, CALLNUM, COUNTER1, COUNTER19, COUNTER20, COUNTER21, COUNTER25, COUNTER26, COUNTER27, COUNTER28, COUNTER29, COUNTER30, COUNTER22, COUNTER23, COUNTER31 FROM TB_COM_HW_1X_MIDDLE_DAY A JOIN TB_DATA_HLR B ON A.IMSI = B.IMSI AND B.MDN IN (SELECT MDN FROM TB_ASSESS_GROUP_DETAIL WHERE GROUP_ID = '4589970b31484262bcf5a8feea3f3775') WHERE A.STIME BETWEEN sysdate - 7 AND sysdate UNION ALL SELECT STIME, B.MDN, CALLNUM, COUNTER1, COUNTER19, COUNTER20, COUNTER21, COUNTER25, COUNTER26, COUNTER27, COUNTER28, COUNTER29, COUNTER30, COUNTER22, COUNTER23, COUNTER31 FROM TB_COM_ZTE_1X_MIDDLE_DAY A JOIN TB_DATA_HLR B ON A.IMSI = B.IMSI AND B.MDN IN (SELECT MDN FROM TB_ASSESS_GROUP_DETAIL WHERE GROUP_ID = '4589970b31484262bcf5a8feea3f3775') WHERE A.STIME BETWEEN sysdate - 7 AND sysdate) GROUP BY to_char(STIME, 'YYYY-MM-DD') ORDER BY STIME) A GROUP BY STIME";
        var lineSql = "SELECT A.STIME 日期, (ROUND(((SUM(SUCCESSRATE) + SUM(ECIO) + SUM(AVERAGEFORWARD)) / 3)/COUNT(1), 2)) 得分 FROM (SELECT TO_CHAR(STIME, 'YYYY-MM-DD') STIME, CASE WHEN SUM(COUNTER19) = 0 THEN 0 ELSE ROUND(SUM(COUNTER20) / SUM(COUNTER19), 2) END SUCCESSRATE, CASE WHEN SUM(COUNTER19) = 0 THEN 0 ELSE ROUND(SUM(COUNTER21) / SUM(COUNTER19), 2) END ECIO, DECODE(SUM(CALLNUM), 0, 0, ROUND((1 - (SUM(COUNTER1) / SUM(CALLNUM))) * 100, 2)) AVERAGEFORWARD, CASE WHEN (SUM(COUNTER26) + SUM(COUNTER27) + SUM(COUNTER28) + SUM(COUNTER29) + SUM(COUNTER30) + SUM(COUNTER25)) = 0 THEN 0 ELSE ROUND(((SUM(COUNTER30)) / (SUM(COUNTER26) + SUM(COUNTER27) + SUM(COUNTER28) + SUM(COUNTER29) + SUM(COUNTER30) + SUM(COUNTER25))) * 100, 2) END AVERAGSCORE, SUM(COUNTER22) CDRPRIOR, SUM(COUNTER23) CDRREVERSE, SUM(COUNTER31) ABNORMALTIMES FROM (SELECT STIME, B.MDN, CALLNUM, COUNTER1, COUNTER19, COUNTER20, COUNTER21, COUNTER25, COUNTER26, COUNTER27, COUNTER28, COUNTER29, COUNTER30, COUNTER22, COUNTER23, COUNTER31 FROM TB_COM_HW_1X_MIDDLE_DAY A JOIN TB_DATA_HLR B ON A.IMSI = B.IMSI AND B.MDN IN (SELECT MDN FROM TB_ASSESS_GROUP_DETAIL WHERE GROUP_ID = '4589970b31484262bcf5a8feea3f3775') WHERE A.STIME BETWEEN sysdate - 7 AND sysdate UNION ALL SELECT STIME, B.MDN, CALLNUM, COUNTER1, COUNTER19, COUNTER20, COUNTER21, COUNTER25, COUNTER26, COUNTER27, COUNTER28, COUNTER29, COUNTER30, COUNTER22, COUNTER23, COUNTER31 FROM TB_COM_ZTE_1X_MIDDLE_DAY A JOIN TB_DATA_HLR B ON A.IMSI = B.IMSI AND B.MDN IN (SELECT MDN FROM TB_ASSESS_GROUP_DETAIL WHERE GROUP_ID = '4589970b31484262bcf5a8feea3f3775') WHERE A.STIME BETWEEN sysdate - 7 AND sysdate) GROUP BY to_char(STIME, 'YYYY-MM-DD') ORDER BY STIME) A GROUP BY STIME";
        xt.xtpost("/Modules/Common/Common.ashx?action=GetList",{sql:lineSql},function(data){
            var dt = [];
            var x = [];
            if(data){
                var d = data;
                for(var i in d){
                    dt.push(d[i]["得分"]);
                    x.push(d[i]["日期"]);
                }
                // VIP 评分
                var days2 = [0, 1, 2, 3, 4, 5, 6];
                xt.InitLine('userPerceLine', '用户总分', days2, x, x, dt, 'vip用户近7天评分趋势', '分');
            }

        });
    }

    // VIP用户当前得分
    function initVipDashboard() {
        var sql = "SELECT (ROUND(((SUM(SUCCESSRATE) + SUM(ECIO) + SUM(AVERAGEFORWARD)) / 3)/COUNT(1), 2)) 得分 FROM (SELECT TO_CHAR(STIME, 'YYYY-MM-DD') STIME, CASE WHEN SUM(COUNTER19) = 0 THEN 0 ELSE ROUND(SUM(COUNTER20) / SUM(COUNTER19), 2) END SUCCESSRATE, CASE WHEN SUM(COUNTER19) = 0 THEN 0 ELSE ROUND(SUM(COUNTER21) / SUM(COUNTER19), 2) END ECIO, DECODE(SUM(CALLNUM), 0, 0, ROUND((1 - (SUM(COUNTER1) / SUM(CALLNUM))) * 100, 2)) AVERAGEFORWARD, CASE WHEN (SUM(COUNTER26) + SUM(COUNTER27) + SUM(COUNTER28) + SUM(COUNTER29) + SUM(COUNTER30) + SUM(COUNTER25)) = 0 THEN 0 ELSE ROUND(((SUM(COUNTER30)) / (SUM(COUNTER26) + SUM(COUNTER27) + SUM(COUNTER28) + SUM(COUNTER29) + SUM(COUNTER30) + SUM(COUNTER25))) * 100, 2) END AVERAGSCORE, SUM(COUNTER22) CDRPRIOR, SUM(COUNTER23) CDRREVERSE, SUM(COUNTER31) ABNORMALTIMES FROM (SELECT STIME, B.MDN, CALLNUM, COUNTER1, COUNTER19, COUNTER20, COUNTER21, COUNTER25, COUNTER26, COUNTER27, COUNTER28, COUNTER29, COUNTER30, COUNTER22, COUNTER23, COUNTER31 FROM TB_COM_HW_1X_MIDDLE_DAY A JOIN TB_DATA_HLR B ON A.IMSI = B.IMSI AND B.MDN IN (SELECT MDN FROM TB_ASSESS_GROUP_DETAIL WHERE GROUP_ID = '4589970b31484262bcf5a8feea3f3775') WHERE A.STIME BETWEEN sysdate - 7 AND sysdate UNION ALL SELECT STIME, B.MDN, CALLNUM, COUNTER1, COUNTER19, COUNTER20, COUNTER21, COUNTER25, COUNTER26, COUNTER27, COUNTER28, COUNTER29, COUNTER30, COUNTER22, COUNTER23, COUNTER31 FROM TB_COM_ZTE_1X_MIDDLE_DAY A JOIN TB_DATA_HLR B ON A.IMSI = B.IMSI AND B.MDN IN (SELECT MDN FROM TB_ASSESS_GROUP_DETAIL WHERE GROUP_ID = '4589970b31484262bcf5a8feea3f3775') WHERE A.STIME BETWEEN sysdate - 7 AND sysdate) GROUP BY to_char(STIME, 'YYYY-MM-DD') ORDER BY STIME) A";
        var url = "/Modules/Common/Common.ashx?action=GetCount";
        // 在线人数
        xt.xtpost(url,{sql:sql},function(data){
           xt.InitDoubleGauge("userPerceGauge", data, data-3-(parseInt(5*Math.random())));
        });
    }

    // 本月片区流量分布
    function initDataPie() {
        var sql = " SELECT * FROM (SELECT A.*, ROWNUM RN FROM (select B.AREA AS 片区, trunc(COM_Counter0208/1024,2) 流量 FROM (select to_char(TB_PM_AREA_DAY_P1.stime, 'YYYY') || '年第' || to_char(TB_PM_AREA_DAY_P1.stime, 'FMMM') || '月' as 月, TB_PM_AREA_DAY_P1.CITYID, TB_PM_AREA_DAY_P1.AREAID, Sum(ROUND(TB_PM_AREA_DAY_P1.Counter0292, 5)) COM_Counter0262, Sum(ROUND(TB_PM_AREA_DAY_P1.Counter0293, 5)) COM_Counter0263, Sum(ROUND(TB_PM_AREA_DAY_P1.Counter0080 + TB_PM_AREA_DAY_P1.Counter0081, 3)) COM_Counter0208, Sum(ROUND(TB_PM_AREA_DAY_P1.Counter0003, 3)) COM_Counter0062, Sum(ROUND(TB_PM_AREA_DAY_P1.Counter0013, 3)) COM_Counter0072, max(bs.BTSCOUNT) BTSCOUNT, max(bs.SECTORCOUNT) SECTORCOUNT FROM TB_PM_AREA_DAY_P1 TB_PM_AREA_DAY_P1 LEFT JOIN (SELECT CITYID, STIME, AREAID, SUM(基站数) as BTSCOUNT, SUM(小区数) AS SECTORCOUNT FROM TB_PM_CELL_NUM_AREA T where 1 = 1 and (T.CITYID IN (23)) and (T.stime between trunc(sysdate, 'mm') and sysdate) GROUP BY CITYID, STIME, AREAID) bs ON bs.CITYID = TB_PM_AREA_DAY_P1.CITYID AND bs.STIME = TB_PM_AREA_DAY_P1.stime AND bs.AREAID = TB_PM_AREA_DAY_P1.AREAID where 1 = 1 and (TB_PM_AREA_DAY_P1.CITYID IN (23)) and (TB_PM_AREA_DAY_P1.stime between trunc(sysdate, 'mm') and sysdate) GROUP BY to_char(TB_PM_AREA_DAY_P1.stime, 'YYYY') || '年第' || to_char(TB_PM_AREA_DAY_P1.stime, 'FMMM') || '月', TB_PM_AREA_DAY_P1.CITYID, TB_PM_AREA_DAY_P1.AREAID) A LEFT JOIN TB_COMM_LTE_OBJECT_TREE B ON A.AREAID = B.AREAID AND A.CITYID = B.CITYID WHERE B.OBJECTTYPE = 'AREA' order by 流量 desc ) A) WHERE RN <= 6 AND RN >= 0";
        xt.xtpost("/Modules/Common/Common.ashx?action=GetList",{sql:sql},function(data){
            var donutData = [];
            var cl = ["#f56954","#00a65a","#f39c12","#00c0ef","#3c8dbc","#d2d6de"];
            var j = 0
            if(data){
                var d = data;
                for(var i in d){
                    donutData.push({label: d[i]["片区"], data: d[i]["流量"], color: cl[j++]});
                }

                $.plot("#donut-chart", donutData, {
                    series: {
                    pie: {
                        show: true,
                        radius: 1,
                        innerRadius: 0.5,
                        label: {
                        show: true,
                        radius: 2 / 3,
                        formatter: labelFormatter,
                        threshold: 0.1
                        }

                    }
                    },
                    legend: {
                    show: false
                    }
                });
            }

        });
    }

    function initDataLine() {
        var sql = "select to_char(A.日期,'MM-DD') 日期, trunc(COM_Counter0208/1024,2) 流量 FROM (select TB_PM_CITY_DAY_P1.stime as 日期, Sum(ROUND(TB_PM_CITY_DAY_P1.Counter0292, 5)) COM_Counter0262, Sum(ROUND(TB_PM_CITY_DAY_P1.Counter0293, 5)) COM_Counter0263, Sum(ROUND(TB_PM_CITY_DAY_P1.Counter0080 + TB_PM_CITY_DAY_P1.Counter0081, 3)) COM_Counter0208, Sum(ROUND(TB_PM_CITY_DAY_P1.Counter0003, 3)) COM_Counter0062, Sum(ROUND(TB_PM_CITY_DAY_P1.Counter0013, 3)) COM_Counter0072, Sum(bs.BTSCOUNT) BTSCOUNT, Sum(bs.SECTORCOUNT) SECTORCOUNT FROM TB_PM_CITY_DAY_P1 TB_PM_CITY_DAY_P1 LEFT JOIN (SELECT CITYID, STIME, SUM(基站数) as BTSCOUNT, SUM(小区数) AS SECTORCOUNT FROM TB_PM_CELL_NUM_CITY T where 1 = 1 and (T.CITYID IN (23)) and (T.stime between sysdate - 8 and sysdate) GROUP BY CITYID, STIME) bs ON bs.CITYID = TB_PM_CITY_DAY_P1.CITYID AND bs.STIME = TB_PM_CITY_DAY_P1.stime where 1 = 1 and (TB_PM_CITY_DAY_P1.CITYID IN (23)) and (TB_PM_CITY_DAY_P1.stime between sysdate - 11 and sysdate) GROUP BY TB_PM_CITY_DAY_P1.stime) A order by 日期 asc";
        xt.xtpost("/Modules/Common/Common.ashx?action=GetList",{sql:sql},function(data){
            var dt = [];
            var x = [];
            if(data){
                var d = data;
                for(var i in d){
                    dt.push(d[i]["流量"]);
                    x.push(d[i]["日期"]);
                }

                var days3 = [0, 1, 2, 3, 4];
                xt.InitLine('flowLine', '流量', days3, x, x, dt, '近10天流量趋势', 'GB');
            }

        });
    }
   /*
   * Custom Label formatter
   * ----------------------
   */
  function labelFormatter(label, series) {
    return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
        + label
        + "<br>"
        + Math.round(series.percent) + "%</div>";
  }
    // 用户在线曲线
    function initUserRealLine() {
        var sql = "SELECT TO_CHAR(STIME, 'HH24') 日期, ROUND(SUM(小区总RRC连接统计)/10000,2) 用户 FROM TB_PM_RRC_HW WHERE STIME IN (SELECT STIME FROM (SELECT STIME, ROW_NUMBER() OVER(PARTITION BY TO_CHAR(STIME, 'YYYYMMDDHH24') ORDER BY STIME) RN FROM TB_PM_RRC_HW PARTITION(PD_"+xt.FormatDate(new Date(),'yyyyMMdd')+")) WHERE RN = 1) AND STIME >= (sysdate - 5 / 24) GROUP BY STIME ORDER BY STIME";            
        xt.xtpost("/Modules/Common/Common.ashx?action=GetList",{sql:sql},function(data){
            var dt = [];
            var x = [];
            if(data){
                var d = data;
                for(var i in d){
                    dt.push(d[i]["用户"]);
                    x.push(d[i]["日期"]);
                }

                // VIP 评分
                var days1 = [0, 1,2,3,4,5,6];
                xt.InitLine('userRealLine', '在线人数', days1, x, x, dt,'近5小时在线人数趋势', '万次');
            }

        });

    }

    // 初始化告警和基站信息
    function initAlarmBox(){
        var url = "/Modules/Common/Common.ashx?action=GetCount";
        // 所有基站
        xt.xtpost(url,{sql:"SELECT COUNT(*) FROM TB_BASE_LTE_BTS"},function(data){
            $("#all-bts").html(data);
        });
        // 所有扇区
        xt.xtpost(url,{sql:"SELECT COUNT(*) FROM TB_BASE_LTE_SECTOR"},function(data){
            $("#all-alarms").html(data);
        });

        // 所有告警基站
        xt.xtpost(url,{sql:"SELECT SUM(COUNTALARM) FROM ( SELECT COUNT(*) COUNTALARM FROM TB_LTE_ALARM_HW_REALTIME WHERE SEVERITYID = 1 AND ENODEBID = CELLID UNION ALL SELECT COUNT(*) COUNTALARM FROM TB_LTE_ALARM_REALTIME WHERE SEVERITYID = 1 AND ENODEBID = CELLID)"},function(data){
            $("#err-bts").html(data);
        });

        // 所有告警小区
        xt.xtpost(url,{sql:"SELECT SUM(COUNTALARM) FROM ( SELECT COUNT(*) COUNTALARM FROM TB_LTE_ALARM_HW_REALTIME WHERE SEVERITYID = 1 AND ENODEBID != CELLID UNION ALL SELECT COUNT(*) COUNTALARM FROM TB_LTE_ALARM_REALTIME WHERE SEVERITYID = 1 AND ENODEBID != CELLID)"},function(data){
            $("#err-alarm").html(data);
        });
    }

    // 初始化表格
    function initAlarmTable() {
        alarm_tb = xt.initDataTable("#all-alarm", {
            "autoWidth": true,
            "iDisplayLength": 8, //默认每页数量
            "ajax":{
                "url":"/Modules/Common/Common.ashx?action=GetDataTable",
                "type":"POST",
                "data":function(d){
                    $.extend(d,{"sql":"SELECT * FROM V_AREA_REAL_INFO A LEFT JOIN TB_BASE_AREA_SORT B ON A.PLACENAME = B.AREA ORDER BY B.ID ASC"},true);
                }
            },
            "columns": [
                        { title: '分公司', data: 'PLACENAME' },
                        { title: '小区数', data: 'SECTORCOUNT' ,render: xt.FormartTextRight},
                        { title: '流量(TB)', data: 'TOTALFLOW',render: xt.FormartTextRight },
                        { title: '在线用户', data: 'USERCOUNT',render: xt.FormartTextRight },
                        { title: '小区严重告警', data: 'ALARMSECTORCOUNT',render: xt.FormartTextRight},
                        { title: '下行PRB利用率', data: 'DOWNPRBRATE' ,render: xt.FormartTextRight}
	           ]
        });
    }


})();