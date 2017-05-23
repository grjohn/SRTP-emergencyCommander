/**
 * 主页面
 */
 
 Ext.onReady(function(){
 

 	var answer_time = '';
 	var drop_time = '';
 	var caller = '026-8897651';
 	var called = '';
 	var timelong = '';
 	
 /****************************************************************************************************************************/
	
 	var north = new Ext.Panel({
 		region: 'north',
	 	id: 'header',
	 	cls:'header',
	 	height: 70,
	 	html:'<div width="100%" height="100%" border="0" cellspacing="0" style="table-layout:fixed">'+
	 		'<div width="100%" style="background:url(images/logobackground.png); padding-top:2px">'+
	 		'<div id="logo">'+
	 		'<img src="images/sysname.png" id="logoname"></img>&nbsp;</div></div>'+
	 		+
	 		'</div>',
	 	margins: '5 5 5 5'
 	});
 /************************************************************************************************************************/
 	
 	var south = new Ext.Panel({
 		region: 'south',
	 	height: 30,
	 	cls: 'footer',
	 	tbar: [{
	 		text: "退出系统",
	 		iconCls: 'sys-logout',
	 		handler: function(){
	 			Ext.Msg.confirm('提示', '确定退出系统？', function(btn){
	 				if(btn == 'yes'){
	 					App.Logout();
	 				}
	 			});
	 		}
	 	},'-',{
	 		tag: 'div',
	 		html: "欢迎您," + log_name
	 	},'->',{
			xtype : 'combo',
			mode : 'local',
			editable : false,
			value : '切换皮肤',
			width : 100,
			triggerAction : 'all',
			store : [['classic', '默认风格'], 
					['gray', '灰色空间'],
					['access', 'accessibility'], 
					['neptune', 'Neptune']],
			listeners : {
				scope : this,
				'select': function(combo) {
					if (combo.getValue == 'default'){
						Ext.util.CSS.swapStyleSheet('theme', "ext/resources/css/ext-all.css");
					}else{
						var theme = "ext/resources/css/ext-all-"+ combo.getValue() + ".css";
						App.setCookie("system-theme",theme,7);
						Ext.util.CSS.swapStyleSheet('theme', theme);
					}
				}
			}
		}]
 	});
 	
 /************************************************************************************************************************/
 	
 	var west = new Ext.Panel({
	 		region: 'west',
	 		id: 'navigator',
	 		iconCls: 'navigator',
	 		title: "导航菜单",
	 		width: 180,
	 		split: true,
	 		minWidth: 150, 
	 		maxWidth:300,
	 		animCollapse:true,
	 		collapsible: true,
	 		margins: '0 0 0 5',
	 		autoScoll:false,
	 		layout: 'accordion',
	 		items:[],
	 		loadMenu: function(){
	 			Ext.Ajax.request({
	 				url: 'user/loadMainMenu.do',
	 				success: function(response){
	 					var menudata = eval(response.responseText);
	 					for(var i=0; i<menudata.length; i++){
	 						var menupanel = new Ext.tree.TreePanel({
	 							rootVisible: false,
 								border: false,
 								autoScroll: false,
 								id : menudata[i].id,
								title : menudata[i].text,
								iconCls : menudata[i].iconCls,
 								store: new Ext.data.TreeStore({
 									root: {
 										text: 'root',
 										children: menudata[i].children
 									}
 								}),
 								listeners: {
 									'itemclick': function(view, record, item, index, e){
 										if(record.raw.leaf){
 										var tab = Ext.getCmp('Tab_' + record.get('id'));
 										var rootpath = window.location.href;
 										rootpath = rootpath.replace("jsps/main/index.jsp","");
 										
 										if(!tab){
 											var tab = new Ext.Panel({
 												id: 'Tab_' + record.get('id'),
 												title: record.get('text'),
 												closable: true,
 												layout: 'fit',
												minTabWidth:'200px',
												border: false,
												autoScroll: true,
												html: '<iframe id="frame_tab_'+record.get('id')+'" src="' + rootpath + record.raw.url +'" width="100%" height="100%" scrolling="auto" frameborder="0" ></iframe>'
 											});
 											Ext.getCmp('main-center').add(tab);
 										}
 										Ext.getCmp('main-center').setActiveTab(tab);
 										}
 									}
 								}
	 						});
	 						west.add(menupanel);
	 					}
	 				}
	 			});
	 		}
	 	});
	 	west.loadMenu();
/********************************************************************************************************************************/

	 	var east = new Ext.FormPanel({
	 		region: 'east',
	 		id:'call-area',
	 		title: "拨号区",
	 		layout:'form',
	 		frame:true,
	 		width: 200,
	 		collapsible: true,
	 		split: true,
	 		maxWidth: 250,
	 		minWidth: 180,
	 		items: [{
	 			xtype: 'fieldset',
	 			title: '拨号区',
				autoScroll: true,
				collapsible: true,
				items:[{
					xtype: 'numberfield',
	 				anchor: '100%',
	 				height: 40,
	 				id: 'telnumfield',
	 				hideTrigger: true
				},{
						xtype:'container',
	 					layout: 'hbox',
	 					frame:true,
	 					style: 'border: 0px',
	 					border:false,
	 					defaultType: 'button',
	 					margin: '10 0 0 0',
	 					padding: '3 3 3 3',
	 					items:[{
	 						text: '1',
	 						height: 40,
	 						flex: 1,
	 						margins: '5 5 5 0',
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'1');
									}
	 					},{
	 						text:'2',
	 						height: 40,
	 						flex: 1,
	 						margins: '5 5 5 5',
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'2');
									}
	 					},{
	 						text:'3',
	 						height: 40,
	 						flex: 1,
	 						margins: '5 0 5 5',
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'3');
									}
	 					}]
	 				},{
	 					layout: 'hbox',
	 					border:false,
	 					frame: true,
	 					style: 'border: 0px',
	 					padding: '3 3 3 3',
	 					defaultType: 'button',
	 					items:[{
	 						text: '4',
	 						margin: '5 5 5 0',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'4');
									}
	 					},{
	 						text:'5',
	 						margin: '5 5 5 5',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'5');
									}
	 					},{
	 						text:'6',
	 						margin: '5 0 5 5',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'6');
									}
	 					}]
	 				},{
	 					layout: 'hbox',
	 					border:false,
	 					style: 'border: 0px',
	 					frame: true,
	 					padding: '3 3 3 3',
	 					defaultType: 'button',
	 					items:[{
	 						text: '7',
	 						margin: '5 5 5 0',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'7');
									}
	 					},{
	 						text:'8',
	 						margin: '5 5 5 5',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'8');
									}
	 					},{
	 						text:'9',
	 						margin: '5 0 5 5',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'9');
									}
	 					}]
	 				},{
	 					layout: 'hbox',
	 					border:false,
	 					frame: true,
	 					padding: '3 3 3 3',
	 					style: 'border: 0px',
	 					defaultType: 'button',
	 					items:[{
	 						text: '0',
	 						margin: '5 5 5 0',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
										var telnum = Ext.getCmp('telnumfield');
										var pre = telnum.getValue();
										if(pre == null){
											pre = '';
										}
										telnum.setValue(pre+'0');
									}
	 					},{
	 						text: "清空",
	 						margin: '5 5 5 5',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
	 							Ext.getCmp('telnumfield').setValue(null);
	 						}
	 					},{
	 						text: "拨号",
	 						id:'call_button',
	 						margin: '5 0 5 5',
	 						height: 40,
	 						flex: 2,
	 						handler: function(){
	 							called = Ext.getCmp('telnumfield').getValue();
	 							caller = '0594-8876523';
	 							if(called == null || called == ''){
	 								Ext.Msg.alert("拨号","请输入号码！！");
	 							}else{
	 								answer_time = new Date();
	 								Ext.getCmp('answer_button').setDisabled(true);
	 								Ext.getCmp('call_button').setDisabled(true);
	 								Ext.getCmp('drop_button').setDisabled(false);
	 							}
	 							Ext.Ajax.request({
	 								url: 'callrecord/sendMsg.do',
	 								params: {called: called},
	 								success: function(response){
	 									console.log(response.responseText);
	 								},
	 								failure: function(response){
	 									console.log(response.responseText);
	 								}
	 							});
	 						}
	 					}]
	 				}]
	 		},{
	 			xtype: 'fieldset',
	 			title:'接听区',
	 			collapsible: true,
	 			items: [{
	 				xtype: 'numberfield',
	 				anchor: '100%',
	 				height: 40,
	 				id: 'receivefield',
	 				value: '18628346560',
	 				readOnly: true,
	 				hideTrigger: true
	 			},{
	 					layout: 'hbox',
	 					border:false,
	 					frame: true,
	 					padding: '3 3 3 3',
	 					style: 'border: 0px',
	 					defaultType: 'button',
	 					items:[{
	 						text: "接听",
	 						id:'answer_button',
	 						margin: '5 5 5 5',
	 						height: 40,
	 						flex: 1,
	 						handler: function(){
	 							answer_time = new Date();
	 							caller = Ext.getCmp('receivefield').getValue();
	 							called = '0594-8876523';
	 							Ext.getCmp('call_button').setDisabled(true);
	 							Ext.getCmp('answer_button').setDisabled(true);
	 							Ext.getCmp('drop_button').setDisabled(false);
	 							Ext.Msg.alert("接听时间",Ext.Date.format(answer_time,'Y-m-d,H时i分s秒'));
	 						}
	 					},{
	 						text: "挂断",
	 						id:'drop_button',
	 						margin: '5 0 5 5',
	 						height: 40,
	 						flex: 1,
	 						disabled: true,
	 						handler: function(){
	 							drop_time = new Date();
	 							timelong = drop_time-answer_time;
	 							 var seconds = parseInt(timelong/1000);
	 							 var minutes = 0;
	 							 var hours = 0;
	 							 if(!(seconds < 60)){
	 							 	minutes = parseInt(seconds/60);
	 							 	seconds = seconds%60;
	 							 	if(!(minutes < 60)){
	 							 		hours = parseInt(minutes/60);
	 							 		minutes = parseIntminutes%60;
	 							 	}
	 							 }
	 							Ext.getCmp('call_button').setDisabled(false);
	 							Ext.getCmp('answer_button').setDisabled(false);
	 							Ext.getCmp('drop_button').setDisabled(true);
	 							Ext.Ajax.request({
	 								url: 'callrecord/addCall.do',
	 								params: {id: 0,time: Ext.Date.format(answer_time,'Y-m-d,H时i分s秒'), called: called, caller: caller, timelong:hours+'时'+minutes+'分'+seconds+'秒'},
	 								success: function(response){
	 									called = '';
	 									answer_time = '';
	 									drop_time = '';
	 									timelong = '';
	 								},
	 								failure: function(){
	 									Ext.Msg.alert('提示', response.responseText);
	 								}
	 							});
	 							Ext.Msg.alert("通话时长",hours+'时'+minutes+'分'+seconds+'秒');
	 						}
	 					}]
	 				}]
	 		}]
	 	});
	 	
/****************************************************************************************************************/
	 	
	 	var center = new Ext.Panel({
	 		region: 'center',
	 		layout: 'fit',
	 		collapsible: false,
            margins:'0 0 0 0',
            frame:true,
	 		items: [
	 			new Ext.TabPanel({
	 				id: 'main-center',
	 				region: "center",
			  		autoScroll: true,
			  		enableTabScroll: true,
			 		activeTab: 0,
			 		items: [new Ext.Panel({
				 	id: 'tab-0001',
				 	title: '首页',
				 	closable: true,
					autoScroll: true,
					layout: 'fit',
					border: false,
					iconCls: 'house',
					autoLoad: {
					url: 'jsps/main/welcome.jsp',
					scope: this,
					scripts: true,
					text: '页面加载中,请稍候....'
				  }
			   })]
	 			})
	 		]
	 	});
 	
 	new Ext.Viewport({
 		layout:'border',
 		items: [north,south,west,east,center]
 	});
 	
 });
 
 
 