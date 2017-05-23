/**
 *统计报表-粗统计 
 */

Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'//一定要引入相关包和文件
]);


 Ext.onReady(function(){
 	
 	
 	var searchform = new Ext.form.FormPanel({
 		region: 'north',
 		frame: true,
 		style: 'border: 0px',
 		height: 80,
 		fieldDefaults: {
 			labelAlign: 'right',
 			labelwidth: 130,
 			msgTarget: 'side'
 		},
 		items: [{
 			xtype: 'fieldset',
 			title: '内容设置',
 			autoScroll: false,
 			padding: '10 20 15 15',
 			layout: 'column',
			colapsible: true,
			items: [{
				xtype: 'combo',
				columnWidth: .25,
				autoSelect: true,
				fieldLabel: '统计选择',
				name: 'type',
				store: new Ext.data.SimpleStore({
					fields: ['key','value'],
					data: [
						['0','事件类型统计'],
						['1','事件等级统计']
					]
				}),
				displayField: 'value',
				valueField: 'key',
				queryMode: 'local',
				emptyText: '请选择',
				allowBlank: false,
				editable: false,
				listeners: {
					'select': function(combo,records){
//console.log(records.length);
						if(records[0].get('key') == 0){//是类型统计
							centerpanel.items.removeAt(0);
							centerpanel.items.add('typechart', typechart);
						}else{//等级统计
							centerpanel.items.removeAt(0);
							centerpanel.items.add('levelchart', levelchart);
						}
					}
				}
			},{
				xtype: 'datefield',
 				columnWidth: .35,
 				margin: '0 0 0 30',
 				fieldLabel: '统计日期',
 				format: 'Y-m',
 				value: Ext.Date.add(new Date(), Ext.Date.MONTH, -3),
 				name: 'date_start',
 				id: 'date_start'
			},{
				xtype: 'label',
 				text: '至',
				padding:'3 9 0 9'//一定要记得带上单位
			},{
				xtype: 'datefield',
 				columnWidth: .18,
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
								//console.log(operation);
								//console.log(records);
								if(success){
									console.log('载入数据成功！');
								}else{
									Ext.Msg.alert('提示', '载入数据失败！');
								}
							}
						});
						//刷新panel
						centerpanel.doLayout();
					}
				}
			}]
 		}]
 	});
/***************************************************************************************************/
 	
 	/**
 	 * 等级图数据仓库
 	 */
 	var levelstore = new Ext.data.JsonStore({
 		storeId: 'levelstore',
 		fields: [
 			{name: 'month',type: 'string'},
 			{name: 'level1',type: 'int'},
 			{name: 'level2',type: 'int'},
 			{name: 'level3',type: 'int'},
 			{name: 'level4',type: 'int'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../chart/rough_level.do',
 			reader: {
 				type: 'json'
 			}
 		}
 	});
 	/**
 	 * 定义等级统计图
 	 */
 	var levelchart = new Ext.chart.Chart({
 		id: 'levelchart',
 		store: levelstore,
 		animate: true,
 		shadow: true,
 		width: '100%',
 		padding: '5 0 0 0',
 		insetPadding: 30,
 		legend: {
 			position: 'right',
 			boxStrokeWidth: 0,
 			labelFont: '12px Helvetica'
 		},
 		items: [{
 			type: 'text',
 			text: '等级折线图',
 			font: '22px Helvetica',
 			x : 250, //the sprite x position
            y : 12  //the sprite y position
 		}],
 		axes: [{
 			type: 'Numeric',
 			position: 'left',
 			fields: ['level1','level2', 'level3', 'level4'],
 			title: '发生次数',
 			grid: true,
 			label: {
 				renderer: function(v){
 					return v;
 				}
 			}
 		},{
 			type: 'Category',
 			fields: 'month',
 			position: 'bottom',
 			title: '月份',
 			grid: true,
 			label: {
 				rotate: {degrees: -45}
 			}
 		}],
 		series: [{
 			type: 'line',
 			axis: 'left',
 			title: '一级',
 			xField: 'month',
 			yField: 'level1',
 			style: {
 				 'stroke-width': 2
 			},
 			showMarkers: true,
 			markerConfig: {
 				type: 'circle',
 				radius: 4
 			},
 			highlight: true,
 			tips: {
 				trackMouse: true,
 				style: 'background: #FFF',
 				height: 40,
 				width: 130,
 				renderer: function(storeItem,item){
 					var title = item.series.title;
 					this.setTitle(title + '事件' + '<br>' + storeItem.get('month') + '发生次数:' + storeItem.get(item.series.yField));
 					//console.log(item);
 				}
 			}
 		},{
 			type: 'line',
 			axis: 'left',
 			title: '二级',
 			xField: 'month',
 			yField: 'level2',
 			style: {
 				 'stroke-width': 2
 			},
 			showMarkers: true,
 			markerConfig: {
 				type: 'circle',
 				radius: 4
 			},
 			highlight: true,
 			tips: {
 				trackMouse: true,
 				style: 'background: #FFF',
 				height: 40,
 				width: 130,
 				renderer: function(storeItem,item){
 					var title = item.series.title;
 					this.setTitle(title + '事件' + '<br>' + storeItem.get('month') + '发生次数:' + storeItem.get(item.series.yField))
 				}
 			}
 		},{
 			type: 'line',
 			axis: 'left',
 			title: '三级',
 			xField: 'month',
 			yField: 'level3',
 			style: {
 				 'stroke-width': 2
 			},
 			showMarkers: true,
 			markerConfig: {
 				type: 'circle',
 				radius: 4
 			},
 			highlight: true,
 			tips: {
 				trackMouse: true,
 				style: 'background: #FFF',
 				height: 40,
 				width: 130,
 				renderer: function(storeItem,item){
 					var title = item.series.title;
 					this.setTitle(title + '事件' + '<br>' + storeItem.get('month') + '发生次数:' + storeItem.get(item.series.yField))
 				}
 			}
 		},{
 			type: 'line',
 			axis: 'left',
 			title: '四级',
 			xField: 'month',
 			yField: 'level4',
 			style: {
 				 'stroke-width': 2
 			},
 			showMarkers: true,
 			markerConfig: {
 				type: 'circle',
 				radius: 4
 			},
 			highlight: true,
 			tips: {
 				trackMouse: true,
 				style: 'background: #FFF',
 				height: 40,
 				width: 130,
 				renderer: function(storeItem,item){
 					var title = item.series.title;
 					this.setTitle(title + '事件' + '<br>' + storeItem.get('month') + '发生次数:' + storeItem.get(item.series.yField))
 				}
 			}
 		}]
 	});

 	
 		/**
 	 	* 类型图数据仓库
 	 	*/
 	var typestore = new Ext.data.JsonStore({
 		storeId: 'typestore',
 		fields: [
 			{name: 'month',type: 'string'},
 			{name: 'type1',type: 'int'},
 			{name: 'type2',type: 'int'},
 			{name: 'type3',type: 'int'},
 			{name: 'type4',type: 'int'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../chart/rough_type.do',
 			reader: {
 				type: 'json'
 			}
 		}
 	});
 	
 	/**
 	 * 类型图
 	 */
 	var typechart = new Ext.chart.Chart({
 		store: typestore,
 		id: 'typechart',
 		animate: true,
 		shadow: true,
 		width: '100%',
 		padding: '5 0 0 0',
 		insetPadding: 30,
 		legend: {
 			position: 'right',
 			boxStrokeWidth: 0,
 			labelFont: '12px Helvetica'
 		},
 		items: [{
 			type: 'text',
 			text: '类型折线图',
 			font: '22px Helvetica',
 			x : 250, //the sprite x position
            y : 12  //the sprite y position
 		}],
 		axes: [{
 			type: 'Numeric',
 			position: 'left',
 			fields: ['type1','type2', 'type3', 'type4'],
 			title: '发生次数',
 			grid: true,
 			label: {
 				renderer: function(v){
 					return v;
 				}
 			}
 		},{
 			type: 'Category',
 			fields: 'month',
 			position: 'bottom',
 			title: '月份',
 			grid: true,
 			label: {
 				rotate: {degrees: -45}
 			}
 		}],
 		series: [{
 			type: 'line',
 			axis: 'left',
 			title: '一类',
 			xField: 'month',
 			yField: 'type1',
 			style: {
 				 'stroke-width': 2
 			},
 			showMarkers: true,
 			markerConfig: {
 				type: 'circle',
 				radius: 4
 			},
 			highlight: true,
 			tips: {
 				trackMouse: true,
 				style: 'background: #FFF',
 				height: 40,
 				width: 130,
 				renderer: function(storeItem,item){
 					var title = item.series.title;
 					this.setTitle(title + '事件' + '<br>' + storeItem.get('month') + '发生次数:' + storeItem.get(item.series.yField));
 					console.log(item);
 				}
 			}
 		},{
 			type: 'line',
 			axis: 'left',
 			title: '二类',
 			xField: 'month',
 			yField: 'type2',
 			style: {
 				 'stroke-width': 2
 			},
 			showMarkers: true,
 			markerConfig: {
 				type: 'circle',
 				radius: 4
 			},
 			highlight: true,
 			tips: {
 				trackMouse: true,
 				style: 'background: #FFF',
 				height: 40,
 				width: 130,
 				renderer: function(storeItem,item){
 					var title = item.series.title;
 					this.setTitle(title + '事件' + '<br>' + storeItem.get('month') + '发生次数:' + storeItem.get(item.series.yField))
 				}
 			}
 		},{
 			type: 'line',
 			axis: 'left',
 			title: '三类',
 			xField: 'month',
 			yField: 'type3',
 			style: {
 				 'stroke-width': 2
 			},
 			showMarkers: true,
 			markerConfig: {
 				type: 'circle',
 				radius: 4
 			},
 			highlight: true,
 			tips: {
 				trackMouse: true,
 				style: 'background: #FFF',
 				height: 40,
 				width: 130,
 				renderer: function(storeItem,item){
 					var title = item.series.title;
 					this.setTitle(title + '事件' + '<br>' + storeItem.get('month') + '发生次数:' + storeItem.get(item.series.yField))
 				}
 			}
 		},{
 			type: 'line',
 			axis: 'left',
 			title: '四类',
 			xField: 'month',
 			yField: 'type4',
 			style: {
 				 'stroke-width': 2
 			},
 			showMarkers: true,
 			markerConfig: {
 				type: 'circle',
 				radius: 4
 			},
 			highlight: true,
 			tips: {
 				trackMouse: true,
 				style: 'background: #FFF',
 				height: 40,
 				width: 130,
 				renderer: function(storeItem,item){
 					var title = item.series.title;
 					this.setTitle(title + '事件' + '<br>' + storeItem.get('month') + '发生次数:' + storeItem.get(item.series.yField));
 				}
 			}
 		}]
 	});
 	var centerpanel =  new Ext.Panel({
 		region: 'center',
 		title: '统计图',
 		frame: true,
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
/********************************************************************************************/	
 	/**
 	 * 定义表格字段
 	 */
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
 			width: 80,
			renderer:Ext.util.Format.dateRenderer('Y/m/d')
 		}
 	];
 	
 	/**
 	 * 定义表格仓库
 	 */
 	var gridstore = new Ext.data.Store({
 		pageSize: 13,
 		fields: [
 			{name:'id',type:'int'},
 			{name:'ename',type:'string'},
 			{name:'type',type:'string'},
 			{name:'level',type:'string'},
 			{name:'htime',type:'date',dateFormat: 'Y-m-d'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../event/findByParams.do',
 			reader: {
 				type: 'json',
 				root: 'root',
 				totalProperty: 'total',
 				idProperty: 'id'
 			}
 		}
 	});
 	
 	var grid = new Ext.grid.GridPanel({
 		region: 'west',
 		title: '所得记录',
 		width: 350,
 		layout: 'fit',
 		columns: columns,
 		store: gridstore,
 		forceFit: true,
 		autoHeight: true,
 		loadMask: true,
 		columnLines: true,
 		style: 'border:1px solid #B5B8C8',
 		selType: 'cellmodel',
 		bbar: new Ext.PagingToolbar({
 			store: gridstore,
 			emptyMsg: '无记录',
 			plugins: new Ext.ux.ProgressBarPager()
 		})
 	});
/***************************************************************************************/ 	
 	
 	/**
 	 *自定义的chart的图表保存处理，解决ext.chart自带的save中文乱码问题
 	 */
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
 	
 	
 	/**
 	 * 定义主视图
 	 */
 	new Ext.Viewport({
 		layout: 'fit',
 		items: [{
 			title: '事件粗统计',
 			frame: true,
 			layout: 'border',
 			items:[searchform,grid,centerpanel]
 		}]
 	}); 
 	
 });