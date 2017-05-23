package com.ecs.util.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class SecurityInterceptor implements HandlerInterceptor{

	@Override
	public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception e)
			throws Exception {
		//System.out.println("22");
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler, ModelAndView ma) throws Exception {
		request.getRequestDispatcher("../login.jsp").forward(request, response);
		//System.out.print("33");
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
			Object handler) throws Exception {
		String requestUrl = request.getRequestURL().toString();
		String contextpath = request.getContextPath();
		String uri = request.getRequestURI();
System.out.println("contextpath: " + contextpath);		
System.out.println("requestUrl: " + requestUrl);
System.out.println("requestUri: " + uri);
		if(requestUrl.indexOf("login.do") != -1){
			return true;
		}else{
				String roleId = (String)request.getSession().getAttribute("roleId");
				if(roleId != null && roleId != ""){
					return true;
				}else{
					if(request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){
						System.out.println("异步请求");
						//response.sendRedirect(request.getContextPath()+"/login.jsp");
						
					}
					System.out.println("=================当前角色为:" + roleId + "还未登录,请先登录！===============");
					//request.getRequestDispatcher("../login.jsp").forward(request, response);
					System.out.println("执行了");
					return false;
				}
		}
	}
	
	

}
