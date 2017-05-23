package com.ecs.model;

import java.io.Serializable;

/**
 * 权限模块角色表
 * @author Administrator
 *
 */
public class Role implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int id;//角色id
	private String rolename;//角色名
	private String accessdesc;//角色权限描述
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getRolename() {
		return rolename;
	}
	public void setRolename(String rolename) {
		this.rolename = rolename;
	}
	public String getAccessdesc() {
		return accessdesc;
	}
	public void setAccessdesc(String accessdesc) {
		this.accessdesc = accessdesc;
	}
	
	
}
