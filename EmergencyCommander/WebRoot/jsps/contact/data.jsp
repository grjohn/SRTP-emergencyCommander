<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%
String start = request.getParameter("start");
String limit = request.getParameter("limit");
try {
    int index = Integer.parseInt(start);
    int pageSize = Integer.parseInt(limit);

    String json = "{total:100,root:[";
    for (int i = index; i < pageSize + index; i++) {
        json += "{id:" + i + ",caller:'张" + i + "',called:'李" + i + "',long:'" + i + "',time:'2016-08-08,15时13分04秒" +"'}";
        if (i != pageSize + index - 1) {
            json += ",";
        }
    }
    json += "]}";
    response.getWriter().write(json);
    System.out.println(json);
} catch(Exception e) {
	System.out.println("读取数据出错");
}
%>