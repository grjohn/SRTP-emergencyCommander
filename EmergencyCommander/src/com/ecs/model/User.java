package com.ecs.model;

import java.io.Serializable;

/**
 * 权限模块用户表实体
 * @author Administrator
 *
 */
public class User implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int id;//用户id
	private String name;//用户名
	private String password;//密码
	private int roleid;//所处角色id
	private String email;
	private String contact;
	private String comment;//用户说明 
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getRoleid() {
		return roleid;
	}
	public void setRoleid(int roleid) {
		this.roleid = roleid;
	}
}
