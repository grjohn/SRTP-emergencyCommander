<%@ page language="java" import="java.util.*,com.ecs.dto.MainMenuDTO" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String roleId = (String)session.getAttribute("roleId");
	String username = (String)session.getAttribute("username");
%>
 
<!DOCTYPE html PUBLIC 
	"-//W3C//DTD HTML 4.01 Transitional//EN" 
	"http://www.w3.org/TR/html4/loose.dtd">
	
<html>

	<head>
	
		<base href="<%=basePath%>">
		<!-- 定义两个全局变量，供index.js中使用 -->
		<script type="text/javascript">
	     window.log_id="<%=roleId%>";
	     window.log_name="<%=username%>";
		</script>
		
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>消防应急值守系统</title>
		<link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css">
		<link id="theme" rel="stylesheet" type="text/css" href="">
		<link rel="stylesheet" type="text/css" href="jsps/main/icon.css">
		<script type="text/javascript" src="ext/ext-all-dev.js"></script>
		<script type="text/javascript" src="ext/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="jsps/main/index.js"></script>
		<script type="text/javascript" src="jsps/main/App.js"></script>
		<script type="text/javascript">
	     window.systemtheme = App.getCookie("system-theme");
	     document.getElementById("theme").href = systemtheme;
		</script>
		<style type="text/css">
    	#logoname{
    		margin-top:-15px;
    		margin-left:70px;
    	}
    	#logo{
    		margin-top: 3px;
    		margin-left:5px;
    		background-image:url(images/logo.png);
    		background-repeat:no-repeat;
    	}
    	</style>
    	
		
	</head>
	
	<body>
	 
	</body>
	
</html>