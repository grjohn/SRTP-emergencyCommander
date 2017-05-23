/**
 * 事件查询
 */
 
 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
	'Ext.ux.data.PagingMemoryProxy',
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'
]);
 
 Ext.onReady(function(){
 	
 	Ext.QuickTips.init();
 	
 	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
 	
 	var searchForm = new Ext.form.FormPanel({
 		region: 'north',
 		frame: true,
 		style: 'border: 0px',
 		height: 80,
 		padding: '5 10 5 10',
 		fieldDefaults: {
			labelAlign: 'right',
			labelWidth: 40
		},
		items: [{
			xtype: 'container',
			layout: 'column',
			forceFit: true,
			items: [{
				xtype: 'fieldset',
				title: '查询设置',
				columnWidth: 1,
				autoHeight:true,
				padding:'10 20 15 15',
				layout: 'column',
                collapsible: true,
                defaultType: 'textfield',
				items: [
					{
						fieldLabel: '名称',
						name: 'ename',
						columnWidth: .2
					},{
						xtype: 'combo',
						fieldLabel: '类型',
						name: 'type',
						columnWidth: .15,
						store: new Ext.data.SimpleStore({
							fields: ['key','value'],
							data: [
								['一类','一类'],
								['二类','二类'],
								['三类','三类'],
								['四类','四类']
							]
						}),
						displayField: 'value',
						valueField: 'key',
						queryMode: 'local',
						emptyText: '请选择',
						editable: false
					},{
						xtype: 'combo',
						fieldLabel: '等级',
						name: 'level',
						columnWidth: .15,
						store: new Ext.data.SimpleStore({
							fields: ['key', 'value'],
							data: [
								['一级','一级'],
								['二级','二级'],
								['三级','三级'],
								['四级','四级']
							]
						}),
						displayField: 'value',
						valueField: 'key',
						queryMode: 'local',
						emptyText: '请选择',
						editable: false
					},{
						xtype: 'datefield',
						id: 'start_date',
						name: 'start_date',
						columnWidth: .25,
						fieldLabel: '查询日期',
						allowBlank: false,
						editable: false,
						labelWidth: 80,
						format: 'Y-m-d',
						value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),//初始值
						listeners: {
							'select': function(field, value){
								Ext.getCmp('end_date').setMinValue(value);
							}
						}
					},{
						xtype: 'label',
						text: '至',
						width: 30,
						style: 'padding:3px 0px 0px 9px'
					},{
						xtype: 'datefield',
						id: 'end_date',
						name: 'end_date',
						columnWidth: .15,
						allowBlank: false,
						editable: false,
						format: 'Y-m-d',
						value: new Date(),//初始值
						listeners: {
							'select': function(field, value){
								Ext.getCmp('start_date').setMaxValue(value);
							},
						}
					},{
						xtype: 'button',
						text: '查询',
						columnWidth: .1,
						width: 50,
						margin: '0 0 0 20',
						handler: function(){
							if(searchForm.getForm().isValid()){
								grid.getStore().getProxy().extraParams = searchForm.getValues();
								store.load();
							}
						}
					}
				]
			}]
		}]
 	});
 /***********************************************************************************************************************/
 	
 	var detailform = new Ext.form.FormPanel({
 		border: false,
 		fieldDefaults: {
 			labelAlign: 'right',
			labelWidth: 85,
			msgTarget: 'side'
		},
		layout: 'form',
		buttonAlign: 'center',
 		items: [{
 			xtype: 'tabpanel',
 			activeTab: 0,
 			items: [{
 				title: '事件信息',
 				defaultType: 'textfield',
 				layout: 'column',
 				frame: true,
 				style: 'border: 0px',
 				height: 270,
 				items: [{
					xtype: 'container',
					columnWidth: .5,
					forcrFit: true,
					layout: 'anchor',
					defaultType: 'textfield',
					defaults: {
						anchor:'95%',
						margin: '0 0 10 0'
					},
					items: [{
						name: 'id',
						value: 0,
						hidden: true
					},{
						name: 'status',
						hidden: true
					},{
						fieldLabel: '事件名',
						id:'ename',
						name: 'ename',
						afterLabelTextTpl: required,
						labelWidth: 60,
						allowBlank: false
					},{
						fieldLabel: '发生时间',
						name: 'htime',
						id: 'htime',
						xtype: 'datefield',
						format: 'Y-m-d',
						labelWidth: 60,
						afterLabelTextTpl: required,
						allowBlank: false,
						value: new Date(),
						listeners: {
							'select': function(field, value){
								Ext.getCmp('rtime').setMinValue(value);
							}
						} 
					},{
						fieldLabel: '事件类型',
						name: 'type',
						xtype: 'combo',
						labelWidth: 60,
						store: new Ext.data.SimpleStore({
							fields: ['value','text'],
							data: [
								['一类','一类'],
								['二类','二类'],
								['三类','三类'],
								['四类','四类']
							]
						}),
						afterLabelTextTpl: required,
						allowBlank: false
					},{
						fieldLabel: '上报人',
						name: 'cman',
						afterLabelTextTpl: required,
						labelWidth: 60,
						allowBlank: false
					},{
						fieldLabel: '上报单位',
						name: 'cunit',
						labelWidth: 60,
						afterLabelTextTpl: required,
						allowBlank: false
					},{
						fieldLabel: '接报人',
						name: 'rman',
						xtype: 'textfield',
						labelWidth: 60,
						afterLabelTextTpl: required,
						allowBlank: false
					},{
						fieldLabel: '死亡人数',
						name: 'death',
						columnWidth: .5,
						labelWidth: 60,
						minValue: 0
					},{
						fieldLabel: '受伤人数',
						name: 'hurt',
						columnWidth: .5,
						labelWidth: 60,
						minValue: 0
					}]
				},{
					xtype: 'container',
					columnWidth: .5,
					forcrFit: true,
					defaultType: 'textfield',
					layout: 'anchor',
					defaults: {
						anchor: '95%',
						margin: '0 0 10 0'
					},
					items: [{
						fieldLabel: '发生地点',
						name: 'location',
						afterLabelTextTpl: required,
						tooltip: '请输入事件发生地点',
						allowBlank: false
					},{
						fieldLabel: '接报时间',
						id: 'rtime',
						name: 'rtime',
						format: 'Y-m-d',
						xtype: 'datefield',
						afterLabelTextTpl: required,
						allowBlank: false,
						listeners: {
							'beforerender': function(rtime){
								rtime.setMinValue(Ext.getCmp('htime').getValue());
							}
						}
					},{
						xtype: 'combo',
						store: new Ext.data.SimpleStore({
							fields: ['value','text'],
							data: [
								['一级','一级'],
								['二级','二级'],
								['三级','三级'],
								['四级','四级']
							]
						}),
						fieldLabel: '事件等级',
						name: 'level',
						afterLabelTextTpl: required,
						allowBlank: false
					},{
						fieldLabel: '上报人电话',
						name: 'ctel',
						afterLabelTextTpl: required,
						labelWidth: 85,
						allowBlank: false
					},{
						fieldLabel: '上报单位电话',
						name: 'unittel',
						labelWidth: 85,
						afterLabelTextTpl: required,
						allowBlank: false
					},{
						xtype: 'textfield',
						labelWidth: 85,
						fieldLabel: '接报人电话',
						name: 'rtel',
						afterLabelTextTpl: required,
						allowBlank: false
					},{
						fieldLabel: '失踪人数',
						name: 'miss',
						columnWidth: .25,
						labelWidth: 85,
						minValue: 0
					},{
						fieldLabel: '总伤亡',
						name: 'casualty',
						columnWidth: .25,
						labelWidth: 85,
						minValue: 0
					}]
				}]
 			},{
 				title: '事件详情',
 				layout: 'form',
 				frame: true,
 				style: 'border: 0px',
 				padding: '0 0 0 0',
 				items: [{
				xtype: 'htmleditor',
				name: 'detail',
				frame: true,
				style: 'border: 0px',
				labelAlign: 'top',
				fieldLabel: '事件详情',
				height: 260,
				enableColors: true,
				fontFamilies: [
					"Arial", "Courier New", "Tahoma", "Times New Roman", "Verdana",
					"宋体","黑体","微软雅黑","楷体","华文楷体","华文行楷","隶书","华文彩云"
					]
				}]
 			}]
 		}],
 		buttons: [{
			text: '提交',
			height: 27,
			handler: function(){
				if(detailform.getForm().isValid){
					Ext.Msg.confirm('信息提示','确认修改当前记录？',function(btn){
						if(btn == 'yes'){
							detailform.submit({
								url: '../../event/updateEvent.do',
								waitTitle: '提交',
								waitMsg: '正在提交修改，请稍后...',
								timeout:6000,
								reset: false,
								submitEmptyText:false,
								method: 'post',
								success: function(form, action){
									Ext.Msg.alert('提示', action.result.message,function(){
										form.reset();
										detailwindow.hide();
										grid.getStore().reload();
									});
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
					})
				}
			}
		},{
			text: '放弃',
			height: 27,
			handler: function(){
				detailform.getForm().reset();
				detailwindow.hide();
			}
		}]
 	});
 	
 	var detailwindow = new Ext.Window({
 		title: '详情',
 		width: 450,
 		height: 370,
 		defaultButton: 0,
 		closeAction: 'hide',
 		maximizable: true,
 		minimizable: true,
 		closable: true,//是否开放关闭按钮，默认true
 		constrain: true,
 		resizable: true,
 		resizeHandler: 'all',
 		plain: true,
 		items: [detailform]
 	});
 	
 /************************************************************************************************************************/	
 	
 	var columns = [
 		new Ext.grid.RowNumberer(),
 		{text: '编号',dataIndex: 'id',sortable:true,align: 'center'},//默认width为100
 		{
 			text: '事件名',
 			dataIndex: 'ename',
 			sortable:false,
 			align: 'center',
 			filter: {
 				type: 'string'
 			},
 			editor: {
 				xtype: 'textfield',
 				allowBlank: false
 			}
 		},{
 			text: '类型',
 			dataIndex: 'type',
 			sortable: false,
 			align: 'center',
 			editor: new Ext.form.ComboBox({
 				store: new Ext.data.SimpleStore({
 					fields: ['key','value'],
 					data: [
 						['一类','一类'],
 						['二类','二类'],
 						['三类','三类'],
 						['四类','四类']
 					]
 				}),
 				displayField: 'value',
				valueField: 'key',
				queryMode: 'local',
				emptyText: '请选择',
				editable: false
 		})},{
 			text: '等级',
 			dataIndex: 'level',
 			sortable:false,
 			align: 'center',
 			editor: new Ext.form.ComboBox({
 				store: new Ext.data.SimpleStore({
							fields: ['key', 'value'],
							data: [
								['一级','一级'],
								['二级','二级'],
								['三级','三级'],
								['四级','四级']
							]
						}),
				displayField: 'value',
				valueField: 'key',
				queryMode: 'local',
				emptyText: '请选择',
				editable: false
 			})
 		},{
 			text: '发生时间',
 			dataIndex: 'htime',
 			sortable: true,
 			align: 'center',
			renderer:Ext.util.Format.dateRenderer('Y/m/d'),
 			editor: new Ext.form.DateField({
 				allowBlank: false
 			})
 		},{
 			text: '来电人',
 			dataIndex: 'cman',
 			sortable: false,
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},{
 			text: '接报人',
 			dataIndex: 'rman',
 			sortable: false,
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},{
 			text: '处理状态',
 			dataIndex: 'status',
 			sortable: false,
 			align: 'center',
 			editor: new Ext.form.ComboBox({
 				store: new Ext.data.SimpleStore({
					fields: ['key', 'value'],
					data: [
						['待审核','待审核'],
						['审核通过，待处理','审核通过，待处理'],
						['处理中','处理中'],
						['已处理','已处理']
					]
				}),
		displayField: 'value',
		valueField: 'key',
		queryMode: 'local',
		allowBlank: false,
		editable: false
		})
 		}
 	];
 	
 	var pagesize = 14;
 	var store = new Ext.data.JsonStore({
 		pageSize: pagesize,
 		fields: [
 			{name: 'id', type:'int',mapping: 'id'},
			{name: 'ename',type:'string', mapping: 'ename'},
			{name: 'location', type: 'string'},
			{name: 'type',type:'string'},
			{name: 'level',type:'string'},
			{name: 'detail', type: 'string'},
			{name: 'htime',type:'date', dateFormat: 'Y-m-d'},
			{name: 'rtime', type: 'date', dateFormat: 'Y-m-d'},
			{name: 'cman',type:'string'},
			{name: 'rman',type:'string'},
			{name: 'ctel',type: 'string'},
			{name: 'rtel',type: 'string'},
			{name: 'cunit', type:'string'},
			{name: 'status',type:'string'},
			{name: 'unittel',type: 'string'},
			{name: 'casualty', type: 'int'},
			{name: 'death', type: 'int'},
			{name: 'hurt', type: 'int'},
			{name: 'miss', type: 'int'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../event/findByParams.do',
 			extraParams: searchForm.getValues(),
 			reader: {
 				type: 'json',
 				root: 'root',
 				totalProperty: 'total'
 			}
 		}
 	});
 	store.load();
 	
 	var filters ={
 		ftype: 'filters',
 		encode: false, 
        local: true,
        menuFilterText: '过滤',
 		filters: [
 			{
 				type: 'date',
 				dataIndex: 'htime',
 				beforeText: '之前',
 				afterText: '之后',
 				onText: '此日'
 			},{
 				type:'list',
 				dataIndex: 'level',
 				options: ['一级','二级','三级','四级'],
 				phpMode: true
 			},{
 				type:'list',
 				dataIndex: 'type',
 				options: ['一类','二类','三类','四类'],
 				phpMode: true
 			},{
 				type: 'string',
 				dataIndex: 'status'
 			}
 		]
 	};
 
 	var grid = new Ext.grid.GridPanel({
 		region: 'center',
 		margin:'10 10 5 10',
 		autoHeight: true,
 		columnLines: true,
 		forceFit: true,
 		style: 'border:1px solid #B5B8C8',
 		store: store,
 		selModel: new Ext.selection.CheckboxModel(),
 		selType:'cellmodel',
 		columns:columns,
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
 				text: '修改',
 				iconCls: 'edit_icon',
 				handler: function(){
 					var record = grid.getSelectionModel().getSelection()[0];
 	console.log(record);
 					detailform.loadRecord(record);
 					detailwindow.show();
 				}
 			},'-',{
 				text: '删除',
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
	 									url: '../../event/deleteAll.do',
	 									params: 'data=' + Ext.encode(jsonArray),
	 									waitMsg: '正在删除，请稍后...！',
	 									waitTitle: '删除',
	 									timeout: 6000,
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
 				text: '提交修改',
 				iconCls: 'submit_icon',
 				handler: function(){
 					var modified = grid.getStore().getModifiedRecords();
 					if(modified.length != 0 && modified != null && modified != 'undefined'){
	 						Ext.Msg.confirm('信息提示','确认提交修改？',function(btn){
	 						if(btn == 'yes'){
	 							var jsonArray = [];
	 							var record;
	 							for(var i=0;i<modified.length;i++){
	 								record = modified[i].data;
	 								jsonArray.push(record);
	 							}
	 								Ext.Ajax.request({
	 									url: '../../event/updateAll.do',
	 									params: 'data=' + Ext.encode(jsonArray),
	 									waitMsg: '正在删除，请稍后...！',
	 									waitTitle: '删除',
	 									timeout: 6000,
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
 				text: '保存',
 				iconCls: 'save_icon',
 				handler: function(){
 					Ext.Msg.prompt('输入框', '请指定文件名',function(btn, text){
 						if(btn == 'ok'){
 							grid2Excel(grid,text); 
 						}
 					});
 				}
 			},'-',{
 				text: '打印',
 				iconCls: 'print_icon',
 				handler: function(){
 					print();
 				}
 			}
 		]
 	});
 	
 	var contextmenu = new Ext.menu.Menu({
 		id: 'contextmenu',
 		items: [{
 			text: '查看详情',
 			handler: function(){
 				var record = grid.getSelectionModel().getSelection();
 		console.log(record);
 				if(record){
 					detailform.loadRecord(record[0]);
 					detailwindow.show();
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
 			title: '事件查询',
 			layout: 'border',
 			items: [searchForm, grid]
 		}]
 	});
 	
 });