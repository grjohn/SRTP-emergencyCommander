package com.ecs.model;

import java.io.Serializable;

/**
 * 权限模块权限表实体
 * @author Administrator
 *
 */
public class Access implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int accessid;//权限id
	private String aname;//权限名
	private String icon;//对应图标
	private int pid;//父节点（用于树状展示）
	private String accessurl;//对应地址
	private boolean leaf;//是否叶子节点
	
	public String getAccessurl() {
		return accessurl;
	}
	public void setAccessurl(String accessurl) {
		this.accessurl = accessurl;
	}
	public boolean getLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	
	
	public int getAccessid() {
		return accessid;
	}
	public void setAccessid(int accessid) {
		this.accessid = accessid;
	}
	public String getAname() {
		return aname;
	}
	public void setAname(String aname) {
		this.aname = aname;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	
}
