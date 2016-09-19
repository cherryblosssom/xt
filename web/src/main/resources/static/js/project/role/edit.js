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
		                  {title:"id",id:"id",hide:true},
				          {title:"角色",id:"name"},
				          {title:"备注",id:"note"}
				         ]};
		 var html = template('form-content',data);
		 document.getElementById('form').innerHTML = html;
		 
		 var id=xt.GetQueryString("id");
		 if(id) {
			 $.ajax({
				 url:"http://localhost:7777/role/" + id + "/get",
				 type:"get",
				 dataType:"json",
				 success:function(data){
					// console.log(data);
					for ( var i in data.data) {
						$("#" + i).val(data.data[i]);
					}
				 }
			 });
		 }
	});
	
})();

function save() {
	var d = $("#form").serializeObject();
	xt.xtpost("http://localhost:7777/role/save",d,function(data) {
		alert(data.message);
	});
}