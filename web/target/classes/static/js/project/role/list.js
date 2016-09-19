(function () {
	require.config({
		baseUrl : "/js",
		paths : {
			common:"common"
	}});
	
	require(["common"], function() {
		xt.initTree("menu-list",
				 [
					{ id:1, pId:0, name:"随意勾选 1", open:true},
					{ id:11, pId:1, name:"随意勾选 1-1", open:true},
					{ id:12, pId:1, name:"随意勾选 1-2", open:true},
					{ id:121, pId:12, name:"随意勾选 1-2-1", open:true},
					{ id:122, pId:12, name:"随意勾选 1-2-2", open:true}
				]);
	});
}
)();

// 操作
function operFormat(data, type, row, meta) {
	return '<div class="btn-group btn-group-xs"><button class="btn btn-info" onclick="list.edit('+ row.id +')">编辑</button>'
			+ '<button class="btn btn-danger" onclick="list.del('+ row.id +')">删除</button></div>';
}
// 性别
function sexFormat(data) {
	if(data == 1) {
		return '男';
	} else {
		return '女';				
	}
}


var list = {
	edit : function(id) {
		parent.openTab('/role/edit?id=' + id,'编辑角色');
	},
	del : function(id) {
		if(confirm("确认删除吗？")){
			$.ajax({
				url : "http://localhost:7777/role/" + id + "/delete",
				type : "delete",
				dataType : "json",
				success : function(data) {
					list.dt.ajax.reload();
					alert(data.message);
				}
			});
		}
	},
	dt:null
};