Ext.ns("App");
App.init = function () {
	Ext.QuickTips.init();
};

App.setCookie = function(name, value, day){
	var Days = day; 
	var exp = new Date(); 
	exp.setTime(exp.getTime() + Days * 1 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
App.getCookie = function(name){
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);
	return null;
};
App.Logout = function() {
	window.location.href = "/EmergencyCommander/login.jsp";
};
Ext.onReady(App.init);

