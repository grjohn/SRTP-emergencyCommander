package com.ecs.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ecs.dao.RoleDao;
import com.ecs.dto.TreeNodeDTO;
import com.ecs.model.Access;
import com.ecs.model.Role;
import com.ecs.model.RoleAccess;
import com.ecs.model.RoleAccessId;
import com.ecs.service.RoleService;
import com.ecs.util.JsonBuilder;
import com.ecs.util.MenuUtil;

@Service(value="roleservice")
public class RoleSeviceImpl implements RoleService{
	
	private static JsonBuilder jb = new JsonBuilder(); 
	
	@Resource(name="roledao")
	private RoleDao roledao;
	

	@Override
	public void deleteAll(String json) {
		//将字符串转成对应的对象集合
		Role[] Roles = (Role[])jb.json2Objects(json, "Role");
		roledao.deleteAll(Roles);
	}

	@Override
	public void saveorupdate(Role role) {
		roledao.saveorupdate(role);
	}

	
	@Override
	public String findAll(String start, String limit) {
		List<Role> list = roledao.findAll(Integer.parseInt(start), Integer.parseInt(limit));
		int total = this.getTotal();
		String json = jb.list2json(list, total);
		return json;
	}
	
	
	public int getTotal(){
		return roledao.getTotal();
	}

	@Override
	public String loadtree(int roleid) {
		List<Access> list = roledao.findAllAccess();
		List roleaccess = roledao.findAccessByRoleId(roleid);
		List<TreeNodeDTO> treelist = new MenuUtil().access2Tree(list, roleaccess, 0);
		String json = jb.list2json(treelist);
//System.out.println(json);
		return json;
	}

	@Override
	public void saveRoleAccess(String roleid, String accesses) {
		List<Integer> list = roledao.findAccessByRoleId(Integer.parseInt(roleid));
		String[] accessIds = accesses.split(",");
		if(accessIds != null && accessIds.length > 0){
			for(String accessid : accessIds){
				if(!this.isContains(list, accessid)){
					RoleAccess ra = new RoleAccess();
					ra.setRoleaccessid(new RoleAccessId(roleid, accessid));
					roledao.saveorupdate(ra);
				}
			}
			
			for(int raw : list){
				if(!this.isContains(raw, accessIds)){
					RoleAccess ra = new RoleAccess();
					ra.setRoleaccessid(new RoleAccessId(roleid, String.valueOf(raw)));
					roledao.deleteRoleAccess(ra);
				}
			}
		}
		
		
	}

	/**
	 * 数据库是否已有页面的此权限记录
	 * @param list
	 * @param accessIds
	 * @return
	 */
	private boolean isContains(List<Integer> list, String accessid) {
			int accessid1 = Integer.parseInt(accessid);
			if(list.contains(accessid1)){
				return true;
		}
		return false;
	}

	private boolean isContains(int raw, String[] accessIds) {
		for(String access : accessIds){
			int access1 = Integer.parseInt(access);
			if(access1 == raw){
				return true;
			}
		}
		return false;
	}

}
