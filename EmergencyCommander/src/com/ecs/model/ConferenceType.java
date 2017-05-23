package com.ecs.model;

import java.io.Serializable;

/**
 * 会议类型表实体
 * @author Administrator
 *
 */
public class ConferenceType implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int id;//会议类型标识，主键
	private String name;//会议类型名称
	
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
}
