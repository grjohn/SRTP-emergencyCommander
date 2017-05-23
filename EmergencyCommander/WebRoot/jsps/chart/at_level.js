/**
 * 统计报表-细统计-按等级
 */
 
 Ext.Loader.setPath('Ext.ux', '../../ext/ux');
 
 Ext.require([
 	'Ext.ux.ProgressBarPager',
	'Ext.ux.grid.FiltersFeature'
]);
 
 
 
 Ext.onReady(function(){
 	
 	var detailstore = new Ext.data.JsonStore({
 		fields: ['name', 'count'],
 		proxy: {
 			type: 'ajax',
 			url: '../../chart/casualty.do',
 			reader: {
 				type: 'json'
 			}
 		}
 	});
 	
 	var detailchart = new Ext.chart.Chart({
 		store: detailstore,
 		storeId: 'detailstore',
 		animate: true,
 		shadow: true,
 		width: '100%',
 		insetPadding: 25,
 		axes: [{
 			type: 'Numeric',
 			position: 'left',
 			fields: 'count',
 			grid: false,
 			label: {
 				renderer: function(v){return v;}
 			}
 		},{
 			type: 'Category',
 			fields: 'name',
 			position: 'bottom'
 		}],
 		series: [{
 			type: 'column',
 			axis: 'left',
 			highlight: true,
 			xField: 'name',
 			yField: 'count',
 			label: {
 				display: 'insideEnd',
 				field: 'count',
 				renderer: Ext.util.Format.numberRenderer('0'),
 				color: '#333'
 			}
 		}]
 	});
 	
 	var detail = new Ext.Window({
 		title: '伤亡情况',
 		width: 400,
 		height: 320,
 		layout: 'fit',
 		buttonAlign: 'center',
 		defaultFocus: 1,
 		closeAction: 'hide',
 		minimizable: true,
 		modal: true,
 		closable: true,//是否开放关闭按钮，默认true
 		constrain: true,
 		resizable: false,
 		resizeHandler: 'all',
 		animateTarget: '',
 		plain: true,
 		items: [detailchart],
 		buttons: [{
 			text: '关闭',
 			handler: function(){
 				detail.hide();
 			}
 		}]
 	});
 	
 /*******************************************************************************************/	
 
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
				columnWidth: .2,
				fieldLabel: '事件等级',
				name: 'level',
				id: 'level',
				store: new Ext.data.SimpleStore({
					fields: ['key','value'],
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
				allowBlank: false,
				editable: false
			},{
				xtype: 'datefield',
 				columnWidth: .4,
 				margin: '0 0 0 70',
 				fieldLabel: '统计日期',
 				format: 'Y-m',
 				value: Ext.Date.add(new Date(), Ext.Date.MONTH, -3),
 				editable: false,
 				name: 'start_date',
 				id: 'start_date'
			},{
				xtype: 'label',
 				text: '至',
				padding:'3 9 0 9'//一定要记得带上单位
			},{
				xtype: 'datefield',
 				columnWidth: .2,
 				format: 'Y-m',
 				value: new Date(),
 				editable: false,
 				name: 'end_date',
 				id: 'end_date'
			},{
				xtype: 'button',
 				text: '载入数据',
				columnWidth: .2,
				width: 40,
				height: 25,
				margin: '0 0 0 70',
				handler: function(){
					if(searchform.getForm().isValid()){
						gridstore.getProxy().extraParams = searchform.getValues();
						gridstore.load();
						chartstore.load({
							params: searchform.getValues(),
							callback: function(records,operation,success){
								if(success){
									console.log('载入数据成功！');
								}else{
									Ext.Msg.alert('提示', '载入数据失败！');
								}
							}
						});
					}
					
				}
			}]
 		}]
 	});
 /******************************************************************************************/	
 
 	var chartstore = new Ext.data.JsonStore({
 		storeId: 'chartstore',
 		fields: [
 			{name: 'month',type: 'string'},
 			{name: 'type1',type: 'int'},
 			{name: 'type2',type: 'int'},
 			{name: 'type3',type: 'int'},
 			{name: 'type4',type: 'int'}
 		],
 		proxy: {
 			type: 'ajax',
 			url: '../../chart/at_level.do',
 			reader: {
 				type: 'json'
 			}
 		}
 	});
 	
 	var chart = new Ext.chart.Chart({
 		id: 'chart',
 		store: chartstore,
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
 			text: '一级事件各类别折线图',
 			font: '22px Helvetica',
 			 x : 190, //the sprite x position
             y : 12  //the sprite y position
 		}],
 		axes: [{
 			type: 'Numeric',
 			fields: ['type1', 'type2', 'type3','type4'],
 			position: 'left',
 			title: '发生次数',
 			grid: true,
 			label: {
 				renderer: function(v){return v;}
 			}
 		},{
 			type: 'Category',
 			fields: ['month'],
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
 			title: '二类',
 			xField: 'month',
 			yField: 'type2',
 			style: {
 				'stroke-width': 2
 			},
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
 					this.setTitle(title + '事件' +'<br>'+ storeItem.get('month') + '发生次数：' + storeItem.get(item.series.yField))
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
 			markerConfig: {
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
 					this.setTitle(title + '事件' +'<br>'+ storeItem.get('month') + '发生次数：' + storeItem.get(item.series.yField))
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
 			markerConfig: {
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
 					this.setTitle(title + '事件' +'<br>'+ storeItem.get('month') + '发生次数：' + storeItem.get(item.series.yField));
 				}
 			}
 		}]
 	});
 	
 	
 	var centerpanel =  new Ext.Panel({
 		region: 'center',
 		title: '统计图',
 		frame: true,
 		layout: 'fit',
 		items: [chart],
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
 	
 /******************************************************grid相关*******************************************************/	
 	
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
 			url: '../../chart/findByParams.do',
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
 		selType: 'rowmodel',
 		bbar: new Ext.PagingToolbar({
 			store: gridstore,
 			emptyMsg: '无记录',
 			plugins: new Ext.ux.ProgressBarPager()
 		})
 	});
 
 	var contextmenu = new Ext.menu.Menu({
 		id: 'contextmenu',
 		items: [{
 			text: '伤亡统计',
 			handler: function(){
 				detailstore.load({
 					params: {id: grid.getSelectionModel().getSelection()[0].get('id')}
 				});
 				detail.show();
 			}
 		}]
 	});
 	
 	grid.on('itemcontextmenu', function(view, record, item, index, e){
 		e.preventDefault();
 		contextmenu.showAt(e.getXY());
 	});
 	
 /******************************************************************************************************************/	
 	
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
 		items:[{
 			title: '统计报表',
 			frame:true,
 			layout: 'border',
 			buttonAlign: 'right',
 			items:[searchform,grid,centerpanel]
 		}]
 	});
 	
 });