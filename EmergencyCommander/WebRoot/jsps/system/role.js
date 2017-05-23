/**
 * 角色管理
 */

 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
	'Ext.ux.data.PagingMemoryProxy',
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'
]);
 
 Ext.onReady(function(){
 	
 	Ext.QuickTips.init();
 	
 /**********************************************************************************************************************************/	
 	
 	var addform = new Ext.form.FormPanel({
 		frame: true,
 		style: 'border: 0px',
 		layout: 'anchor',
 		padding: '15 10 0 10',
 		fileUpload: true,
 		fieldDefaults: {
 			labelAlign: 'left',//默认left
 			labelWidth: 60,
			msgTarget: 'side'
 		},
 		defaults: {
			anchor: '100%',
			xtype: 'textfield'
 		},
 		items: [{
 				fieldLabel: '角色编号',
 				xtype: 'numberfield',
 				name: 'id',
 				hidden: true, 
 				value: 0,
 				allowBlank: false,
 				editable: false
 		},{
 			fieldLabel: '角色名',
 			name: 'rolename',
 			allowBlank: false,
 			maxLength: 20,
 			maxLengthText: '角色名不可超出20个字符'
 		},{
 			fieldLabel: '角色描述',
 			xtype: 'textarea',
 			name: 'accessdesc',
 			allowBlank: true,
 			height: 100,
 			maxLength: 200,
 			maxLength: '角色描述不可超出200个字符'
 		}]
 	});
 	
 	var addwindow = new Ext.Window({
 		title: '添加角色',
 		width: 400,
 		height: 320,
 		buttonAlign: 'center',
 		defaultButton: 0,
 		closeAction: 'hide',
 		minimizable: true,
 		modal: true,
 		closable: true,//是否开放关闭按钮，默认true
 		constrain: true,
 		plain: true,
 		items: [addform],
 		buttons: [{
 			text: '提交',
 			handler: function(){
 				if(addform.getForm().isValid()){
 					addform.submit({
 						url: '../../role/saveorupdate.do',
 						waitTitle: '提交',
						waitMsg: '正在保存数据，请稍后...',
						timeout:6000,
						reset: false,
						submitEmptyText:false,
						method: 'post',
 						success:function(form,action){
 							Ext.Msg.alert('提示',action.result.message);
 							addform.getForm().reset();
 							addwindow.hide();
 							grid.getStore().reload();
 						},
 						failure: function(form,action){
								if(action.result.errors){
								Ext.Msg.alert('提示',action.result.errors);
							}else{
								Ext.Msg.alert('提示','与后台连接失败！');
							}
						}
 					});
 				}
 			}
 		},{
 			text: '放弃',
 			handler: function(){
 				addform.getForm().reset();
 				addwindow.hide();
 			}
 		}]
 	});
 	
/**************************************************************************************************************************/ 	
 	var columns = [
 		new Ext.grid.RowNumberer(),
 		{text: '角色编号',dataIndex: 'id',sortable: true,align: 'center'},
 		{text: '角色名',dataIndex: 'rolename',sortable: false,align: 'center'},
 		{text: '权限描述',dataIndex: 'accessdesc',sortable: false,align: 'center'},
 		{
 			text: '权限设置',
 			xtype: 'actioncolumn',
 			width: 150,
 			align: 'center',
 			menuDisabled: false,
 			items: [{
 				iconCls: 'role_edit',
 				tooltip: '权限设置',
 				handler: function(lgrid,rowIndex, colIndex,lcolumns){
 					var record = gridstore.getAt(rowIndex);
                    var roleid = record.get('id');
                    menutree.getStore().load({
                    	params: {roleid: roleid}
                    });
                    menuWindow.show();
                    menuWindow.roleid = roleid;
 				}
 			}]
 		}
 	];
 	/**
 	 * 
 	 */
 	var pagesize = 14;
 	var gridstore = new Ext.data.JsonStore({
 		pageSize: pagesize,
 		fields: [
 			{name: 'id', type: 'string'},
 			{name: 'rolename', type: 'string'},
 			{name: 'accessdesc', type: 'string'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../role/findAll.do',
 			reader: {
 				type: 'json',
 				root: 'root',
 				totalProperty: 'total'
 			}
 		}
 	});
 	gridstore.load();
 	
 	var filters = {
 		ftype: 'filters',
 		encode: false,
 		local: true,
 		menuFilterText: '过滤',
 		updateBuffer: '100',
 		filters: [{
 			type: 'string',
 			dataIndex: 'rolename'
 		},{
 			type: 'int',
 			dataIndex: 'id'
 		}]
 	};
 	
 	var grid = new Ext.grid.GridPanel({
 		region: 'center',
 		autoHeight: true,
 		columnLines: true,
 		forceFit: true,
 		style: 'border:1px solid #B5B8C8',
 		
 		columns: columns,
 		store: gridstore,
 		selModel: new Ext.selection.CheckboxModel(),
 		selType: 'rowmodel',
 		features: [filters],
 		bbar: new Ext.PagingToolbar({
 			store: gridstore,
 			diplayInfo: true,
 			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
 			emptyMsg: '无记录',
 			plugins: new Ext.ux.ProgressBarPager()
 		}),
 		tbar: [{
 			text: '增加',
 			iconCls: 'add_icon',
 			handler: function(){
 				addform.getForm().reset();
 				addwindow.show();
 			}
 		},{
 			text: '修改',
 			iconCls: 'edit_icon',
 			handler: function(){
 				var records = grid.getSelectionModel().getSelection();
 				if(records != ''){
 					addform.getForm().loadRecord(records[0]);
 					addwindow.show();
 				}else{
 					Ext.Msg.alert('提示','请至少选中一行');
 				}
 			}
 		},{
 			text: '删除',
 			iconCls: 'delete_icon',
 			handler: function(){
 					var selected = [];
 					selected = grid.getSelectionModel().getSelection();
 					//selected = grid.getStelectionModel().selected;
 					console.log(selected);
 					if(selected.length != 0 && selected != null && selected != 'undefined'){
	 						Ext.Msg.confirm('信息提示','确认删除当前记录？',function(btn){
	 						if(btn == 'yes'){
	 							var jsonArray = [];
	 							var record;
	 							for(var i=0;i<selected.length;i++){
	 								record = selected[i].data;
	 								jsonArray.push(record);
	 							}
	 								Ext.Ajax.request({
	 									url: '../../role/deleteAll.do',
	 									params: 'data=' + Ext.encode(jsonArray),
	 									waitMsg: '正在删除，请稍后...！',
	 									waitTitle: '删除',
	 									timeout: 6000,//超时时间,默认30秒
	 									method: 'post',
	 									success: function(response){
	 										console.log(response);
	 										Ext.Msg.alert('提示',response.responseText,function(){
	 											grid.getStore().reload();
	 										});
	 									},
	 									failure: function(response){
	 										Ext.Msg.alert('提示',response.responseText);
	 									}
	 							});
	 						}
	 					});
 					}else{
 						Ext.Msg.alert('提示','请至少选中一条记录！');
 					}
 				}
 		}]
 	});
 	
/*********************************************************************************************************************/ 	
	
 	var treestore = new Ext.data.TreeStore({
 		proxy: {
        		type: 'ajax',
        		url: '../../role/loadtree.do'
        	},
        	root: {text: '0', id: 0,leaf: false}
        });
        treestore.load({params:{roleid:0}});
 	/**
	 * 菜单树
	 */
 	var menutree = new Ext.tree.TreePanel({
 		autoScroll:true,
        animate:true,
        rootVisible: false,
 		useArrows: true,
        frame: true,
        store: treestore,
        listeners: {
        	'load': function(){
        		menutree.getRootNode().expandChildren(false,this.parent);
        	},
        	'checkchange': function(node, checked){
	        	if(node.hasChildNodes()){
	        		node.cascadeBy(function(node){
		        		for(var i=0; i<node.childNodes.length; i++){
		        			node.childNodes[i].set('checked', checked);
		        		}
	        		});
	        	}else{
	        		var myparent = node.parentNode;
	        		if(myparent != null){
	        			myparent.set('checked', checked);
	        			for(var i=0; i<myparent.childNodes.length; i++){
	        				if(myparent.childNodes[i].data.checked == true){
	        					myparent.set('checked', true);
	        					break;
	        				}
	        			}
	        		}
	        	}
        	}
        }
 	});
 	var menuWindow = new Ext.Window({
 		layout: 'fit',
 		title: '权限设置',
 		width: 400,
 		frame:true,
 		height: 500,
 		defaultButton: 0,
 		closeAction: 'hide',
 		minimizable: true,
 		modal: true,
 		closable: true,//是否开放关闭按钮，默认true
 		constrain: true,
 		plain: true,
 		items: [menutree],
 		buttonAlign: 'center',
 		buttons: [{
 			text: '提交修改',
			enableToggle: false,
 			handler: function(){
 				var accesses = menutree.getChecked();
 				var ids = '';
 				for(var i=0; i<accesses.length; i++){
 					if(i != 0){
 						ids += ',';
 					}
 					ids += accesses[i].data.id;
 				}
 				Ext.Ajax.request({
 					url: '../../role/saveRoleAccess.do',
 					params: {accessIds: ids, roleid: menuWindow.roleid},
 					success: function(response){
 						Ext.Msg.alert('提示', '权限修改成功', function(){
 							menutree.getStore().reload();
 						});
 					},
 					failure: function(response){
 						Ext.alert('错误',response.responseText);
 					}
 				});
 			}
 		},{
 			text: '关闭',
 			handler: function(){
 				menuWindow.hide();
 			}
 		}]
 	});
 	
/******************************************************************************************************************************/	
 	/**
 	 * 主视图
 	 */
 	new Ext.Viewport({
 		layout: 'fit',
 		items: [{
 			frame: true,
 			title: '角色管理',
 			layout: 'border',
 			items: [grid]
 		}]
 	});
 	
 	
 });