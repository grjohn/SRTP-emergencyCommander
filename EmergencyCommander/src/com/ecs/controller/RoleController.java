package com.ecs.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ecs.model.Role;
import com.ecs.service.RoleService;

@Controller
@RequestMapping(value="role")
public class RoleController {
	
	@Resource(name="roleservice")
	private RoleService roleservice;

	
	@ResponseBody
	@RequestMapping(value="findAll", produces="text/json;charset=UTF-8")
	public String findAll(HttpServletRequest request){
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
//System.out.println(limit);
		return roleservice.findAll(start, limit);
	}
	
	@ResponseBody
	@RequestMapping(value="saveorupdate", produces="text/json;charset=UTF-8")
	public String saveorupdate(Role role){
		try{
//System.out.println(Role.getName());
			roleservice.saveorupdate(role);
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
			String roles = request.getParameter("data");
//System.out.println(Roles);
			roleservice.deleteAll(roles);
			return "删除成功！";
		}catch(Exception e){
			e.printStackTrace();
			return "删除失败！";
		}
	}
	/**
	 * 加载权限树
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="loadtree",produces="text/json;charset=UTF-8")
	public String loadtree(HttpServletRequest request){
		//String roleid = request.getParameter("roleid");
		return roleservice.loadtree(Integer.parseInt(request.getParameter("roleid")));
	}
	
	@ResponseBody
	@RequestMapping(value="saveRoleAccess",produces="text/json;charset=UTF-8")
	public String saveRoleAccess(HttpServletRequest request){
		String accessIds = request.getParameter("accessIds");
		String roleid = request.getParameter("roleid");
		roleservice.saveRoleAccess(roleid, accessIds);
//System.out.println(roleid);
		return "操作成功！";
	}
	
}
