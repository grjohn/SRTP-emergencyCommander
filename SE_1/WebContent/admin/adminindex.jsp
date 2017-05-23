<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>消防应急后台管理系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
   
  <frameset rows="95,*"  frameborder="no">
			<frame src="admin/top.jsp" name="usertopFrame"  frameborder="0" scrolling="no"/>
       <s:property value="name"/>
		    <frame src="admin/center.jsp" name="usercenterFrame"  frameborder="0"/>
		  
  </frameset>
<noframes>
  <body>
   <% String a=request.getParameter("name"); %>
   <% session.setAttribute("name", a); %>
  </body>
    </noframes>

</html>
