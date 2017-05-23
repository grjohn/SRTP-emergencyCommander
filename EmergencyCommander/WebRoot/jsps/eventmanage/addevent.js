/**
 * 事件接报
 */
 
 Ext.onReady(function(){
 	
 	Ext.QuickTips.init();
 	
 	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
 	
 	var addeventform = new Ext.form.FormPanel({
 		frame: true,
 		style: 'border: 0px',
 		layout: 'anchor',
 		buttonAlign: 'center',
 		fieldDefaults: {
 			labelAlign: 'right',
			labelWidth: 60,
			msgTarget: 'side'
		},
		items: [{
			xtype: 'container',
			layout: 'column',
			defaults: {
				anchor: '100%'
			},
			items: [{
				xtype: 'fieldset',
				columnWidth: .5,
				title: '事件信息',
				layout: 'column',
				padding: '15 10 10 20',
				collapsible: true,
				autoHeight: true,
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
						fieldLabel: '编号',
						id: 'eventid',
						value: 0,
						name: 'id',
						hidden: true
					},{
						fieldLabel: '事件状态',
						name: 'status',
						value: '待处理',
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
						id: 'htime',
						name: 'htime',
						xtype: 'datefield',
						format: 'Y-m-d',
						value: new Date(),
						labelWidth: 60,
						afterLabelTextTpl: required,
						allowBlank: false,
						editable: false,
						listeners: {
							'select': function(field, value){
								Ext.getCmp('rtime').setMinValue(value);
							}
						}
					},{
						fieldLabel: '事件类型',
						xtype: 'combo',
						name: 'type',
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
						allowBlank: false,
						editable: false
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
						afterLabelTextTpl: required,
						name: 'location',
						tooltip: '请输入事件发生地点',
						allowBlank: false
					},{
						fieldLabel: '接报时间',
						name: 'rtime',
						id: 'rtime',
						xtype: 'datefield',
						format: 'Y-m-d',
						value: new Date(),
						afterLabelTextTpl: required,
						allowBlank: false,
						editable: false,
						listeners: {
							'beforerender': function(rtime){
								rtime.setMinValue(Ext.getCmp('htime').getValue());
							}
						}
					},{
						xtype: 'combo',
						name: 'level',
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
						afterLabelTextTpl: required,
						allowBlank: false,
						editable: false
					}]
				}]
			},{
				xtype: 'fieldset',
				columnWidth: .5,
				title: '接报信息',
				layout: 'column',
				padding: '15 10 10 20',
				margin: '0 0 0 10',
				//forceFit: true,
				collapsible: true,
				autoHeight: true,
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
						xtype: 'textfield',
						name: 'rman',
						labelWidth: 60,
						afterLabelTextTpl: required,
						allowBlank: false
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
						fieldLabel: '上报人电话',
						xtype: 'numberfield',
						hideTrigger: true,
						name: 'ctel',
						afterLabelTextTpl: required,
						labelWidth: 85,
						allowBlank: false
					},{
						fieldLabel: '上报单位电话',
						labelWidth: 85,
						xtype: 'numberfield',
						hideTrigger: true,
						name: 'unittel',
						afterLabelTextTpl: required,
						allowBlank: false
					},{
						xtype: 'textfield',
						labelWidth: 85,
						xtype: 'numberfield',
						hideTrigger: true,
						name: 'rtel',
						fieldLabel: '接报人电话',
						afterLabelTextTpl: required,
						allowBlank: false
					}]
				}]
			
			}]
		},{
			xtype: 'fieldset',
			title: '当前伤亡',
			layout: 'column',
			autoHeight: true,
			padding: '10 15 10 10',
			collapsible: true,
			defaults: {
				anchor: '100%',
				margin: '0 0 0 5'
			},
			defaultType: 'numberfield',
			items: [{
				fieldLabel: '死亡人数',
				name:'death',
				columnWidth: .25,
				minValue: 0
			},{
				fieldLabel: '受伤人数',
				columnWidth: .25,
				name:'hurt',
				minValue: 0
			},{
				fieldLabel: '失踪人数',
				columnWidth: .25,
				name:'miss',
				minValue: 0
			},{
				fieldLabel: '总伤亡',
				columnWidth: .25,
				name:'casualty',
				minValue: 0
			}]
		},{
			xtype:'container',
			layout: 'form',
			autoHeight: true,
			padding: '0 0 10 0',
			items: [{
				labelAlign: 'top',
				xtype: 'htmleditor',
				name: 'detail',
				fieldLabel: '事件详情',
				enableColors: true,
				fontFamilies: [
					"Arial", "Courier New", "Tahoma", "Times New Roman", "Verdana",
					"宋体","黑体","微软雅黑","楷体","华文楷体","华文行楷","隶书","华文彩云"
				]
			}]
		}],
		buttons: [{
			text: '上报',
			height: 27,
			cls: 'button green',
			handler: function(){
				if(addeventform.getForm().isValid()){
					addeventform.submit({
						url: '../../event/addEvent.do',
	 					headers: 'text/json;charset=UTF-8',
						waitMsg: '正在提交数据，请稍后....',
						waitTitle: '提交',
						success: function(form, action){
							Ext.Msg.alert('提示',action.result.message);
							form.reset();
						},
						failure: function(form,action){
							if(action.result.errors){
								Ext.Msg.alert('提示',action.result.errors);
							}else{
								Ext.Msg.alert('提示', '与后台连接出错！');
							}
						}
					});
				}
			}
		},{
			text: '重置',
			height: 27,
			cls: 'button green',
			handler: function(){
				addeventform.getForm().reset();
			}
		}]
 	});
 	
 	new Ext.Viewport({
 		layout: 'fit',
 		items: [{
 			layout: 'fit',
 			frame: true,
 			items: [addeventform]
 		}]
 	});
 	
 });