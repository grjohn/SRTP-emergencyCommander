/*
 * 排班管理
 * */
Ext.Loader.setPath('Ext.ux', '../../ext/ux');
Ext.require([
	'Ext.ux.ProgressBarPager',
	'Ext.ux.data.PagingMemoryProxy',
	'Ext.ux.grid.FiltersFeature'
]);

 Ext.onReady(function(){
 	
 	Ext.QuickTips.init();
 	var operation = 'add';
 	
	var searchForm = new Ext.form.FormPanel({
		region: 'north',
		border: false,
		style: 'border-width:0 0 0 0;',
		height: 80,
		frame: true,
		padding: '5 10 5 10',
		fieldDefaults: {
			labelAlign: 'right',
			labelWidth: 60
		},
		items: [
			{
				xtype: 'fieldset',
				title: '查询设置',
				layout: 'column',
				padding:'5 20 10 15',
				items: [{
					xtype: 'textfield',
					fieldLabel: '姓名',
					name: 'name',
					columnWidth: 0.2
				},{
					xtype: 'datefield',
					fieldLabel: '起始日期',
					id: 'start_date',
					format: 'Y-m-d',//指定日期显示格式
					name: 'start_date',
					value: new Date(),//初始显示的日期
					columnWidth: 0.25,
					listeners: {
						'select': function(field,value){
							Ext.getCmp('end_date').setMinValue(value);
						}
					}
				},{
					xtype: 'datefield',
					id: 'end_date',
					fieldLabel: '终止日期',
					minValue: new Date(),
					format: 'Y-m-d',//指定日期显示格式
					name: 'end_date',
					value: Ext.Date.add(new Date(), Ext.Date.DAY, 7),
					columnWidth: 0.25,
					listeners: {
						'select': function(field,value){
							Ext.getCmp('start_date').setMaxValue(value);
						}
					}
				},{
					xtype: 'combo',
					fieldLabel: "班次",
					columnWidth: .2,
					name: 'shift',
					store: new Ext.data.SimpleStore({
						fields: ['value', 'text'],
						data: [
							['早班','早班'],
							['晚班','晚班']
						]
					}),
					displayField: 'text',
					valueField: 'value',
					mode: 'local',
					emptyText: '请选择班次',
					editable: true
				},{
					xtype: 'button',
					text: '查询',
					columnWidth: 0.1,
					width: 50,
					margin: '0 0 0 20',
					handler: function(){
						if(searchForm.getForm().isValid()){
							resultgrid.getStore().getProxy().extraParams = searchForm.getValues();
							store.load();
						}
					}
				}]
			}
		]
	});
 	
 /*****************************************************************************************/	
	
 	var addform = new Ext.form.FormPanel({
 		frame: true,
 		style: 'border: 0px',
 		layout: 'anchor',
 		padding: '10 10 0 10',
 		trackResetOnLoad: true,
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
 			name: 'id',
 			hidden: true
 		},{
 			fieldLabel: '值班日期',
 			xtype: 'datefield',
 			format: 'Y-m-d',
 			name: 'date',
 			minValue: new Date(),
 			value: new Date(),
 			allowBlank: false,
 			listeners: {
 				'select': function(field, value){
 				addform.getComponent('weekday').setValue(value);
 				}
 			}
 		},{
 			xtype: 'datefield',
 			format: 'Y-m-d',
 			name: 'weekday',
 			id: 'weekday',
 			hidden: true,
 			value: new Date(),
 			allowBlank: false
 		},{
 			fieldLabel: '领导',
 			name: 'leader',
 			allowBlank: false
 		},{
 			fieldLabel: '领导职位',
 			name: 'lposition',
 			allowBlank: false
 		},{
 			fieldLabel: '领导电话',
 			xtype: 'numberfield',
 			hideTrigger: true,
 			maxLength: 11,
 			maxLengthText: '号码不可超过11位数',
 			name: 'ltel',
 			allowBlank: false
 		},{
 			fieldLabel: '值班员',
 			name: 'name',
 			allowBlank: false
 		},{
 			fieldLabel: '班次',
 			name: 'shift',
 			xtype: 'combo',
 			store: new Ext.data.SimpleStore({
 				fields: ['key','value'],
		 			data: [
		 				['早班','早班'],
		 				['晚班','晚班']
		 			]
 			}),
 			displayField: 'value',
	 		valueField: 'key',
	 		queryMode: 'local',
	 		emptyText: '请选择',
	 		allowBlank: false,
	 		editable: false
 		},{
 			fieldLabel: '值班室电话',
 			xtype: 'textfield',
 			hideTrigger: true,
 			name: 'dtel',
 			allowBlank: false,
 			maxLength: 11,
 			maxLengthText: '号码不可超过11位数'
 		}]
 	});

 	
 	var addwindow = new Ext.Window({
 		title: '值班信息',
 		width: 300,
 		height: 300,
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
 					if(operation == 'add'){
	 						addform.getForm().submit({
	 						url: '../../onduty/add.do',
	 						waitTitle : '提交',
	 						headers: 'text/json;charset=UTF-8',
							waitMsg : '正在保存数据，稍后...',
	 						success: function(form, action){
	 							Ext.Msg.alert('信息提示',action.result.message,function(){
	 								addwindow.hide();
	 								addform.getForm().reset();
 									resultgrid.getStore().reload();
	 							});
	 						},
	 						failure: function(form, action){
	 							if(action.result.errors){
									Ext.Msg.alert('信息提示',action.result.errors);
								}else{
									Ext.Msg.alert('信息提示','连接失败');
								}
	 						}
	 					});
 					}else if(operation == 'update'){
 						if(addform.isDirty()){
 							addform.getForm().submit({
 							url: '../../onduty/update.do',
 							waitTitle : '提交',
	 						headers: 'text/json;charset=UTF-8',
							waitMsg : '正在保存数据，稍后...',
							success: function(form, action){
	 							Ext.Msg.alert('信息提示',action.result.message,function(){
	 								addwindow.hide();
	 								addform.getForm().reset();
 									resultgrid.getStore().reload();
	 							});
	 						},
	 						failure: function(form, action){
		 							if(action.result.errors){
										Ext.Msg.alert('信息提示',action.result.errors);
									}else{
										Ext.Msg.alert('信息提示','连接失败');
									}
	 							}
 							});
 						}else{Ext.Msg.alert('操作错误','数据未被修改，无需更新！');}
 					}else{
 						alert('缺少操作指示！');
 					}
 				}
 			}
 		},{
 			text: '放弃',
 			handler: function(){
 				addwindow.hide();
 			}
 		}]
 	});
	
	
	
/******************************************************************************************************/	
 	//定义表头
 	var columns = [
 		{text: '编号',dataIndex: 'id',sortable:true,align: 'center'},
		
		{text: '日期',columns:[
			{
				text: '值班日期',
				dataIndex: 'date',
				sortable:true,
				renderer:Ext.util.Format.dateRenderer('Y/m/d'),
				width:100,
				align: 'center',
				editor: new Ext.form.DateField({
					format: 'Y/m/d',
					minValue: new Date(),
					allowBlank: false
				})
			},
			{
				text: '星期',
				dataIndex: 'weekday',
				width:100,
				align: 'center',
				renderer:Ext.util.Format.dateRenderer('l')
			}
		]},
		{text: '值班员', columns: [
			{
				text: '姓名',
				dataIndex: 'name',
				sortable:true,
				width:100,
				align: 'center',
				filter: {
					type: 'string'
				},
				editor: {
					allowBlank: false
				}
			},
			{
				text: '班次',
				dataIndex: 'shift',
				width:100,
				align: 'center',
				editor: new Ext.form.ComboBox({
					store: new Ext.data.SimpleStore({
						fields: ['value','text'],
						data: [
								['早班', '早班'],//
								['晚班', '晚班']
							]
					}),
					emptyText: '请选择',
					mode: 'local',
					triggerAction: 'all',
					valueField: 'value',
					displayField: 'text',
					editable: false
				}),
				renderer: function(value){
					if(value == '早班'){
						return '早班';
					}else{return '晚班';}
				}
			},
			{
				text: '值班电话',
				dataIndex: 'dtel',
				width:105,
				align: 'center',
				editor: {
					allowBlank: false
				}
			}
		]},
		{text: '分管领导', columns: [
			{
				text: '领导姓名',
				dataIndex: 'leader',
				sortable:true,
				width:100,
				align: 'center',
				filter: {
					type: 'string'
				},
				editor: {
					allowBlank: false
				}
			},
			{
				text: '领导职务',
				dataIndex: 'lposition',
				width:100,
				align: 'center',
				editor: {
					allowBlank: false
				}
			},
			{
				text: '联系电话',
				dataIndex: 'ltel',
				width:100,
				align: 'center',
				filter: {
					type: 'string'
				},
				editor: {
					allowBlank: false
				}
			}
		]}
 	];
 	
 	var pagesize = 14;
 	var store = new Ext.data.JsonStore({
 		pageSize: pagesize,//定义每页显示个数
 		fields: [
 			{name: 'id', type:'int'},
			{name: 'date',type:'date', dateFormat:'Y-m-d'},
			{name: 'weekday',type:'date',dateFormat: 'Y-m-d'},//l表示’星期一‘这种格式
			{name: 'leader',type:'string'},
			{name: 'lposition',type:'string'},
			{name: 'ltel',type:'string'},
			{name: 'name',type:'string'},
			{name: 'shift',type:'string'},
			{name: 'dtel',type:'string'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../onduty/findByParams.do',
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
 				dataIndex: 'date',
 				beforeText: '之前',
 				afterText: '之后',
 				onText: '此日'
 			}
 		]
 	};
 	
 	//定义grid
 	var resultgrid = new Ext.grid.GridPanel({
 		id: 'resultgrid',
 		autoHeight: true,
 		region:'center',
 		store: store,
 		columnLines:true,
 		forceFit:true,
 		style: 'border:1px solid #B5B8C8',
 		margin:'0 10 10 10',
 		columns: columns,
 		features: [filters],
 		selModel:new Ext.selection.CheckboxModel(),
 		selType:'cellmodel',
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
 				text: '增加',
 				iconCls: 'add_icon',
 				handler: function(){
 					addform.getForm().setValues({
 						id: 0,
 						date: new Date(),
 						weekday: new Date(),
 						leader: '',
 						ltel: '',
 						lposition: '',
 						name: '',
 						dtel: '',
 						shift:''
 					});
 					addform.getForm().reset();
 					addwindow.show();
 					operation = 'add';
 				}
 			},'-',{
 				text: '修改',
 				iconCls: 'edit_icon',
	 			handler: function(){
	 				var records = resultgrid.getSelectionModel().getSelection();
	 				if(records){
	 					addwindow.show();
	 					addform.getForm().loadRecord(records[0]);
	 					operation = 'update';
	 				}else{
	 					Ext.Msg.alert('提示','请至少选中一行');
	 				}
	 			}
 			},'-',{
 				text: '删除',
 				iconCls: 'delete_icon',
 				handler: function(){
 					Ext.Msg.confirm('信息提示','确认删除当前记录？',function(btn){
 						if(btn == 'yes'){
 							var selected = resultgrid.getSelectionModel().selected;
 							var record;
 							var jsonArray = [];
 							if(selected.length !=0 && selected != null && selected != '' && selected != 'undefined'){
 								for(var i=0; i<selected.length; i++){
 									record = selected.get(i);
 									jsonArray.push(record.data);
 								}
 								Ext.Ajax.request({
		 								headers: 'text/json;charset=UTF-8',
		 								url: '../../onduty/deleteAll.do',
		 								params: {data: Ext.encode(jsonArray)},//两种传参写法一样
		 								method: 'post',
		 								success: function(response){
		 									Ext.Msg.alert('提示',response.responseText);
		 									resultgrid.getStore().load();
		 								},
		 								failure:  function(response){
		 									Ext.Msg.alert('错误','与后台连接失败！');
		 								}
		 							});
 							}else{
 								Ext.Msg.alert('提示','请至少选中一条记录');
 							}
 						}
 					});
 				}
 			},'-',{
 				text: '提交修改',
 				iconCls: 'submit_icon',
 				handler: function(){
 					Ext.Msg.confirm('信息提示','确认提交修改结果？',function(btn){
 						if(btn == 'yes'){
 							var record;
 							var weekday;
 							var jsonArray = [];
 							var modified = resultgrid.getStore().getModifiedRecords();
 							if(modified.length !=0 && modified != null && modified != '' && modified != 'undefined'){
 								for(var i=0; i<modified.length;i++){
	 								record = modified[i];
	 								if(record.isModified('date')){//指定字段是否被修改了
	 									weekday = record.get('date');
	 									record.set('weekday', weekday);
	 								}
	 								jsonArray.push(record.data);
		 							Ext.Ajax.request({
		 								headers: 'text/json;charset=UTF-8',
		 								url: '../../onduty/updateAll.do',
		 								params: 'data=' + Ext.encode(jsonArray),
		 								method: 'post',
		 								success: function(response){
		 									Ext.Msg.alert('提示',response.responseText);
		 									resultgrid.getStore().load();
		 								},
		 								failure: function(response){
		 									Ext.Msg.alert('错误','与后台连接失败！');
		 								}
		 							});
	 							}
 							}else{
 								Ext.Msg.alert('提示','未有任何修改需要提交！');
 							}
 						}
 					});
 				}
 			},'-',{
 				text: '保存',
 				iconCls: 'save_icon',
 				type: 'excel',
 				handler: function(){
 					Ext.Msg.prompt('输入框', '请指定文件名',function(btn, text){
 				//alert(btn);
 						if(btn == 'ok'){
 							grid2Excel(resultgrid,text); 
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
 	
 	//定义主视图，完成页面整体布局
 	new Ext.Viewport({
 		layout: 'fit',
 		items: [{
 			frame: true,
 			title: '排班管理',
 			layout: 'border',
 			items: [searchForm,resultgrid]
 		}]
 	});
 })