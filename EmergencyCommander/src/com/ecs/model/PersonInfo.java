package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 本单位人员信息表
 * @author Administrator
 *
 */
public class PersonInfo implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String id;//职工编号
	private String name;//姓名
	private String position;//职位
	private String tel;//电话
	private String did;//部门编号
	private String department;//所在部门名称
	private Date time;//入职时间
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getDid() {
		return did;
	}
	public void setDid(String did) {
		this.did = did;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	
	
}
