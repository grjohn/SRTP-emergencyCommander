/**
 * 通话记录管理
 */

 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'
]);
 
Ext.onReady(function(){
	var searchform = new Ext.form.FormPanel({
		region: 'north',
		frame: true,
		style: 'border: 0px',
 		height: 80,
 		padding: '5 10 5 10',
 		fieldDefaults: {
 			labelAlign: 'right',
 			labelWidth: 60,
 			msgTarget: 'side'
 		},
		items: [{
			xtype:'fieldset',
			title: '查询设置',
			autoScroll: false,
			padding:'10 20 15 15',
			layout: 'column',
			colapsible: true,
			defaultType: 'textfield',
			items:[{
				columnWidth: .19,
				fieldLabel:'主叫号码',
				name: 'caller',
				emptyText:'请输入主叫号码',
				name: 'caller'
			},{
				columnWidth:.19,
				fieldLabel:'被叫号码',
				name: 'called',
				emptyText:'请输入被叫号码',
				name:'called'
			},{
				columnWidth:.28,
				xtype: 'datefield',
				id:'start_date',
				fieldLabel: '查询日期',
				name:'start_date',
				format: 'Y-m-d,H时i分s秒',
				value: Ext.Date.add(new Date(),Ext.Date.DAY,-1),
				listeners: {
					'select': function(field,value){
						Ext.getCmp('end_date').setMinValue(value);
					}
				}
			},{
				xtype: 'label',
				text: '至',
				padding:'3 9 0 9'
			},{
				columnWidth: .2,
				xtype:'datefield',
				id: 'end_date',
				name:'end_date',
				format: 'Y-m-d,H时i分s秒',
				value:new Date(),
				listeners: {
					'select': function(field,value){
						Ext.getCmp('start_date').setMaxValue(value);
					}
				}
			},{
				xtype: 'button',
				text: '查询',
				columnWidth: .11,
				width: 50,
				margin: '0 0 0 30',
				handler: function(){
					if(searchform.getForm().isValid()){
						grid.getStore().getProxy().extraParams = searchform.getValues();
						store.load();
					}
				}
			}]
		}]
	});
/*****************************************************************************************/	
	
 	var columns = [
 		new Ext.grid.RowNumberer(),
 		{
 			header: '编号', 
 			dataIndex: 'id', 
 			sortable: true, 
 			align: 'center'
 		},
 		{
 			header: '主叫号码', 
 			dataIndex: 'caller', 
 			sortable: false, 
 			align: 'center'
 		},
 		{
 			header: '被叫号码', 
 			dataIndex: 'called', 
 			sortable: false, 
 			align: 'center'
 		},
 		{
 			header: '通话时长', 
 			dataIndex: 'timelong', 
 			sortable: true, 
 			align: 'center'
 		},
 		{
 			header: '拨打时间', 
 			dataIndex: 'time', 
 			sortable: true, 
 			align: 'center',
 			width: 100,
 			renderer: Ext.util.Format.dateRenderer('Y-m-d,H时i分s秒')
 		}
 	];
 	var pagesize = 10;
 	var store = new Ext.data.JsonStore({
 		pageSize:pagesize,
 		fields: [
 			{name:'id',type:'string'},
 			{name:'caller',type:'string'},
 			{name:'called',type:'string'},
 			{name:'timelong',type:'string'},
 			{name:'time',type:'date',dateFormat: 'time'}
 		],
 		proxy:{
 			type:'ajax',
 			url:'../../callrecord/findByParams.do',
 			extraParams: searchform.getValues(),
 			reader: {
 				type:'json',
 				root:'root',
 				totalProperty: 'total',
 				idProperty: 'id'
 			}
 		}
 	});
	
	var filters = {
 		ftype: 'filters',
 		encode: false,
 		local: true,
 		menuFilterText: '过滤',
 		updateBuffer: '100',
 		filters: [{
 			type: 'string',
 			dataIndex: 'caller'
 		},{
 			type: 'string',
 			dataIndex: 'called'
 		}]
 	};
	/**
	 * 创建显示grid
	 */
	var grid = new Ext.grid.GridPanel({
		region:'center',
		margin:'10 10 5 10',
		autoHeight: true,
		loadMsk: true,
 		columnLines: true,
 		forceFit: true,
 		style: 'border:1px solid #B5B8C8',
 		selModel: new Ext.selection.CheckboxModel(),
 		selType:'cellmodel',
		columns:columns,
		store:store,
		features: [filters],
		plugins: [
			new Ext.grid.plugin.CellEditing({
				clicksToEdit: 2
			})
		],
 		bbar: new Ext.PagingToolbar({
 			pageSize:10,
 			store: store,
 			displayInfo: true,//显示提示信息
 			displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
 			emptyMsg: '无记录',
 			plugins: new Ext.ux.ProgressBarPager()
 		}),
 		tbar:[{
 				text: '删除文件',
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
	 									url: '../../callrecord/deleteAll.do',
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
 			}]
		
	});
	store.load();
/**************************************************************************************/
	
	new Ext.Viewport({
		layout: 'fit',
		items: [{
			frame: true,
			title:'通话记录',
			layout:'border',
			items: [searchform,grid]
		}]
	});
	
	
})