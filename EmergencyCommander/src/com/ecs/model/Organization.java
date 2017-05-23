package com.ecs.model;

import java.io.Serializable;

public class Organization implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String id;//组织机构编号
	private String name;//单位名
	private boolean isleaf;//是否叶子节点
	private String iconCls;//父节点
	private String pid;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public boolean isIsleaf() {
		return isleaf;
	}
	public void setIsleaf(boolean isleaf) {
		this.isleaf = isleaf;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
}
