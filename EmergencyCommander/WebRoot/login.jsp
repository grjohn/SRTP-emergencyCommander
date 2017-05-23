<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>应急值守系统登录</title>
<link rel="stylesheet" type="text/css" href="css/login.css"/>
<link rel="stylesheet" type="text/css" href="ext/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="jsps/main/icon.css">
<script type="text/javascript" src="ext/ext-all-dev.js"></script>
<script type="text/javascript" src="ext/ext-lang-zh_CN.js"></script>

<script type="text/javascript">
	function check(){
		var logincode = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var error = document.getElementById("error");
		error.innerHTML="";
		if(logincode==""){
			error.innerHTML="用户名不能为空！";
			return false;
		}
		if(password==""){
			error.innerHTML="密码不能为空！";
			return false;
		}
		return true;
	}
</script>

</head>
<body>
		<div id="login">
			<form action="user/login.do" method="post" onSubmit="return check()">
			<ul id="login_top">
				<li>用户登录</li>
			</ul>
			<ul id="login_form">
				<li class="login_input login_i1"><label class="usernmae_label" for="username"></label><input autocomplete ="off" id="username" class="username" name="username" type="text" value="${user.username}" placeholder="用户名"/></li>
				<li class="login_input login_i2"><label class="password_label" for="password"></label><input autocomplete ="off" id="password" class="password" name="password" type="password" placeholder="密码"/></li>
			</ul>
			<ul id="login_captcha">
				<li class="captcha_input captcha_i1"><input id="captcha" class="captcha" type="text" name="captcha" maxlength="6" placeholder="用户名"/></li>
				<li class="captcha_i3"><a href="javascript:changeImg();">换一张</a></li>
			</ul>
			<ul id="login_remem">
				<li style="float: left;"><input autocomplete ="off" id="remember" type="checkbox" /> <label for="remember">下次自动登录</label></li>
				<li style="float: right;"><a href="login.jsp">忘记密码？</a></li>
			</ul>
			<ul id="login_submit">
				<li><input type="submit" value="登录"/></li>
				<li><p id="error">${authenticationErrorMessage}</p><a href="user/register.html">立即注册</a></li>
			</ul>
			</form>
		</div>
</body>
</html>