/**
 * 用户管理
 */

 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
	'Ext.ux.data.PagingMemoryProxy',
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'
]);
 
 Ext.onReady(function(){
 	
 /**********************************************************************************************************************************/	
 	
 	var rolestore = new Ext.data.JsonStore({
 		fields: ['key', 'value'],
 		proxy: {
 			type: 'ajax',
 			url: '../../user/findrole.do',
 			reader: {
 				type: 'json'
 			}
 		}
 	});
 	
 	var addform = new Ext.form.FormPanel({
 		frame: true,
 		style: 'border: 0px',
 		layout: 'anchor',
 		padding: '15 10 0 10',
 		fileUpload: true,
 		fieldDefaults: {
 			labelAlign: 'left',
 			labelWidth: 60,
			msgTarget: 'side'
 		},
 		defaults: {
			anchor: '100%',
			xtype: 'textfield'
 		},
 		items: [{
 				fieldLabel: '用户编号',
 				xtype: 'numberfield',
 				name: 'id',
 				hidden: true, 
 				value: 0,
 				allowBlank: false,
 				editable: false
 		},{
 			fieldLabel: '用户名',
 			name: 'name',
 			allowBlank: false,
 			maxLength: 20,
 			maxLengthText: '用户名不可超出20个字符'
 		},{
 			fieldLabel: '密码',
 			name: 'password',
 			allowBlank: false,
 			maxLength: 10,
 			maxLengthText: '密码不可超出10个字符'
 		},{
 			fieldLabel: '联系方式',
 			name: 'contact',
 			allowBlank: false,
 			maxLength: 11,
 			maxLengthText: '号码不可超出11个字符'
 		},{
 			fieldLabel: '邮箱',
 			name: 'email',
 			vtype: 'email',
 			allowBlank: false
 		},{
 			fieldLabel: '角色',
 			xtype: 'combo',
 			name: 'roleid',
 			emptyText: '请选择',
 			triggerAction: 'all',
 			mode: 'remote',
 			valueField: 'key',
 			displayField: 'value',
 			store: rolestore,
 			editable: false,
 			allowBlank: false
 		},{
 			fieldLabel: '用户描述',
 			xtype: 'textarea',
 			name: 'comment',
 			allowBlank: true,
 			height: 100,
 			maxLength: 200,
 			maxLength: '概要不可超出200个字符'
 		}]
 	});
 	
 	var addwindow = new Ext.Window({
 		title: '添加用户',
 		width: 400,
 		height: 320,
 		buttonAlign: 'center',
 		defaultButton: 0,
 		closeAction: 'hide',
 		minimizable: true,
 		modal: true,
 		closable: true,
 		constrain: true,
 		plain: true,
 		items: [addform],
 		buttons: [{
 			text: '提交',
 			handler: function(){
 				if(addform.getForm().isValid()){
 					addform.submit({
 						url: '../../user/saveorupdate.do',
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
 		},{
 			text: '测试',
 			handler: function(){
 				Ext.Ajax.request({
 					url: '../../user/loadMainMenu.do',
 					success: function(response){
 						var menudata = eval(response.responseText);
 						console.log(menudata);
 					}
 				});
 			}
 		}]
 	});
 	
/**************************************************************************************************************************/ 	
 	var columns = [
 		new Ext.grid.RowNumberer(),
 		{text: '用户编号',dataIndex: 'id',sortable: true,align: 'center'},
 		{text: '用户名',dataIndex: 'name',sortable: false,align: 'center'},
 		{text: '密码',dataIndex: 'password',sortable: false,align: 'center'},
 		{text: '联系方式',dataIndex: 'contact',sortable: false,align: 'center'},
 		{text: '邮箱',dataIndex: 'email',sortable: false,align: 'center'},
 		{text: '角色编号',dataIndex: 'roleid',sortable: true,align: 'center'},
 		{text: '用户描述',dataIndex: 'comment',sortable: false,align: 'center'}
 	];
 	/**
 	 * 
 	 */
 	var pagesize = 14;
 	var gridstore = new Ext.data.JsonStore({
 		pageSize: pagesize,
 		fields: [
 			{name: 'id', type: 'string'},
 			{name: 'name', type: 'string'},
 			{name: 'password', type: 'string'},
 			{name: 'contact', type: 'string'},
 			{name: 'email', type: 'string'},
 			{name: 'roleid', type: 'string'},
 			{name: 'comment', type: 'string'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../user/findAll.do',
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
 			dataIndex: 'name'
 		},{
 			type: 'string',
 			dataIndex: 'contact'
 		},{
 			type: 'string',
 			dataIndex: 'roleid'
 		},{
 			type: 'string',
 			dataIndex: 'id'
 		},{
 			type: 'string',
 			dataIndex: 'contact'
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
	 									url: '../../user/deleteAll.do',
	 									params: 'data=' + Ext.encode(jsonArray),
	 									waitMsg: '正在删除，请稍后...！',
	 									waitTitle: '删除',
	 									timeout: 6000,
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
 	/**
 	 * 主视图
 	 */
 	new Ext.Viewport({
 		layout: 'fit',
 		items: [{
 			frame: true,
 			title: '用户管理',
 			layout: 'border',
 			items: [grid]
 		}]
 	});
 	
 	
 });