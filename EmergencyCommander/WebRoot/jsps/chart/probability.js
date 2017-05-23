/**
 * 统计报表-概率统计
 */
 
 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'
]);
 
 Ext.onReady(function(){
 	
 	Ext.QuickTips.init();
/****************************************************north部分****************************************/ 
 	var searchform = new Ext.form.FormPanel({
 		region: 'north',
 		frame: true,
 		style: 'border: 0px',
 		height: 80,
 		fieldDefaults: {
 			labelAlign: 'right',
 			labelWidth: 60,
 			msgTarget: 'side'
 		},
 		items: [{
 			xtype: 'fieldset',
 			title: '内容设置',
 			autoScroll: false,
			padding:'10 20 15 15',
			layout: 'column',
			colapsible: true,
 			items: [{
 				xtype: 'combo',
 				columnWidth: .2,
 				fieldLabel: '统计内容',
 				autoSelect: true,
 				name: 'event_type',
 				store: new Ext.data.SimpleStore({
					fields: ['key','value'],
					data: [
						['0','事件类型统计'],
						['1','事件等级统计']
					]
				}),
				displayField: 'value',
				valueField: 'key',
				queryMode: 'local',//ComboBox加载本地数据
				emptyText: '请选择',
				editable: false,
				allowBlank: false,
				listeners: {
					'select': function(combo, records){
						if(records[0].get('key') == 0){
							centerpanel.items.removeAt(0);
							centerpanel.items.add('typechart',typechart);
						}else{
							centerpanel.items.removeAt(0);
							centerpanel.items.add('levelchart',levelchart);
						}
					}
				}
 			},{
 				xtype: 'datefield',
 				columnWidth: .4,
 				margin: '0 0 0 70',
 				fieldLabel: '统计日期',
 				format: 'Y-m',
 				value: Ext.Date.add(new Date(), Ext.Date.MONTH, -3),
 				name: 'date_start',
 				id: 'date_start'
 			},{
 				xtype: 'label',
 				text: '至',
				padding:'3 9 0 9'
 			},{
 				xtype: 'datefield',
 				columnWidth: .2,
 				format: 'Y-m',
 				value: new Date(),
 				name: 'date_end',
 				id: 'date_end'
 			},{
 				xtype: 'button',
 				text: '载入数据',
				columnWidth: .2,
				width: 40,
				height: 25,
				margin: '0 0 0 70',
				handler: function(){
					if(searchform.getForm().isValid()){
						gridstore.getProxy().extraParams = {start_date: Ext.getCmp('date_start').getValue(),end_date: Ext.getCmp('date_end').getValue()},
						gridstore.load();
						var store_now = centerpanel.items.items[0].getStore();
						store_now.load({
							params:{start_date: Ext.getCmp('date_start').getValue(),end_date: Ext.getCmp('date_end').getValue()},
							callback: function(records,operation,success){
								if(success){
									console.log('载入数据成功！');
								}else{
									Ext.Msg.alert('提示', '载入数据失败！');
								}
							}
						});
						centerpanel.doLayout();
					}
				}
 			}]
 		}]
 	});

/*******************************************west部分****************************************************************/ 	
 	
 	var columns = [
 		new Ext.grid.RowNumberer(),
 		{text: '编号',dataIndex: 'id',sortable:true,align: 'center',width: 50},//默认width为100
 		{
 			header: '事件名',
 			dataIndex: 'ename',
 			sortable:true,
 			align: 'center',
 			width: 50
 		},{
 			header: '类型',
 			dataIndex: 'type',
 			sortable: false,
 			align: 'center',
 			width: 50
 		},{
 			header: '等级',
 			dataIndex: 'level',
 			sortable:false,
 			align: 'center',
 			width: 50
 		},{
 			header: '发生时间',
 			dataIndex: 'htime',
 			sortable: true,
 			align: 'center',
 			width: 60,
			renderer:Ext.util.Format.dateRenderer('Y/m/d')
 		}
 	];
 
 	var gridstore = new Ext.data.Store({
 		pageSize:13,
 		fields: [
 			{name:'id',type:'int'},
 			{name:'ename',type:'string'},
 			{name:'type',type:'string'},
 			{name:'level',type:'string'},
 			{name:'htime',type:'date',dateFormat: 'Y-m-d'}
 		],
 		proxy: {
 			type:'ajax',
 			url:'../../event/findByParams.do',
 			reader: {
 				type:'json',
 				root:'root',
 				totalProperty: 'total',
 				idProperty: 'id'
 			}
 		}
 	});
 	
 	
 	/**
 	 * grid
 	 */
 	var grid = new Ext.grid.GridPanel({
 		autoHeight: true,
		loadMsk: true,
		columnLines: true,
		margin: '10 0 0 0',
 		forceFit: true,
 		style: 'border:1px solid #B5B8C8',
 		selType:'cellmodel',
		columns:columns,
		store:gridstore,
 		bbar: new Ext.PagingToolbar({
 			pageSize:13,
 			store: gridstore,
 			emptyMsg: '无记录',
 			plugins: new Ext.ux.ProgressBarPager()
 		})
 	});
 	
 	/**
 	 * 西部panel,里面放grid
 	 */
 	var westpanel = new Ext.Panel({
 		region: 'west',
 		title: '所得记录',
 		width: 400,
 		collapsible: false,
 		split: false,
 		autoScroll:true,
 		frame: true,
 		items: [grid]
 	});
 	
 /*************************************************center部分**********************************************************/	
 	var levelstore = new Ext.data.JsonStore({
 		storeId: 'levelstore',
 		fields: [
 			{name: 'level',type: 'string'},
 			{name: 'count', type: 'int'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../chart/pie_level.do',
 			reader: {
 				type: 'json'
 			}
 		}
 	});
 	
 	var levelchart = new Ext.chart.Chart({
 		id: 'levelchart',
 		store: levelstore,
 		animate: true,
 		shadow: true,
 		width: '100%',
 		insetPadding: 30,
 		padding: '5 0 0 0',
 		legend: {
 			field: 'level',
 			position: 'right',
 			boxStrokeWidth: 0,
 			boxFill: '#dfe9f6'
 		},
 		items: [{
 			type: 'text',
 			text: '事件等级统计图',
 			font: '18px 宋体',
            x: 200, // the sprite x position
            y: 12  // the sprite y position
 		}],
 		series: [{
 			type: 'pie',
 			angleField: 'count',
 			showInLegend: true,
 			highlight: true,
 			label: {
 				field: 'level',//默认值为'name'
 				display: 'rotate',
 				font: '14px 宋体, sans-serif',
 				contrast: true
 			},
 			tips: {
 				trackMouse: true,
 				width: 80,
 				height: 40,
 				renderer: function(storeItem, item){
 					var store = levelchart.getStore();
 					var total = 0;
 					for(var i = 0; i<store.data.items.length; i++){
 						total += store.data.items[i].get('count');
 					}
 					var percent = Math.round(storeItem.get('count')/total*100) + '%';
 					this.setTitle(storeItem.get('level') + ':' + percent + '<br>'+ '事件数：' + storeItem.get('count'));
 				}
 			}
 		}]
 	});
 	
 	var typestore = new Ext.data.JsonStore({
 		storeId: 'typestore',
 		fields: [
 			{name: 'type', type: 'string'},
 			{name: 'count',type: 'int'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../chart/pie_type.do',
 			reader: {
 				type: 'json'
 			}
 		}
 	});
  
 	var typechart = new Ext.chart.Chart({
 		store: typestore,
 		id: 'typechart',
 		animate: true,
 		shadow: true,
 		 width: '100%',
 		insetPadding: 30,
 		padding: '5 0 0 0',
 		/**
 		 * 参考Ext.chart.legend
 		 */
 		legend: {
 			field: 'type',
 			position: 'bottom',
 			boxStrokeWidth: 0,
 			boxFill: '#dfe9f6'
 		},
 		items: [{
 			type: 'text',
 			text: '事件类型统计图',
 			font: '18px 宋体',
            x: 200, // the sprite x position
            y: 12  // the sprite y position
 		}],
 		series: [{
 			type: 'pie',
 			angleField: 'count',
 			showInLegend: true,
 			highlight: true,
 			label: {
 				field: 'type',//默认值为'name'
 				display: 'rotate',
 				font: '14px 宋体, sans-serif',
 				contrast: true
 			},
 			tips: {
 				trackMouse: true,
 				width: 80,
 				height: 40,
 				renderer: function(storeItem,item){
 					var store = typechart.getStore();
 					var total = 0;
 					for(var i = 0; i<store.data.items.length; i++){
 						total += store.data.items[i].get('count');
 					}
 					var percent = Math.round(storeItem.get('count')/total*100) + '%';
 					this.setTitle(storeItem.get('type') + ':' + percent + '<br>'+ '事件数：' + storeItem.get('count'));
 				}
 			}
 		}]
 	});
 	
 	/**
 	 * 中部面板
 	 */
 	var centerpanel = new Ext.Panel({
 		region: 'center',
 		frame: true,
 		title: '统计图',
 		layout: 'fit',
 		items: [],
 		tbar: ['->',{
 			text: '保存图表',
 			iconCls: 'chart_save',
 			handler: function(){
 				Ext.Msg.confirm('下载图表','下载当前图表？', function(choice){
 					var id = centerpanel.items.keys[0];
 					if(choice == 'yes'){
 						mySave(Ext.getCmp(id).surface,{
 					        type: 'image/png'
 					    });
 					}
 				});
 			}
 		}]
 	});
 /**********************************************************************************************************************/	
 	new Ext.Viewport({
 		layout: 'fit',
 		items:[{
 			title: '概率统计',
 			frame:true,
 			layout: 'border',
 			buttonAlign: 'right',
 			items:[searchform,westpanel,centerpanel]
 		}]
 	});
 	
 	 var mySave = function(surface, config) {
         config = config || {};
         var exportTypes = {
                 'image/png': 'Image',
                 'image/jpeg': 'Image',
                 'image/svg+xml': 'Svg'
             },
             prefix = exportTypes[config.type] || 'Svg',
             exporter = Ext.draw.engine[prefix + 'Exporter'];          
             exporter.defaultUrl = '../../image/svg.do';
         return exporter.generate(surface, config);
     };
 	
 	
 });