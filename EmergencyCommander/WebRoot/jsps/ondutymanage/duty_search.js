/**
 * 排班查询
 */
 
 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
    'Ext.ux.ProgressBarPager',
    'Ext.ux.grid.FiltersFeature'
]);
 
Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
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
				title: "查询设置",
				layout: 'column',
				padding:'5 20 10 15',
				forcefit:true,
				items: [{
					xtype: 'textfield',
					fieldLabel: '姓名',
					name: 'name',
					columnWidth: 0.2
				},{
					xtype: 'datefield',
					id: 'start_date',
					fieldLabel: '起始日期',
					format: 'Y-m-d',
					name: 'start_date',
					columnWidth: 0.25,
					value: Ext.Date.add(new Date(), Ext.Date.MONTH, -1),
					listeners: {
						'select': function(field,value){
							Ext.getCmp('end_date').setMinValue(value);
						}
					}
				},{
					xtype: 'datefield',
					id: 'end_date',
					fieldLabel: '终止日期',
					format: 'Y-m-d',
					name: 'end_date',
					columnWidth: 0.25,
					value: new Date(),
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
							ondutyGrid.getStore().getProxy().extraParams = searchForm.getValues();
							store.load();
						}
					}
				}]
			}
		]
	});
	
	var columns = [
		{xtype: 'rownumberer'},
		{text: '编号',dataIndex: 'id',sortable:true,align: 'center'},
		{header: '日期',columns:[
			{header: '值班日期',dataIndex: 'date',sortable:true,renderer:Ext.util.Format.dateRenderer('Y/m/d'),width:110,align: 'center'},
			{header: '星期',dataIndex: 'weekday',width:105,align: 'center'}
		]},
		
		{header: '值班员', columns: [
			{
				header: '姓名',dataIndex: 'name',sortable:true,width:105,align: 'center',
				filter: {
					type: 'string'
				}
			},
			{header: '班次',dataIndex: 'shift',width:105,align: 'center'},
			{header: '值班电话',dataIndex: 'dtel',width:105,align: 'center'}
		]},
		{header: '分管领导', columns: [
			{
				header: '领导姓名',dataIndex: 'leader',sortable:true,width:105,align: 'center',
				filter: {
					type: 'string'
				}
			},
			{header: '领导职务',dataIndex: 'lposition',width:105,align: 'center'},
			{header: '联系电话',dataIndex: 'ltel',width:105,align: 'center'}
		]}
	];
	
	var store = new Ext.data.JsonStore({
		pageSize: 13,
		fields:[
			{name: 'id', type:'int'},
			{name: 'date',type:'date', dateFormat:'Y年m月d号'},
			{name: 'weekday',type:'string'},
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
	
	var ondutyGrid = new Ext.grid.GridPanel({
		region: 'center',
		stripeRows: true, 
        columnLines : true,
        forceFit: true,
        height:150,
        features: [filters],
        style: 'border: 1px solid #B5B8C8',
        margins:"0 10 5 10",
        store: store,
        columns: columns,
        bbar: new Ext.PagingToolbar({
        	pageSize: 13,
        	store: store,
        	displayInfo: true,
        	displayMsg: '显示第 {0} 条到 {1} 条记录，一共 {2} 条',
        	emptyMsg: "没有记录",
        	plugins: new Ext.ux.ProgressBarPager(),
        	items: [
        		'-',{
        			text: '保存',
        			iconCls: 'save_icon',
        			handler: function(){
        				Ext.Msg.alert('信息提示','保存为excel文件');
        			}
        		},'-',{
        			text: '打印',
        			iconCls: 'print_icon',
        			handler: function(){
        				Ext.Msg.alert('信息提示','打印中。。。。');
        			}
        		}
        	]
        })
	});
	
	new Ext.Viewport({
		layout:'fit',
		items:[{
			frame:true,
			title:"排班查询",
			iconCls: 'menu1-now',
			layout: 'border',
			border:false,
			items:[searchForm,ondutyGrid]
		}]
	});
	
})