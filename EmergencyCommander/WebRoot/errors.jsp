<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
 String path = request.getContextPath();
 String basePath = request.getScheme() + "://"
   + request.getServerName() + ":" + request.getServerPort()
   + path + "/";
 String error = (String)request.getSession().getAttribute("error");
 System.out.println(error);
%>
<html>
 <head>
  <script type="text/javascript">
  var time = 5;
  function tologin(){
	  window.setTimeout("tologin()", 1000);
	  if(time > 0){
		  document.getElementById("show").innerHTML="<font color=red>"+time+"</font>秒后跳转到登录页面";
		  time--;
	  }else{
		  window.top.location.href="<%=basePath%>login.jsp";
	  }
  }
   
  </script>
 </head>
 
 <body onload="tologin();">
    <font color="red" size=10><%= error%></font>
 	<div id="show">5秒后跳转到登录页面</div>
 </body>
 
</html>