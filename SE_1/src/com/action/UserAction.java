package com.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;

import com.dao.UserDao;
import com.model.User;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class UserAction extends ActionSupport{
	private static final long serialVersionUID = 1L;
	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		return SUCCESS;
	}
	public String login()throws Exception{
		//得到context
		ActionContext context=ActionContext.getContext();
		HttpServletRequest request=ServletActionContext.getRequest();
		//取得登录学号
		String no=request.getParameter("no");
		//登录密码
		String pwd=request.getParameter("pwd");
		//是否为空
		if(no.isEmpty()||pwd.isEmpty())
		{
			return ERROR;
		}else {
			//搜索数据库
			User  user=UserDao.isLogin(no, pwd);
			if(user==null)
			{
				return ERROR;
			}else {
				
				return SUCCESS;
			}			
		}		
	}
	public String delUser()throws Exception{
		ActionContext context=ActionContext.getContext();
		HttpServletRequest request=ServletActionContext.getRequest();
		String id=request.getParameter("id");
		UserDao.deleteUser(Integer.parseInt(id));
		List<User> userList=UserDao.getUserList();
		context.put("userlist", userList);
		
		return "user";
		
	}
	public String toAddUser()throws Exception{
		return "toAddUser";
	}
	public String addUser()throws Exception{
		ActionContext context=ActionContext.getContext();
		HttpServletRequest request=ServletActionContext.getRequest();
		String num=request.getParameter("num");
		String name=request.getParameter("name");
		String pwd=request.getParameter("pwd");
		System.out.println(num);
		System.out.println(name);
		System.out.println(pwd);
		UserDao.addUser(num, name, pwd);
		List<User> userList=UserDao.getUserList();
		context.put("userlist", userList);
		
		
		return "user";
	}
	public String showUserList()throws Exception{
		ActionContext context=ActionContext.getContext();
	
		List<User> userList=UserDao.getUserList();
		context.put("userlist", userList);
		
		
		return "user";
	}

}
