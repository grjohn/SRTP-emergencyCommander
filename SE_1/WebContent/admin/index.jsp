<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
	<head>
		<base href="<%=basePath%>">

		<title>后台管理系统</title>

		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">

		
		
	<script type="text/javascript">
	function form_submit(){
		
		document.getElementById("login").submit();
	}
	function form_reset(){
		document.getElementById("login").reset();
	}
	</script>
	<style type="text/css">
	body{
	background-color: #FFFFFF;
	background-image: url(images/admin/background1.jpg);
	background-repeat: no-repeat;
	}

	</style>
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
<body>


		



          <div>
       
             <s:form action="admin" theme="simple">
             <table >
           
              <tr>
					<td width="248"></td>	
						<td width="248" height="582" background="images/login_07.gif">

							<table>
								<tr height="30px">
									<td height="45">
										用户名：									</td>
									<td>
										<input type="text" name="name" />
									</td>

								</tr>
								<tr height="30px">
									<td height="42">
										密&nbsp; &nbsp;码：									</td>
									<td>
										<input type="password" name="pwd" />
									</td>
								</tr>

							</table>
				</td>


						<td width="75" height="582">
							<div id="center_middle_right"></div>
				</td>

					
						<td width="447" height="582" background="images/login_09.gif">
							<table style="margin-top: 0px;">
								<s:submit type="image" src="images/dl.gif" id="id_log"
									method="adminLogin">

								</s:submit>
							</table><img src="images/cz.gif" width="57" height="20"
								onclick="form_reset()"
								style="margin-left: 3px; margin-top: 6px;">				</td>


			   </tr>
             </table>
                  
                  </s:form>
        
         </div>
 

	</body>
</html>