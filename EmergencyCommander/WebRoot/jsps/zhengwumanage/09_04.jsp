<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Iterator" %>
<%@ page import="java.io.File" %>
<%@ page contentType="text/html;charset=utf-8"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setCharacterEncoding("UTF-8");

    String temp=getServletContext().getRealPath("/")+"temp";    //临时目录
    String loadpath=getServletContext().getRealPath("/")+"dir"; //上传文件存放目录
    DiskFileUpload fu = new DiskFileUpload();
    fu.setSizeMax(1*1024*1024); // 设置允许用户上传文件大小,单位:字节
    fu.setSizeThreshold(4096);  // 设置最多只允许在内存中存储的数据,单位:字节
    fu.setRepositoryPath(temp); // 设置一旦文件大小超过getSizeThreshold()的值时数据存放在硬盘的目录

    //开始读取上传信息
    List fileItems = fu.parseRequest(request);
    Iterator iter = fileItems.iterator(); // 依次处理每个上传的文件

    while (iter.hasNext()) {
        FileItem item = (FileItem) iter.next();// 忽略其他不是文件域的所有表单信息
        if (!item.isFormField()) {
            String name = item.getName();//获取上传文件名,包括路径
            name = name.substring(name.lastIndexOf("\\")+1);//从全路径中提取文件名
            // out.println(name);
            long size = item.getSize();
            if ((name == null || name.equals("")) && size == 0)
                continue;
            System.out.println(item.getName() + "    Size=" + item.getSize() + "<br>");//输出上传文件信息
            //File fNew= new File(loadpath, name);
            //item.write(fNew);
        }
    }
    response.getWriter().print("{success:true,msg:'成功'}");
%>
