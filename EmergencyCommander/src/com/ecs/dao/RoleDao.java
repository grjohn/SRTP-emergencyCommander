package com.ecs.dao;

import java.util.List;

import com.ecs.model.Access;
import com.ecs.model.Role;
import com.ecs.model.RoleAccess;


public interface RoleDao {
	
	
	public void deleteAll(Role[] roles);
	
	public void saveorupdate(Role role);
	
	
	public List<Role> findAll(int start, int limit);
	
	
	public List<Access> findAllAccess();
	
	public List<Integer> findAccessByRoleId(int roleid);
	
	public void saveorupdate(RoleAccess ra);
	
	public void deleteRoleAccess(RoleAccess ra);
	
	
	public int getTotal();
	
}
