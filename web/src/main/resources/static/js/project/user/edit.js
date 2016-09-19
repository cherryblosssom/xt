(function () {
	require.config({
		baseUrl : "/js",
		paths : {
			template:"template",
			jquery : "plugins/jQuery/jquery-2.2.3.min",
			common:"common"
			
	}});
	
	require(["template","jquery","common"], function(template,$) {
		var ages = new Array();
		for (var i = 0; i < 120; i++) {
			ages.push({id : i,text : i});
		}
		var data = {list:[
		                  {title:"id",id:"Id",hide:true},
				          {title:"账号",id:"UserName",autofocus:true},
				          {title:"电话",id:"Moblie"}, 
				          {title:"年龄",id:"Age",select:true,details:ages},
				          {title:"性别",id:"Sex",select:true,details:[
					          {id:1,text:"男",select:true},
					          {id:0,text:"女"}
				          ]},
				          {title:"角色",id:"角色",select:true,details:[
					          {id:1,text:"超级管理员",select:true},
					          {id:0,text:"管理员"}
					      ]},
				          {title:"备注",id:"Note"}
				         ]};
		 var html = template('form-content',data);
		 document.getElementById('form').innerHTML = html;
		 
		 var id=xt.GetQueryString("id");
		 if(id) {
			 $.ajax({
				 url:"http://localhost:7777/user/" + id + "/get",
				 type:"get",
				 dataType:"json",
				 success:function(data){
					 console.log(data);
					 for (var i in data.data) {
						 $("#" +i.replace(/(\w)/,function(v){return v.toUpperCase()})).val(data.data[i]);
					 }
				 }
			 });
		 }
		 
		 setTimeout(function() {
			xt.xtpost("http://localhost:7777/role/list", function(data) {

				var o = $("#角色");
				o.empty();
				o.attr("multiple","multiple");
				var d = new Array();
				for ( var i in data) {
					d.push({
						id : data[i].id,
						text : data[i].name
					});
				}
				o.select2({
					data : d
				})
				o.select2({});
			});
		}, 1000);
	});
	
})();

function save() {
	var d = $("#form").serializeObject();
	xt.xtpost("http://localhost:7777/user/save",d,function(data) {
		alert(data.message);
	});
}