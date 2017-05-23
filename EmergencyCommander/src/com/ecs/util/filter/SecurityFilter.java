package com.ecs.util.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ecs.dto.UserDTO;

public class SecurityFilter implements Filter {
	@SuppressWarnings("unused")
	private FilterConfig filterCon = null;
	
	public void init(FilterConfig config) throws ServletException {
		filterCon = config;
	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		String roleId = (String)httpRequest.getSession().getAttribute("roleId");
		String requestUrl = httpRequest.getRequestURL().toString();
		String contextpath = httpRequest.getContextPath();
		String uri = httpRequest.getRequestURI();
System.out.println("requestUrl: " + requestUrl);
System.out.println("contextpath: " + contextpath);
System.out.println("uri: " + uri);
		if(roleId == null || roleId == ""){
			
			if(requestUrl.indexOf("login.jsp")==-1 && requestUrl.indexOf("error.jsp") == -1){
				httpRequest.getSession().setAttribute("error", "登录超时或尚未登录,请登录！");
				System.out.println("====================登录超时或为登录！请登录！=======================");
				httpRequest.getRequestDispatcher("/errors.jsp").forward(httpRequest, httpResponse);
			}else{
				filterChain .doFilter(request, response);
			}
		}else{
			System.out.println("==========当前roleId为：" + roleId + "==============================");
			filterChain .doFilter(request, response);		
		}
	}

	public void destroy() {
		filterCon = null;
	}
}
