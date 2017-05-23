/**
 * 通讯录管理
 */
 
 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
	'Ext.ux.data.PagingMemoryProxy',
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'
]);
 
Ext.namespace('contact');


 
 Ext.onReady(function(){
 	
 	Ext.QuickTips.init();
 	
 	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
 	
 	var tree = new Ext.tree.TreePanel({
 		region: 'west',
 		title: '机构单位',
 		width: 200,
 		collapsible: true,
 		rootVisible: false,
 		split: true,
 		minWidth: 150,
 		maxWidth: 300,
 		useArrows: true,
 		autoScroll:true,
 		animate:true,
 		frame: true,
 		store: new Ext.data.TreeStore({
 			proxy: {
 				type: 'ajax',
 				url: '../../contact/loadmenu.do'
 			},
 			root: {text: '0', id: '0',leaf: false}
 		}),
 		buttonAlign: 'center',
 		listeners: {
 			'load': function(){
 				tree.getRootNode().expandChildren(false,this.parent);
 			}
 		}
 	});
 	tree.on('itemclick',function(view, record, item, index, e){
 		if(record.raw.leaf){
 			var itemid = record.raw.id;
 			if(itemid.match(/^02/)){//若是本单位信息，则显示grid
 				contentpanel.items.removeAt(0);
	 			contentpanel.items.add('contact_grid',grid);
	 			grid.getStore().getProxy().extraParams = {did: itemid};
	 			grid.getStore().load();
	 			
 			}else{
 				contentpanel.items.removeAt(0);
	 			contentpanel.items.add('contact_form',form);
	 			form.getForm().setValues({id: itemid});
	 			form.getForm().load({
	 				url: '../../contact/findbyid.do',
	 				params: "id=" + itemid,
	 				method: 'post',
	 				reset: false,
	 				waitTitle: '载入',
	 				waitMsg: '正在载入，请稍候。。',
	 				timeout: 6000,
	 				success: function(form, action){
	 					if(action.result.data.id == null){//无单位信息记录时提示
	 						Ext.Msg.alert('提示','无此单位信息，可自行添加！');
	 					}
	 				},
	 				failure: function(form, action){
	 					if(action.result.errors){
	 						Ext.Msg.alert('错误','载入失败！');
	 					}else{
	 						Ext.Msg.alert('错误','与后台连接失败！');
	 					}
	 				}
	 			});
 			}
	 		contentpanel.doLayout();
 		}
 	});
 	
 	var treemenu = new Ext.menu.Menu({
 		id: 'treemanu',
 		items: [{
 			text: '添加子节点',
 			handler: function(){
 			
 			}
 		},{
 			text: '删除本节点',
 			handler: function(){
 				
 			}
 		},{
 			text: '查看详情',
 			handler: function(){
 				
 			}
 		}]
 	});
 	tree.on('itemcontextmenu',function(view,record,item,index,e){
 		e.preventDefault();
 		treemenu.showAt(e.getXY());
 	});
 /************************************************表单相关************************************************************/	
 	Ext.define('model', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'id',type:'string'},
	 		{name:'name',type:'string'},
	 		{name: 'contact',type:'string'},
	 		{name:'ctel',type: 'string'},
	 		{name:'dtel',type: 'string'},
	 		{name: 'email',type: 'string'},
	 		{name: 'address',type: 'string'},
	 		{name: 'postalcode',type: 'string'},
	 		{name: 'intro',type: 'string'},
	 		{name: 'comment',type: 'string'}
    ],
    validations: [
    	{field:'email', type:'email'},
    	{field: 'name', type: 'format', matcher: /([a-z]+)[0-9]{2,3}/},
    	{field: 'name',type:'presence'}//验证值是否存在
    ]
});
 	var form = new Ext.form.FormPanel({
 		frame: true,
 		id: 'contact_form',
 		layout: 'anchor',
 		padding: '10 15 10 10',
 		trackResetOnLoad: true,
 		buttonAlign: 'center',
 		reader: new Ext.data.reader.Json({
 			model: model
 		}),
 		fieldDefaults: {
 			labelAlign: 'right',
			labelWidth: 85,
			msgTarget: 'side'
		},
 		items: [{
 			xtype: 'container',
 			layout: 'column',
 			border: false,
 			items: [{
 				columnWidth: .5,
 				frame: true,
 				style: 'border: 0px;',
 				layout: 'anchor',
 				border: false,
 				defaultType:'textfield',
 				defaults: {
 					anchor: '100%'
 				},
 				items: [{
 					fieldLabel: '机&nbsp构&nbsp代&nbsp码',
 					readOnly:true,
					name: 'id',
					afterLabelTextTpl: required,
					allowBlank: false
 				},{
 					fieldLabel: '联&nbsp&nbsp&nbsp系&nbsp&nbsp&nbsp人',
					name: 'contact',
					afterLabelTextTpl: required,
					allowBlank: false
 				},{
 					fieldLabel: '值班室电话',
					name: 'dtel',
					afterLabelTextTpl: required,
					allowBlank: false
 				},{
 					fieldLabel: '邮&nbsp政&nbsp编&nbsp码',
					name: 'postalcode',
					afterLabelTextTpl: required,
					allowBlank: false
 				}]
 			},{
 				columnWidth: .5,
 				frame: true,
 				style: 'border: 0px;',
 				layout: 'anchor',
 				defaultType:'textfield',
 				defaults: {
 					anchor: '100%'
 				},
 				items: [{
 					fieldLabel: '单位名称',
					name: 'name',
					editable: false,
					afterLabelTextTpl: required,
					allowBlank: false
 				},{
 					fieldLabel: '联系电话',
					name: 'ctel',
					afterLabelTextTpl: required,
					allowBlank: false
 				},{
 					fieldLabel: '电子邮箱',
					name: 'email',
					vtype: 'email',
					afterLabelTextTpl: required,
					allowBlank: false
 				},{
 					fieldLabel: '单位地址',
					name: 'address',
					afterLabelTextTpl: required,
					allowBlank: false
 				}]
 			}]
 		},{
 			frame: true,
 			style: 'border: 0px;',
 			layout: 'anchor',
 			defaults:{
 				anchor: '100%'
 			},
 			items: [{
	 			fieldLabel: '单&nbsp位&nbsp简&nbsp介',
				name: 'intro',
				xtype: 'textarea',
				afterLabelTextTpl: required,
				maxLength: 1000,
				maxLengthText: '备注不可超过1000个字符',
				height: 150,
				allowBlank: false
	 		},{
	 			fieldLabel: '&nbsp&nbsp&nbsp备&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp注',
	 			labelAlign: 'left',
				name: 'comment',
				xtype: 'textarea',
				maxLength: 255,
				maxLengthText: '备注不可超过255个字符',
				height: 100,
				allowBlank: true
	 		}]
 		}],
		buttons: [{
			text: '提交修改',
			height: 27,
			cls: 'button green',
			handler: function(){
 				console.log(form.getValues());
 				if(form.getForm().isValid()){
 					Ext.Msg.confirm('提示','确认提交修改？',function(buttonId){
 						if(buttonId == 'yes'){
 							form.submit({
		 						url: '../../contact/saveorupdate.do',
		 						waitTitle: '提交',
								waitMsg: '正在保存数据，请稍后...',
								timeout:6000,
								reset: false,
								submitEmptyText:false,
								method: 'post',
		 						success:function(form,action){
		 							Ext.Msg.alert('提示',action.result.message);
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
 					});
 				}
 			}
		},{
			text: '放弃',
			height: 27,
			cls: 'button green',
			handler: function(){
				form.getForm().reset();
			}
		}]
 	});
 	
 /************************************************************************************************************************/	
 	
 	var addform = new Ext.form.FormPanel({
 		frame: true,
 		style: 'border: 0px',
 		layout: 'anchor',
 		padding: '10 10 0 10',
 		fileUpload: true,
 		fieldDefaults: {
 			labelAlign: 'left',
 			labelWidth: 45,
			msgTarget: 'side'
 		},
 		defaults: {
			anchor: '100%',
			xtype: 'textfield'
 		},
 		items: [{
 			fieldLabel: '职&nbsp&nbsp工编&nbsp&nbsp号',
 			name: 'id',
 			allowBlank: false
 		},{
 			fieldLabel: '姓&nbsp&nbsp名',
 			name: 'name',
 			allowBlank: false
 		},{
 			fieldLabel: '职&nbsp&nbsp位',
 			name: 'position',
 			allowBlank: false
 		},{
 			fieldLabel: '所&nbsp&nbsp在部&nbsp&nbsp门',
 			name: 'department',
 			allowBlank: false,
 			xtype: 'combo',
			store: new Ext.data.SimpleStore({
				fields: ['value','text'],
				data: [
					['办公室','办公室'],
					['组织部','组织部'],
					['宣传部','宣传部'],
					['值守部','值守部']
				]
			}),
			editable: false,
			displayField: 'text',
			valueField: 'value',
			queryMode: 'local',
			emptyText: '请选择',
			listeners: {
				'select': function(combo, records){
					var value = combo.value;
					if(value == '办公室'){
						Ext.getCmp('did').setValue('020');
					}else if(value == '组织部'){
						Ext.getCmp('did').setValue('021');
					}else if(value == '宣传部'){
						Ext.getCmp('did').setValue('022');
					}else{
						Ext.getCmp('did').setValue('023');
					}
				}
			}
 		},{
 			fieldLabel: '部&nbsp&nbsp门编&nbsp&nbsp号',
 			name: 'did',
 			id: 'did',
 			allowBlank: false,
 			readOnly: true
 		},{
 			fieldLabel: '联&nbsp&nbsp系电&nbsp&nbsp话',
 			name: 'tel',
 			allowBlank: false,
 			maxLength: 20,
 			maxLength: '联系电话不可超出20个字符'
 		},{
 			fieldLabel: '入&nbsp&nbsp职时&nbsp&nbsp间',
 			xtype: 'datefield',
 			name: 'time',
 			allowBlank: true,
 			value: new Date(),
 			format: 'Y-m-d'
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
 					addform.submit({
 						url: '../../personInfo/addPerson.do',
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
 /***********************************************************************************************************************/	
 	var columns = [
 		new Ext.grid.RowNumberer(),
 		{
 			text: '职工编号', 
 			dataIndex: 'id', 
 			sortable: true, 
 			align: 'center'
 		},
 		{
 			text: '姓名', 
 			dataIndex: 'name', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},
 		{
 			text: '职位', 
 			dataIndex: 'position', 
 			sortable: false, 
 			align: 'center',
 			editor: {
 				allowBlank: false
 			}
 		},
 		{
 			text: '部门编号',
 			dataIndex: 'did',
 			sortable:true,
 			align: 'center',
 			editor: new Ext.form.ComboBox({
 				store: new Ext.data.SimpleStore({
 					fields: ['key','value'],
 					data: [
 						['020','办公室'],
	 					['021','组织部'],
	 					['022','宣传部'],
	 					['023','值守部']
	 				]
	 			}),
	 			displayField: 'value',
				valueField: 'key',
				queryMode: 'local',
				emptyText: '请选择',
				editable: false
			})
 		},
 		{
 			header: '电话', 
 			dataIndex: 'tel', 
 			sortable: false, 
 			align: 'center',
 			width: 100,
 			editor: {
 				allowBlank: true
 			}
 		},
 		{
 			header: '入职时间', 
 			dataIndex: 'time', 
 			sortable: true, 
 			align: 'center',
			renderer:Ext.util.Format.dateRenderer('Y-m-d'),
			editor: {
				xtype:'datefield'
			}
 		}
 	];
 	
 	var pageSize = 13;
 	var store = new Ext.data.JsonStore({
 		
 		pageSize: pageSize,
 		fields: [
 			{name: 'id', type: 'string'},
 			{name: 'name', type: 'string'},
 			{name: 'position', type: 'sting'},
 			{name: 'did',type:'string'},
 			{name: 'tel', type: 'sting'},
 			{name: 'time', type: 'date',dateFormat: 'Y-m-d'},
 			{name: 'department', type: 'string'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../personInfo/findByParams.do',
 			
 			reader: {
 				type: 'json',
 				root: 'root',
 				idProperty: 'id',
 				totalProperty: 'total'
 			}
 		}
 	});
 	store.on('beforeload',function(){
 		
 	});
 
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
 			dataIndex: 'position'
 		},{
 			type: 'string',
 			dataIndex: 'tel'
 		},{
 			type: 'string',
 			dataIndex: 'did'
 		},{
 			type: 'string',
 			dataIndex: 'id'
 		}]
 	};
 	
 	var grid = new Ext.grid.GridPanel({
 		region: 'center',
 		id:'contact_grid',
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
 				text: '新增职员',
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
	 						var did = record.get('did');
	 						var department;
	 						if(did == '020'){
	 							department = '办公室';
	 						}else if(did == '021'){
	 							department = '组织部';
	 						}else if(did == '022'){
	 							department = '宣传部';
	 						}else{
	 							department = '值守部';
	 						}
	 						record.set('department', department);
	 						jsonArray.push(modified[i].data);
	 					}
	 					Ext.Ajax.request({
	 						url:'../../personInfo/updateAll.do',
	 						waitMsg: '正在更新，请稍后...',
		 					waitTitle: '更新',
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
	 									url: '../../personInfo/deleteAll.do',
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
 			}
 		]
 	});

 /****************************************************************************************************************************/
 	
 	var contentpanel = new Ext.Panel({
 		region: 'center',
 		title: '信息',
 		frame:true,
 		forceFit: true,
 		layout: 'fit',
 		items: [form]
 	});
 	
 	/**
 	 * 定义主视图
 	 */
 	new Ext.Viewport({
 		layout: 'fit',
 		items: [{
 			frame: true,
 			//title: '通讯录',
 			layout: 'border',
 			items: [tree,contentpanel]
 		}]
 	});
 	
 })