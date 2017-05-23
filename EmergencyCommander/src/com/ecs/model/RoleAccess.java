package com.ecs.model;

import java.io.Serializable;

/**
 * 权限模块角色权限关联表
 * @author Administrator
 */
public class RoleAccess implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private RoleAccessId roleaccessid;
	private Role role;
	private Access access;
	
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
	public Access getAccess() {
		return access;
	}
	public void setAccess(Access access) {
		this.access = access;
	}
	public RoleAccessId getRoleaccessid() {
		return roleaccessid;
	}
	public void setRoleaccessid(RoleAccessId roleaccessid) {
		this.roleaccessid = roleaccessid;
	}

}
