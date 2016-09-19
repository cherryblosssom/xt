"use strict";
require.config({
	baseUrl : "/js",
	paths : {
		jquery : "plugins/jQuery/jquery-2.2.3.min",
		bootstrap : "bootstrap/js/bootstrap.min",
		// "plugins/slimScroll/jquery.slimscroll.min","plugins/fastclick/fastclick",,"admin-lte/js/app-set"
		admin_lte : "admin-lte/js/app.min",
		layer : "plugins/layer/layer",
		datatables : "plugins/datatables/jquery.dataTables.min",
		datatables_bootstrap:"plugins/datatables/dataTables.bootstrap.min",
		datatables_uikit:"https://cdn.datatables.net/1.10.12/js/dataTables.uikit.min",
		datatables_autoFill : "plugins/datatables/extensions/AutoFill/js/dataTables.autoFill.min",
		select2 : "plugins/select2/select2.full.min",
		ztree : "plugins/zTree_v3/js/jquery.ztree.all.min"
	}
});

(function() {
	window.xt = {
		post : post,
		// POST 请求
		// 参数列表
		// ① url 请求地址
		// ② data 参数
		// ③ success 成功回调函数
		// 例子：
		// var url = "http://localhost:8080/User/Get";
		// xt.xtpost(url,{"username":"admin","password":"wnoc123#"},function(data){});
		// xt.xtpost(url,function(data){});
		xtpost : xtpost,
		// 同步请求
		// async: false
		synpost : synpost,
		// 设置页面高度
		ResizeHeight : ResizeHeight,

		// 初始化DataTable
		initDataTable : initDataTable,
		initTable : initTable,

		// 文本右对齐
		FormatCellRightAlign : FormatCellRightAlign,
		// 显示行号
		BindTableRowNum : BindTableRowNum,
		// 初始化
		InitDateRangePicker : InitDateRangePicker,
		// 初始化折线图
		InitLine : InitLine,
		InitChartLine : InitChartLine,
		InitChartData : InitChartData,
		// 初始化仪表盘
		InitGauge : InitGauge,
		// 初始化2个仪表盘
		InitDoubleGauge : InitDoubleGauge,

		// 字符串转换为日期
		str2Date : str2Date,
		// 获取当前日期
		getNowFormatDate : getNowFormatDate,
		// 日期格式化
		FormatDate : FormatDate,
		// 添加天
		AddDays : AddDays,
		// 添加小时
		AddHours : AddHours,

		// 获取地址栏参数
		GetQueryString : GetQueryString,
		
		// 提示框
		alert : alert,
		// 确认框
		confirm : confirm,
		// 初始化tree
		initTree : initTree
	};

	// 页面初始化方法
	require([ 'jquery', 'bootstrap', 'admin_lte' ], function($) {
		!function($){
		    $.fn.extend({
		        /*
		          把JSON数据填充进表单，兼容easyui渲染过的表单
		        * 20140203 reconstructed by p2227
		        * 参数：
		        * relateTable:关系表，key-value对象，即JSON数据与表单有不对应时的另外对照表
		        * data:要填充的JSON数据
		        * callBack:填充完数据后的回调函数，一般说来填充完数据要进行表单验证
		        *
		        * 用法：
		        * $('form').loadForm({data:{key,value}});
		        * */
		        loadForm:function(conf){
		            conf = conf || {};
		            conf.relateTable = conf.relateTable || {};

		            var rt = conf.relateTable;
		            var formObj = this;
		            var jsonData = conf.data;
		            var newData = {};
		            function fill1EasyUI(dom,data1){ //填充值到一个easyUI表单对象上
		                //目测针对combobox和datebox，其他表单对象 建议调用 easyUI本身的 form.load方法
		                var eDom = $("[comboName='" + dom.name + "']",formObj); //找到easyUI起作用的dom元素（不带name）
		                if(eDom.length<=0) return;

		                var type = eDom[0].className.match(/(\w*?)-f/); //该dom的类上第一个带 "任意字母-f"的类
		                if(type && type.length>0){
		                    type = type[1];
		                    if(/datebox/i.test(type)){
		                        data1 = flitDate(data1);
		                    }
		                    if (eDom[type]("options").multiple){
		                        eDom[type]("setValues", data1.replace(/\s*,\s*/g,",").split(","));
		                    } else {
		                        eDom[type]("setValue", data1);
		                    }
		                }else{
		                    if(eDom.next("span.datebox").length>0){ //for IE7 IE6
		                        eDom.datebox("setValue", flitDate(data1));
		                    }
		                }
		            }

		            /* 输入：2012-04-04 00:00:00,2012.2.2,2012/4/7
		             * 输出：2012-04-04
		             * */
		            function flitDate(dStr){
		                if(dStr){
		                    var dreg = /(\d{4})([-\/.])(\d{1,2})\2(\d{1,2})/;
		                    var sval = dStr.match(dreg)[0].replace(dreg,"$1-$3-$4");
		                    return sval;
		                }else{
		                    return dStr;
		                }
		            }

		            function fill1Simple(dom,data1){
		                if(dom == undefined){ return;}

		                if(dom.className.match(/combo-value/i)){
		                    fill1EasyUI(dom,data1); //按照easyUI的法则填充数据
		                }else{
		                    var $dom = $(dom);
		                    if($dom.is("span.om-combo>input")){
		                        $dom.omCombo('value',data1)
		                    }else{
		                        dom.value = data1; //普通的html元素赋值
		                    }
		                }
		            }

		            //把网页上需要额外对照的数据也加到填充数据中
		            $.each(rt,function(key,value){
		                if(jsonData[key]){
		                    jsonData[value.replace(/\\*/g,'')]=jsonData[key];
		                }
		            });

		            /* 填充数据的主函数
		             *
		             * 是用表单为主循环还是数据为主循环快？？？要做测试。
		             * 测试结果：以表单为主循环，必需将EasyUI和一般表单项分开处理
		             *
		             * 必须要把radio,checkbox放在同一起处理，因为你也不清楚对照表里面的项目是text还是radio
		             * */
		            var nameflag="";//name标记  如果找到有name相同的 data，那就设置标记，以便循环只运行一次
		            $("input[name],textArea[name],select[name]",formObj).each(function(){
		                //在实际项目中，有这样的需要：JSON数据key总是大写，也要填充到页面；按表单中属性为fillBack的去填充，故在此进行扩充
		                var filldata1 = jsonData[this.name] || jsonData[this.name.toUpperCase()] || jsonData[this.getAttribute("fillBack")];
		                if(jsonData[this.name] === 0 || jsonData[this.name.toUpperCase()] === 0 || jsonData[this.getAttribute("fillBack")] === 0){
		                    filldata1 = 0;
		                }
		                if(filldata1 === undefined || filldata1 === "" || filldata1 === null|| filldata1 === "null"){
		                    return;
		                }else{
		                    if(/radio/i.test(this.getAttribute("type"))){
		                        if(this.name==nameflag){ return; }
		                        nameflag = this.name;
		                        $("input[name='"+ nameflag +"'][value=" + $.trim(filldata1) + "]").prop("checked",true);
		                    }else if(/checkbox/i.test(this.getAttribute("type"))){
		                        if(this.name==nameflag){ return; }
		                        nameflag = this.name;

		                        $("input[name='"+ nameflag +"']").prop("checked",false)//首先要清空原有数据
		                        $.each(filldata1.split(','),function(k,v){
		                            $("input[name='"+ nameflag +"'][value='" + $.trim(v) + "']").prop("checked",true);
		                        })
		                    }else{
		                        this.value = "";//首先要清空原有数据
		                        fill1Simple(this,filldata1);
		                    }
		                }
		            });

		            if(typeof conf.callBack == "function"){
		                conf.callBack(jsonData);
		            }
		        }
		    });
		}($);
		
		// 拓展【表单对象转换为Json】
		$.fn.serializeObject = function()
		 {
		     var o = {};
		     var a = this.serializeArray();
		     $.each(a, function() {
		         if (o[this.name] !== undefined){
		             if (!o[this.name].push) {
		                 o[this.name] = [o[this.name]];
		             }
		             o[this.name].push(this.value || '');
		         } else {
		             o[this.name] = this.value || '';
		         }
		     });
		     return o;
		 };
		 
		$(function() {
			init();
		});
	});

	// 配置常量
	var OPTION = {
		daterangepicker : {
			"timePickerSeconds" : false,
			"dateLimit" : {
				"days" : 30
			},
			"ranges" : {
				"30天" : [ FormatDate(AddDays(new Date(), -30), "yyyy-MM-dd"),
						FormatDate(new Date(), "yyyy-MM-dd") ]
			},
			"locale" : {
				"direction" : "rtl",
				"format" : "YYYY-MM-DD",
				"separator" : " - ",
				"applyLabel" : "确认",
				"cancelLabel" : "取消",
				"fromLabel" : "开始时间",
				"toLabel" : "结束时间",
				"customRangeLabel" : "自定义",
				"daysOfWeek" : [ '日', '一', '二', '三', '四', '五', '六' ],
				"monthNames" : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月',
						'八月', '九月', '十月', '十一月', '十二月' ],
				"firstDay" : 1
			},
			"alwaysShowCalendars" : true,
			"startDate" : FormatDate(AddDays(new Date(), -1), "yyyy-MM-dd"),
			"endDate" : FormatDate(new Date(), "yyyy-MM-dd")
		},
		DATA_OPTION : {
			"ordering" : false,
			"processing" : true,
			"serverSide" : true,
			"searching" : false, // 显示搜索框
			"bLengthChange" : false, // 改变每页显示数据数量
			"language" : {
				"decimal" : ",",
				"thousands" : ".",
				"sProcessing" : "处理中...",
				"sLengthMenu" : "显示 _MENU_ 项结果",
				"sZeroRecords" : "没有匹配结果",
				"sInfo" : "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
				"sInfoEmpty" : "显示第 0 至 0 项结果，共 0 项",
				"sInfoFiltered" : "(由 _MAX_ 项结果过滤)",
				"sInfoPostFix" : "",
				"sSearch" : "搜索:",
				"sUrl" : "",
				"sEmptyTable" : "表中数据为空",
				"sLoadingRecords" : "载入中...",
				"sInfoThousands" : ",",
				"oPaginate" : {
					"sFirst" : "首页",
					"sPrevious" : "上页",
					"sNext" : "下页",
					"sLast" : "末页"
				},
				"oAria" : {
					"sSortAscending" : ": 以升序排列此列",
					"sSortDescending" : ": 以降序排列此列"
				}
			}
		}
	};

	function init() {
		// select2
		var s = $(".select2");
		if (s.length > 0 ) {
			require(["select2"],function() {
				$(".select2").select2();
			});
		}
		
		// 初始化datatables
		var d = $("div[type='datatable']");
		if (d.length > 0) {
			var id= "#" + d.attr("id");
			var url = d.attr("url");
			var c   = eval('(' +  d.attr("columns") + ')');
			xt.initTable(id,url,{},c,{});
		}
	}

	// 字符串转换为日期
	function str2Date(str) {
		str.replace(/-/g, "/");
		return new Date(str);
	}

	// 初始化仪表盘（2个）
	// id 控件ID
	// data 主表盘数据
	// all_data 副表盘数据
	function InitDoubleGauge(id, data, all_data) {
		require.config({
			paths : {
				echarts : '../../Scripts/ECharts/js'
			}
		});
		require([ 'echarts', 'echarts/chart/bar', 'echarts/chart/line',
				'echarts/chart/map', 'echarts/chart/pie',
				'echarts/chart/funnel', 'echarts/chart/gauge' ],
		// 回调函数内执行图表对象的初始化
		function(ec) {
			var myGaugeChart = ec.init(document.getElementById(id));
			myGaugeChart.setOption({
				tooltip : {
					formatter : "{a} <br/>得分：{c}"
				},
				toolbox : {
					show : true,
					feature : {
						dataView : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				series : [
						{
							name : 'vip用户评分',
							type : 'gauge',
							center : [ '65%', '55%' ], // 默认全局居中
							radius : '90%',
							z : 3,
							min : 0,
							max : 100,
							splitNumber : 10,
							axisLine : { // 坐标轴线
								show : true, // 默认显示，属性show控制显示与否
								lineStyle : { // 属性lineStyle控制线条样式
									color : [ [ 0.2, 'lightgreen' ],
											[ 0.8, 'skyblue' ],
											[ 1, '#ff4500' ] ],
									width : 25
								}
							},
							axisTick : { // 坐标轴小标记
								show : true, // 属性show控制显示与否，默认不显示
								splitNumber : 5, // 每份split细分多少段
								length : 8, // 属性length控制线长
								lineStyle : { // 属性lineStyle控制线条样式
									color : '#eee',
									width : 1,
									type : 'solid'
								}
							},
							axisLabel : { // 坐标轴文本标签，详见axis.axisLabel
								textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									color : 'auto'
								}
							},
							splitLine : { // 分隔线
								show : true, // 默认显示，属性show控制显示与否
								length : 25, // 属性length控制线长
								lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
									color : '#eee',
									width : 2,
									type : 'solid'
								}
							},
							title : {
								textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontWeight : 'bolder',
									fontSize : 20,
									fontStyle : 'italic'
								}
							},
							detail : {
								textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontWeight : 'bolder'
								}
							},
							data : [ {
								value : data,
								name : 'vip用户'
							} ]
						},
						{
							name : '全市用户评分',
							type : 'gauge',
							center : [ '25%', '65%' ], // 默认全局居中
							radius : '70%',
							min : 0,
							max : 100,
							endAngle : -45,
							splitNumber : 10,
							axisLine : { // 坐标轴线
								show : true, // 默认显示，属性show控制显示与否
								lineStyle : { // 属性lineStyle控制线条样式
									color : [ [ 0.2, 'lightgreen' ],
											[ 0.8, 'skyblue' ],
											[ 1, '#ff4500' ] ],
									width : 25
								}
							},
							axisTick : { // 坐标轴小标记
								show : true, // 属性show控制显示与否，默认不显示
								splitNumber : 5, // 每份split细分多少段
								length : 8, // 属性length控制线长
								lineStyle : { // 属性lineStyle控制线条样式
									color : '#eee',
									width : 1,
									type : 'solid'
								}
							},
							axisLabel : { // 坐标轴文本标签，详见axis.axisLabel
								textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									color : 'auto'
								}
							},
							splitLine : { // 分隔线
								show : true, // 默认显示，属性show控制显示与否
								length : 25, // 属性length控制线长
								lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
									color : '#eee',
									width : 2,
									type : 'solid'
								}
							},
							pointer : {
								width : 5
							},
							title : {
								offsetCenter : [ 0, '-30%' ], // x, y，单位px
							},
							detail : {
								textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
									fontWeight : 'bolder'
								}
							},
							data : [ {
								value : all_data,
								name : '全市'
							} ]
						} ]
			});
		});
	}

	// 实时在线人数 - 单仪表盘
	function InitGauge(id, data, title) {
		require.config({
			paths : {
				echarts : '/Scripts/ECharts/js'
			}
		});
		require([ 'echarts', 'echarts/chart/bar', 'echarts/chart/line',
				'echarts/chart/map', 'echarts/chart/pie',
				'echarts/chart/funnel', 'echarts/chart/gauge' ], // 回调函数内执行图表对象的初始化
		function(ec) {
			var myGaugeChart = ec.init(document.getElementById(id));
			myGaugeChart.setOption({
				title : {
					text : title,
					align : 'left',
					style : {
						fontFamily : '微软雅黑',
						fontWeight : 'bold',
						fontSize : '13px',
						color : '#322d2d'
					}
				},
				tooltip : {
					formatter : "{a} <br/>总数: {c} 万人次"
				},
				toolbox : {
					show : true,
					feature : {
						dataView : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				series : [ {
					name : '实时在线人次',
					type : 'gauge',
					center : [ '50%', '60%' ],
					radius : '95%',
					min : 0,
					max : 300,
					splitNumber : 10, // 分割段数，默认为5
					axisLine : { // 坐标轴线
						show : true, // 默认显示，属性show控制显示与否
						lineStyle : { // 属性lineStyle控制线条样式
							color : [ [ 0.2, 'lightgreen' ],
									[ 0.8, 'skyblue' ], [ 1, '#ff4500' ] ],
							width : 25
						}
					},
					axisTick : { // 坐标轴小标记
						show : true, // 属性show控制显示与否，默认不显示
						splitNumber : 5, // 每份split细分多少段
						length : 8, // 属性length控制线长
						lineStyle : { // 属性lineStyle控制线条样式
							color : '#eee',
							width : 1,
							type : 'solid'
						}
					},
					axisLabel : { // 坐标轴文本标签，详见axis.axisLabel
						textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							color : 'auto'
						}
					},
					splitLine : { // 分隔线
						show : true, // 默认显示，属性show控制显示与否
						length : 25, // 属性length控制线长
						lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式
							color : '#eee',
							width : 2,
							type : 'solid'
						}
					},
					pointer : {
						width : 5
					},
					title : {
						show : true,
						offsetCenter : [ 0, '-40%' ], // x, y，单位px
						textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight : 'bolder'
						}
					},
					detail : {
						formatter : '{value}',
						textStyle : { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							color : 'auto',
							fontWeight : 'bolder'
						}
					},
					data : [ {
						value : data,
						name : '在线人数'
					} ]
				} ]
			});
		});
	}

	// 初始化折线图
	function InitLine(lineId, serName, days, showDt, listDays, firDt, title,
			unit) {
		$('#' + lineId).highcharts(
				{
					chart : {
						style : {
							fontFamily : "微软雅黑"
						}
					},
					title : {
						text : title,
						align : 'center',
						style : {
							fontFamily : '微软雅黑',
							fontWeight : 'bold',
							fontSize : '13px',
							color : '#322d2d'
						}
					},
					credits : {
						text : '',
						href : ''
					},
					legend : {
						enabled : true,
						itemStyle : {
							fontWeight : 'bold',
							fontSize : '13px'
						},
						align : 'right',
						verticalAlign : 'top',
						x : 0,
						y : -3,
						floating : true
					},
					plotOptions : {
						series : {
							lineWidth : 1.5,
							marker : {
								enabled : true,
								radius : 3,
								fillColor : '#FFFFFF',
								lineWidth : 1.5,
								lineColor : null
							},
							point : {
								events : {
									click : function() {
										// alert('Category: ' + xsis[this.x] +
										// ', value: ' + this.y + ', line:' +
										// this.series.name);
									}
								}
							},
							dataLabels : {
								enabled : false
							}
						}
					},
					xAxis : {
						categories : days,
						labels : {
							formatter : function() {
								return showDt[this.value];
							}
						}
					},
					tooltip : {
						formatter : function() {
							var result = '<b>' + listDays[this.x] + '</b><br/>'
									+ this.series.name + ': ' + this.y;
							return result
						}
					},
					yAxis : {
						min : 0,
						// max: 100,
						tickPixelInterval : 40,
						title : {
							text : "单位(" + unit + ")",
							align : 'low',
							offset : 0,
							rotation : 0,
							y : 15,
							x : -40
						},
						lineWidth : 1,
						labels : {
							enabled : true
						}
					},
					exporting : {
						enabled : false
					},
					series : [ {
						name : serName,
						data : firDt,
						color : '#08B16D',
						zIndex : 2
					} ]
				});
	}

	function FormatCellRightAlign(data, type, row) {
		return "<span class=\"pull-right\">" + data + "</span>";
	}

	// 初始化 Date Range Picker
	function InitDateRangePicker(id, opt, fn) {
		$(id).daterangepicker($.extend(OPTION.daterangepicker, opt), fn);
	}

	// 获取当前时间，格式YYYY-MM-DD
	function getNowFormatDate() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}

	// 同步POST请求
	function synpost(url, param, success) {
		if (typeof (param) == "function") {
			success = param;
		}
		$.ajax({
			url : url,
			type : "POST",
			async : false,
			data : param,
			dataType : 'json',
			success : function(data) {
				if (typeof (success) == "function") {
					success(data);
				}
			}
		});
	}

	// 异步请求
	function xtpost(url, param, success) {
		if (typeof (param) == "function") {
			success = param;
		}
		post({
			url : url,
			data : param,
			success : success
		});
	}

	// 异步请求
	function post(p) {
		if (typeof (p.data) == "function") {
			p.success = p.data;
		}
		$.ajax({
			url : p.url,
			type : "POST",
			data : p.data,
			dataType : 'json',
			success : function(data) {
				if (true) {
				}
				if (typeof (p.success) == "function") {
					p.success(data);
				}
			},
			error : function() {

			}
		});
	}

	// 初始化表格
	function initDataTable(obj, set, i) {
		require([ 'jquery', 'datatables','datatables_bootstrap'],function($) {
			var o = 0;
			var id = obj;
			if ($(obj + ">table").length < 1 && obj.indexOf("table") < 0) {
				$(obj).css({
					"padding" : "0px 10px",
					"height" : "400px"
				});
				$(obj).html('<table style="width:100%;" class="table table-striped table-bordered table-hover table-condensed"><tbody></tbody></table>');
				o = 1;
				id = obj + ">table";
			}
			var t = getObject(id).DataTable($.extend(OPTION.DATA_OPTION, set, true));
			if (o) {
				$(obj + ">.dataTables_wrapper>.row:eq(1)").css("min-height", $(obj).height());
			}
			if (i) {
				BindTableRowNum(t);
			}
			if(list) {
				list.dt = t;
			} 
			return t;
		});
	}

	// 初始化表格
	// id      元素ID
	// url     地址
	// d       查询条件
	// c       列
	// s       设置
	function initTable(id, url, d, c, s) {
		require([ 'jquery', 'layer'],function($,layer){
			c.unshift({
				data : null,
				width : 2
			});
			var dt = initDataTable(id, $.extend({
				processing : false,
				autoWidth : true,
				ajax : function(data, callback, settings) {
					// var ii = layer.load();
					$.ajax({
						type : "POST",
						url : url,
						cache : false,
						data : $.extend(data, d, true),
						dataType : "json",
						success : function(result) {
							callback(result);
							// layer.close(ii);
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							// layer.close(ii);
						}
					});
				},
				columns : c
			}, s, true), true);
		});
	}

	function getObject(id) {
		if (typeof (id) != "string") {
			return id;
		} else {
			return $(id);
		}
	}

	// 增加月
	function AddMonths(date, value) {
		date.setMonth(date.getMonth() + value);
		return date;
	}
	// 增加天
	function AddDays(date, value) {
		date.setDate(date.getDate() + value);
		return date;
	}

	// 增加时
	function AddHours(date, value) {
		date.setHours(date.getHours() + value);
		return date;
	}

	// 日期类型格式成指定的字符串
	function FormatDate(date, format) {
		format = Replace(format, "yyyy", date.getFullYear());
		format = Replace(format, "MM", GetFullMonth(date));
		format = Replace(format, "dd", GetFullDate(date));
		format = Replace(format, "HH", GetFullHour(date));
		return format;
	}

	// 替换字符串
	function Replace(str, from, to) {
		return str.split(from).join(to);
	}

	// 返回月份(两位数)
	function GetFullMonth(date) {
		var v = date.getMonth() + 1;
		if (v > 9)
			return v.toString();
		return "0" + v;
	}

	// 返回日(两位数)
	function GetFullDate(date) {
		var v = date.getDate();
		if (v > 9)
			return v.toString();
		return "0" + v;
	}

	// 返回时(两位数)
	function GetFullHour(date) {
		var v = date.getHours();
		if (v > 9)
			return v.toString();
		return "0" + v;
	}

	// 比较两个时间
	function compareDate() {
		var mydate = AddDays(parseDate("2012-08-23"), 1);
		var nowdate = new Date();
		if (nowdate.getTime() < mydate.getTime()) {
			return FormatDate(nowdate, "yyyy-MM-dd");
		}
		return FormatDate(mydate, "yyyy-MM-dd");
	}

	// 更新界面高度
	function ResizeHeight(height) {
		if (height == undefined) {
			height = page.resizeHeight;
		}
		if ($(window.parent)[0].resizeIframe) {
			$(window.parent)[0].resizeIframe(height);
		}
	}

	// 初始化折线图
	function InitChartLine(id, title, unit, sal_lab, sal_data_1) {

		var salesChartCanvas = $(id).get(0).getContext("2d");
		var salesChart = new Chart(salesChartCanvas);

		var salesChartData = {
			labels : sal_lab,
			scaleLabel : "<%=value%>" + unit,
			datasets : [ {
				label : title,
				fillColor : "#337ab7",
				strokeColor : "#337ab7",
				pointColor : "#337ab7",
				pointStrokeColor : "#c1c7d1",
				pointHighlightFill : "#fff",
				pointHighlightStroke : "rgb(220,220,220)",
				data : sal_data_1
			} ]
		};

		var salesChartOptions = {
			showScale : true,
			scaleShowGridLines : false,
			scaleGridLineColor : "rgba(0,0,0,.05)",
			scaleGridLineWidth : 1,
			scaleShowHorizontalLines : true,
			scaleShowVerticalLines : true,
			bezierCurve : true,
			bezierCurveTension : 0.3,
			pointDot : true,
			pointDotRadius : 4,
			pointDotStrokeWidth : 1,
			pointHitDetectionRadius : 20,
			datasetStroke : true,
			datasetStrokeWidth : 2,
			datasetFill : true,
			legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%=datasets[i].label%></li><%}%></ul>",
			maintainAspectRatio : true,
			responsive : true
		};

		salesChart.Line(salesChartData, salesChartOptions);
	}

	// chart 数据赋初始值
	// s 开始
	// e 结束
	// d 默认数据
	function InitChartData(s, e, d) {

	}

	function BindTableRowNum(t) {
		require(["jquery","datatables"],function(){
			// 设置序号
			t.on('draw.dt', function() {
				t.column(0, {
					search : 'applied',
					order : 'applied'
				}).nodes().each(function(cell, i) {
					// i 从0开始，所以这里先加1
					i = i + 1;
					// 服务器模式下获取分页信息，使用 DT 提供的 API 直接获取分页信息
					var page = t.page.info();
					// 当前第几页，从0开始
					var pageno = page.page;
					// 每页数据
					var length = page.length;
					// 行号等于 页数*每页数据长度+行号
					var columnIndex = (i + pageno * length);
					cell.innerHTML = columnIndex;
				});
			}).draw();
		});
	}

	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return decodeURIComponent(r[2]);
		return null;
	}
	
	function alert(t) {
		
	}
	
	function confirm(t) {
		
	}
	

	function initTree(id, data) {
		require([ 'jquery', 'ztree' ], function($,z) {
			var setting = {
					check: {
						enable: true
					},
					data: {
						simpleData: {
							enable: true
						}
					}
				};

			setTimeout(function(){
				$.fn.zTree.init($("#" + id), setting, data);
			},1000);
		});
	}
})()

// 系统JS拓展
// 作者：郑少洪
// 日期：2016年9月16日
// 版本：v0.0.1

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { // author: zhengsh 2016-9-5
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

// 增加月
// 例子 :
// (new Date()).AddHours(1);
Date.prototype.AddMonths = function AddMonths(value) {
	this.setMonth(this.getMonth() + value);
	return this;
}

// 增加天
// 例子 :
// (new Date()).AddDays(1);
Date.prototype.AddDays = function AddDays(value) {
	this.setDate(this.getDate() + value);
	return this;
}

// 增加时
// 例子 :
// (new Date()).AddHours(1);
Date.prototype.AddHours = function AddHours(value) {
	this.setHours(this.getHours() + value);
	return this;
}

// 字符串全部替换
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
}

// 页面初始化加载 “ready要比onload先执行”;
document.ready = function(callback) {
	// /兼容FF,Google
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function() {
			document.removeEventListener('DOMContentLoaded', arguments.callee,
					false);
			callback();
		}, false)
	}
	// 兼容IE
	else if (document.attachEvent) {
		document.attachEvent('onreadytstatechange', function() {
			if (document.readyState == "complete") {
				document.detachEvent("onreadystatechange", arguments.callee);
				callback();
			}
		})
	} else if (document.lastChild == document.body) {
		callback();
	}
}