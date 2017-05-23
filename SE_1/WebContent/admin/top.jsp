<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="s" uri="/struts-tags" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/top.css">


  </head>
  
  <body>
   
<table width="100%" border="0" bordercolor="#ff0000" cellspacing="0" cellpadding="0">


			<tr>
				<td height="57" background="images/main_03.gif">
					<table width="100%" border="0" bordercolor="#00ff00" cellpadding="0" cellspacing="0">
						<tr>
						
							<td width="378" height="57" background="images/top_fuben.jpg">
								&nbsp;
							</td>
							
							<td>
								&nbsp;
							</td>
							<td width="281" valign="bottom">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td width="33" height="27">
											<img src="images/main_05.gif" width="33" height="27" />
										</td>
										<td width="248" background="images/main_06.gif">
											<table width="225" border="0" align="center" cellpadding="0"
												cellspacing="0">
												<tr>
												
												
													<td>
														<div align="right">
														<!-- 退出 -->
															<s:a action="admin" method="exit" target="_parent">
															<font color="#0">退出</font>
															</s:a>
														</div>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>

				</td>
			</tr>
<!-- 下一行 -->
			<tr>
				<td height="40" background="images/main_10.gif">
			 
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
						
							<td width="150" height="40" background="images/main_07.gif">
								&nbsp;
							</td>
							
							
							
							<td>
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
									<!-- 首页 -->
										
										
										<!--  后退-->
										<td width="21" class="STYLE7">
											<img src="images/main_15.gif" width="19" height="14" />
										</td>
										<td width="35" class="STYLE7">
											<div align="center">
												<a href="javascript:history.go(-1);">后退</a>
											</div>
										</td>
										<!-- 前进 -->
										<td width="21" class="STYLE7">
											<img src="images/main_17.gif" width="19" height="14" />
										</td>
										<td width="35" class="STYLE7">
											<div align="center">
												<a href="javascript:history.go(1);">前进</a>
											</div>
										</td>
										<!-- 刷新 -->
										<td width="21" class="STYLE7">
											<img src="images/main_19.gif" width="19" height="14" />
										</td>
										<td width="35" class="STYLE7">
											<div align="center">
												<a href="javascript:window.parent.location.reload();">刷新</a>
											</div>
										</td>
										
										
										<td>
											&nbsp;
										</td>
									</tr>
								</table>
							</td>
							
							<td  width="248px"><table  width="100%" border="0" cellspacing="0" cellpadding="0" align="right"> 
							         <tr>
							               <td>
							               <div align="right">
							               		<font color="white">当前登录用户： <s:property value="#session.name"/></font></div></td>
							              
							               <td width="10px"></td>
							                
							         </tr>
							         
							    </table>
							</td>
							
						</tr>
					</table>
				</td>
			</tr>





		</table>
   
   
   
  </body>
</html>
