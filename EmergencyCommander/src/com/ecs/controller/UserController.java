package com.ecs.controller;

import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecs.model.User;
import com.ecs.service.UserService;

@Controller
@RequestMapping(value="user")
public class UserController {
	
	@Resource(name="userservice")
	private UserService userservice;

	@ResponseBody
	@RequestMapping(value="findrole", produces="text/json;charset=UTF-8")
	public String findrole(){
		try{
			return userservice.findrole();
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	@ResponseBody
	@RequestMapping(value="findAll", produces="text/json;charset=UTF-8")
	public String findAll(HttpServletRequest request){
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
//System.out.println(limit);
		return userservice.findAll(start, limit);
	}
	
	
	
	@ResponseBody
	@RequestMapping(value="saveorupdate", produces="text/json;charset=UTF-8")
	public String saveorupdate(User user){
		try{
//System.out.println(user.getName());
			userservice.saveorupdate(user);
			return "{success:true, message:'操作成功！'}";
		}catch(Exception e){
			e.printStackTrace();
			return "{success:false, errors: '操作失败！'}";
		}
	}
	
	@ResponseBody
	@RequestMapping(value="deleteAll",produces="text/json;charset=UTF-8")
	public String deleteAll(HttpServletRequest request){
		try{
			String users = request.getParameter("data");
//System.out.println(users);
			userservice.deleteAll(users);
			return "删除成功！";
		}catch(Exception e){
			e.printStackTrace();
			return "删除失败！";
		}
	}
	
	@RequestMapping(value="login")
	public void login(HttpServletRequest request, HttpServletResponse response){
		String username = request.getParameter("username");
		String password = request.getParameter("password");
//System.out.println("密码：" + password);
		String roleid = userservice.findUser(username, password);
		if(roleid != null && roleid != ""){
			request.getSession().setAttribute("roleId", roleid);
			request.getSession().setAttribute("username", username);
			try {
				response.sendRedirect("../jsps/main/index.jsp");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}else{
			request.getSession().setAttribute("error", "当前无此用户,请联系管理员！");
					try {
						request.getRequestDispatcher("../errors.jsp").forward(request, response);
					} catch (ServletException e) {
						e.printStackTrace();
					} catch (IOException e) {
						e.printStackTrace();
					}
				//response.sendRedirect("login.jsp");
		}
	}
	

	@ResponseBody
	@RequestMapping(value="loadMainMenu",produces="text/json;charset=UTF-8")
	public String loadMainMenu(HttpServletRequest request){
		int roleid = Integer.parseInt((String)request.getSession().getAttribute("roleId"));
		return userservice.loadMainMenu(roleid);
	}
	
}
