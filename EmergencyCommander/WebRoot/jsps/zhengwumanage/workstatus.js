/**
 * 工作动态
 */

 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
	'Ext.ux.data.PagingMemoryProxy',
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'
]);
 Ext.onReady(function(){
 	
 	var addform = new Ext.form.FormPanel({
 		frame: true,
 		style: 'border: 0px',
 		layout: 'anchor',
 		padding: '10 10 0 10',
 		fileUpload: true,
 		fieldDefaults: {
 			labelAlign: 'left',
 			labelWidth: 45,
 			height: 25,
			msgTarget: 'side'
 		},
 		defaults: {
			anchor: '100%',
			xtype: 'textfield'
 		},
 		items: [{
 			fieldLabel: '编号',
 			name: 'id',
 			value: 0,
 			hidden: true
 		},{
 			fieldLabel: '发布时间',
 			name: 'etime',
 			xtype: 'datefield',
 			format: 'Y-m-d,H时i分s秒',
 			value: new Date(),
 			hidden: true
 		},{
 			fieldLabel: '上次编辑时间',
 			name: 'rtime',
 			xtype: 'datefield',
 			format: 'Y-m-d,H时i分s秒',
 			value: new Date(),
 			hidden: true
 		},{
 			fieldLabel: '标&nbsp;&nbsp;&nbsp;题',
 			name: 'title',
 			allowBlank: false,
 			maxLength: 50,
 			maxLength: '标题不可超出50个字符'
 		},{
 			fieldLabel: '编辑人',
 			name: 'editor',
 			allowBlank: false,
 			maxLength: 20,
 			maxLength: '人名不可超出20个字符'
 		},{
 			fieldLabel: '签发人',
 			name: 'confirmer',
 			allowBlank: false,
 			maxLength: 20,
 			maxLength: '人名不可超出20个字符'
 		},{
 			fieldLabel: '备&nbsp;&nbsp;&nbsp;注',
 			xtype: 'textarea',
 			name: 'comment',
 			allowBlank: true,
 			height: 100,
 			maxLength: 200,
 			maxLength: '备注不可超出200个字符'
 		}]
 	});
 	
 	
 	var addwindow = new Ext.Window({
 		title: '添加动态',
 		width: 400,
 		height: 320,
 		buttonAlign: 'center',
 		defaultFocus: 1,
 		closeAction: 'hide',
 		minimizable: true,
 		modal: true,
 		closable: true,
 		constrain: true,
 		resizable: true,
 		resizeHandler: 'all',
 		plain: true,
 		items: [addform],
 		buttons: [{
 			text: '提交',
 			handler: function(){
 				if(addform.getForm().isValid()){
 					addform.submit({
 						url: '../../workstatus/addstatus.do',
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
 	
 	var columns = [
 		new Ext.grid.RowNumberer(),
 		{
 			header: '编号', 
 			dataIndex: 'id', 
 			sortable: true, 
 			align: 'center'
 		},
 		{
 			header: '标题', 
 			dataIndex: 'title', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},
 		{
 			header: '编辑人', 
 			dataIndex: 'editor', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},
 		{
 			header: '签发人', 
 			dataIndex: 'confirmer', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},
 		{
 			header: '备注', 
 			dataIndex: 'comment', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: true
 			}
 		},
 		{
 			header: '发布时间',
 			id: 'rtime',
 			dataIndex: 'rtime', 
 			sortable: true, 
 			align: 'center',
 			width: 130,
			renderer:Ext.util.Format.dateRenderer('Y-m-d,H时i分s秒')
			
 		},
 		{
 			header: '上次编辑时间',
 			id: 'etime',
 			dataIndex: 'etime', 
 			sortable: true, 
 			align: 'center',
 			width: 130,
 			renderer:Ext.util.Format.dateRenderer('Y-m-d,H时i分s秒')
 		},
 		{
 			header: '存储位置',
 			dataIndex: 'location',
 			id: 'location',
 			hideable:false,
 			hidden: true
 		}
 	];
 	
 	var store = new Ext.data.JsonStore({
 		
 		pageSize: 15,
 		fields: [
 			{name: 'id', type: 'int'},
 			{name: 'title', type: 'string'},
 			{name: 'editor', type: 'sting'},
 			{name: 'confirmer', type: 'sting'},
 			{name: 'comment',type: 'string'},
 			{name: 'rtime', type: 'date', dateFormat: 'time'},
 			{name: 'etime', type: 'date', dateFormat: 'time'},
 			{name: 'location', type: 'string'} 
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../workstatus/findAll.do',
 			reader: {
 				type: 'json',
 				totalProperty: 'total',
 				root: 'root'
 			}
 		}
 	});
 	store.load();
 
 	var filters = {
 		ftype: 'filters',
 		encod: false,
 		local: true,
 		menuFilterText: '过滤',
 		updateBuffer: '100',
 		filters: [{
 			type: 'string',
 			dataIndex: 'title'
 		},{
 			type: 'string',
 			dataIndex: 'editor'
 		},{
 			type: 'string',
 			dataIndex: 'confirmer'
 		}]
 	};
 
 	var grid = new Ext.grid.GridPanel({
 		region: 'center',
 		autoHeight: true,
 		columnLines: true,
 		forceFit: true,
 		style: 'border:1px solid #B5B8C8',
 		store: store,
 		columns: columns,
 		selModel: new Ext.selection.CheckboxModel(),
 		selType:'cellmodel',
 		features: [filters],
 		plugins: [
 			new Ext.grid.plugin.CellEditing({
 				clicksToEdit: 2
 			})
 		],
 		bbar: new Ext.PagingToolbar({
 			store: store,
 			displayInfo: true,
 			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
 			emptyMsg: '无记录',
 			plugins: new Ext.ux.ProgressBarPager()
 		}),
 		tbar: [
 			{
 				text: '增加动态',
 				iconCls: 'add_icon',
 				handler: function(){
 					addform.getForm().reset();
 					addwindow.show();
 				}
 			},'-',{
 				text: '提交修改',
 				iconCls: 'edit_icon',
 				handler: function(){
 					var modified = grid.getStore().getModifiedRecords();
 					if(modified != null && modified != 'undefined' && modified.length != 0){
 						var jsonArray = [];
	 					for(var i=0; i<modified.length;i++){
	 						var record = modified[i];
	 						record.set('etime',new Date());
	 						jsonArray.push(modified[i].data);
	 					}
	 					Ext.Ajax.request({
	 						url:'../../workstatus/updateAll.do',
	 						waitMsg: '正在删除，请稍后...',
		 					waitTitle: '删除',
		 					timeout: 6000,
		 					method: 'post',
		 					params: 'data=' + Ext.encode(jsonArray),
	 						success: function(response){
	 							Ext.Msg.alert('提示',response.responseText,function(){
	 								grid.getStore().reload();
	 							});
	 						},
	 						failure: function(response){
	 							Ext.Msg.alert('提示',response.responseText);
	 						}
 						});
 					}else{
 						Ext.Msg.alert('信息提示','无需要修改记录！');
 					}
 				}
 			},'-',{
 				text: '删除动态',
 				iconCls: 'delete_icon',
 				handler: function(){
 					var selected = [];
 					selected = grid.getSelectionModel().getSelection();
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
	 									url: '../../workstatus/deleteAll.do',
	 									params: 'data=' + Ext.encode(jsonArray),
	 									waitMsg: '正在删除，请稍后...！',
	 									waitTitle: '删除',
	 									timeout: 6000,//超时时间,默认30秒
	 									method: 'post',
	 									success: function(response){
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
 			},'-',{
 				text: '下载',
 				iconCls: 'download_icon',
 				handler: function(){
					var selected = grid.getSelectionModel().selected;
					var errorfile = '';
					for(var i=0; i< selected.getCount();i++){
						var record = selected.get(i);
						if(record.get('location') != ''){
							window.open(record.get('location'));
						}else{
							errorfile += record.get('id')+',';
						}
					}
					if(errorfile != ''){
						Ext.Msg.alert('错误','编号为'+errorfile+'的文件不存在!');
					}
 				}
 			}
 		]
 	});

 	var contextmenu = new Ext.menu.Menu({
 		id: 'contextmenu',
 		items: [{
 			text: '下载',
 			handler: function(){
 				 var selected = grid.getSelectionModel().selected;
 				 var errorfile = '';
 				 for(var i=0; i<selected.getCount(); i++){
 				 	var record = selected.get(i);
 				 	if(record.get('location') != null &&record.get('location')!=''){
 				 		window.open(record.get('location'));
 				 		continue;
 				 	}else{
 				 		errorfile += record.get('id')+',';
 				 	}
 				 }
 				 if(errorfile != ''){
 				 		Ext.Msg.alert('错误','编号为'+errorfile+'的文件不存在!');
 				 	}
 			}
 		},{
 			text: '查看详情',
 			handler: function(){
 				var records = grid.getSelectionModel().getSelection();
 				if(records){
 					addwindow.show();
 					addform.getForm().loadRecord(records[0]);
 				}else{
 					Ext.Msg.alert('提示','请至少选中一行');
 				}
 			}
 		
 		}]
 	});
 	
 
 	grid.on('itemcontextmenu', function(view,record,item,index,e){
 		e.preventDefault();
 		contextmenu.showAt(e.getXY());
 	});
 
 	new Ext.Viewport({
 		layout: 'fit',
 		items: [{
 			frame: true,
 			title: '组织工作动态',
 			layout: 'border',
 			items:[grid]
 		}]
 	});
 	
 });