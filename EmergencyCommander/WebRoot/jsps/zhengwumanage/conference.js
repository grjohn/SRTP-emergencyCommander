/**
 * 会议记录
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
 			labelAlign: 'left',//默认left
 			labelWidth: 60,
			msgTarget: 'side'
 		},
 		defaults: {
			anchor: '100%',
			xtype: 'textfield'
 		},
 		items: [{
 				xtype: 'numberfield',
 				fieldLabel: '编号',
 				name: 'id',
 				value: 0,
 				hidden: true,
 				editable: false
 			},{
 			fieldLabel: '名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称',
 			name: 'name',
 			allowBlank: false,
 			maxLength: 50,
 			maxLength: '标题不可超出50个字符'
 		},{
 			xtype: 'container',
 			margin: '0 0 5 0',
 			layout: 'column',
 			items: [{
	 			xtype: 'combo',
		 		fieldLabel: '类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型',
		 		name: 'type',
		 		columnWidth: .4,
		 		allowBlank: false,
		 		store: new Ext.data.SimpleStore({
		 			fields: ['key','value'],
		 			data: [
		 				[0,'部门会议'],
		 				[1,'组织会议'],
		 				[2,'外部会议']
		 			]
	 			}),
	 			displayField: 'value',
	 			valueField: 'key',
	 			queryMode: 'local',//ComboBox加载本地数据
	 			emptyText: '请选择',
	 			editable: false
 			},{
 				xtype: 'datefield',
	 			format: 'Y-m-d,H时i分s秒',
	 			fieldLabel: '召开时间',
	 			labelAlign: 'right',
	 			columnWidth: .6,
	 			name: 'time',
	 			allowBlank: false,
	 			editable: false
 			},{
 				xtype:'datefield',
 				format: 'Y-m-d,H时i分s秒',
 				name: 'etime',
 				value: new Date(),
 				fieldLabel: '上次编辑时间',
 				hidden:true,
 				allowBlank: false,
 				editable: false
 			}]
 		},{
 			fieldLabel: '负&nbsp;责&nbsp;&nbsp;人',
 			name: 'leader',
 			allowBlank: false
 		},{
 			fieldLabel: '召开地点',
 			name: 'address',
 			allowBlank: false,
 			maxLength: 100,
 			maxLength: '地点不可超出100个字符'
 		},{
 			fieldLabel: '出席人员',
 			xtype: 'textarea',
 			height:60,
 			name: 'present',
 			allowBlank: false
 		},{
 			fieldLabel: '纪要说明',
 			xtype: 'textarea',
 			height: 100,
 			name: 'detail',
 			allowBlank: false,
 			maxLength: 300,
 			maxLength: '纪要说明不可超出300个字符'
 		}]
 	});
 	
 	/**
 	 * 定义添加窗口
 	 */
 	var addwindow = new Ext.Window({
 		title: '添加会议',
 		width: 400,
 		height: 400,
 		buttonAlign: 'center',
 		defaultFocus: 1,
 		closeAction: 'hide',
 		minimizable: true,
 		modal: true,
 		closable: true,//是否开放关闭按钮，默认true
 		constrain: true,
 		resizable: true,
 		resizeHandler: 'all',
 		plain: true,
 		items: [addform],
 		buttons: [{
 			text: '提交',
 			handler: function(){
 				if(addform.getForm().isValid()){
 				
 					addform.getForm().setValues({
 						etime: new Date()
 					});
 					addform.submit({
 						url: '../../conference/addconference.do',
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
 			header: '会议名称', 
 			dataIndex: 'name', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},
 		{
 			header: '会议类型', 
 			dataIndex: 'type', 
 			sortable: false, 
 			align: 'center',
 			editor: new Ext.form.ComboBox({
 				store: new Ext.data.SimpleStore({
 					fields: ['key','value'],
 					data: [
 						[0,'部门会议'],
 						[1,'组织会议'],
 						[2,'外部会议']
 					]
 				}),
 				displayField: 'value',
 				valueField: 'key',
 				queryMode: 'local',
				emptyText: '请选择',
				editable: false
 			}),
 			renderer: function(key){
 				if(key == 0){
 					return '部门会议';
 				}else if(key == 1){
 					return '组织会议';
 				}else if(key == 2){
 					return '外部会议';
 				}else{alert('传进来的会议数据有误')}
 			}
 		},
 		{
 			header: '会议负责人', 
 			dataIndex: 'leader', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},
 		{
 			header: '出席人员', 
 			dataIndex: 'present', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: true
 			}
 		},
 		{
 			header: '召开地点', 
 			dataIndex: 'address', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: true
 			}
 		},
 		{
 			header: '召开时间',
 			id: 'time',
 			dataIndex: 'time', 
 			sortable: true, 
 			align: 'center',
 			width: 150,
			renderer:Ext.util.Format.dateRenderer('Y-m-d'),
			editor:{
				xtype: 'datefield',
				allowBlank: false
			}
 		},
 		{
 			header: '上次编辑时间',
 			id: 'etime',
 			dataIndex: 'etime', 
 			sortable: true, 
 			align: 'center',
 			width: 150,
 			renderer:Ext.util.Format.dateRenderer('Y-m-d,H时i分s秒')
 		},
 		{
 			header: '纪要说明',
 			dataIndex: 'detail',
 			editor:new Ext.form.field.TextArea({
 				allowBlank: false
 			})
 		},
 		{
 			header: '存储位置',
 			dataIndex: 'location',
 			id: 'location',
 			hideable:false,
 			hidden: true
 		}
 	];
 	
 	
 	var pagesize = 14;
 	var store = new Ext.data.Store({
 		
 		pageSize: pagesize,
 		fields: [
 			{name: 'id', type: 'int'},
 			{name: 'name', type: 'string'},
 			{name: 'type', type: 'sting'},
 			{name: 'leader', type: 'sting'},
 			{name: 'present',type: 'string'},
 			{name: 'address', type: 'string'},
 			{name: 'time', type: 'date', dateFormat: 'time'},
 			{name: 'etime', type: 'date',dateFormat:'time'},
 			{name: 'detail', type: 'string'},
 			{name: 'location',type: 'string'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../conference/findAll.do',
 			reader: {
 				type: 'json',
 				root:'root',
 				totalProperty: 'total'
 			}
 		}
 	});
 	store.load({params:{start:0,limit: pagesize}});
 	
 
 	var filters = {
 		ftype: 'filters',
 		encod: false,
 		local: true,
 		menuFilterText: '过滤',
 		updateBuffer: '100',
 		filters: [{
 			type: 'string',
 			dataIndex: 'name'
 		},{
 			type: 'list',
 			dataIndex: 'type',
 			options: ['0','1','2'],
 			phpMode: true
 		},{
 			type: 'string',
 			dataIndex: 'address'
 		},{
 			type: 'string',
 			dataIndex: 'leader'
 		},{
 			type: 'string',
 			dataIndex: 'present'
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
 				text: '增加记录',
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
	 						url:'../../conference/updateAll.do',
	 						waitMsg: '正在提交，请稍后...',
		 					waitTitle: '提交',
		 					timeout: 6000,//超时时间,默认30秒
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
 				text: '删除记录',
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
	 									url: '../../conference/deleteAll.do',
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
 				 	if(record.get('location') != ''){
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
 				var record = grid.getSelectionModel().getSelection();
 				if(record){//至少有一行被选中
 					addwindow.show();
 					addform.getForm().loadRecord(record[0]);
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
 	
 	/**
 	 * 定义主视图
 	 */
 	new Ext.Viewport({
 		layout: 'fit',
 		items: [{
 			frame: true,
 			title: '会议记录',
 			layout: 'border',
 			items:[grid]
 		}]
 	});
 	
 });