package com.ecs.service;


import com.ecs.model.Role;

public interface RoleService {

	
	public void deleteAll(String role);
	
	public void saveorupdate(Role role);
	
	public String findAll(String start, String limit);
	
	public String loadtree(int roleid);
	
	public void saveRoleAccess(String roleid, String accesses);
	
}
