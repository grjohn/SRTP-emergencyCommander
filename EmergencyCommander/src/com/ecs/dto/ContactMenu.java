package com.ecs.dto;

import java.util.List;

public class ContactMenu {
	private String id;
	private String text;
	private String iconCls;
	private boolean leaf;
	private List<ContactMenu> children;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public List<ContactMenu> getChildren() {
		return children;
	}
	public void setChildren(List<ContactMenu> children) {
		this.children = children;
	}
	
}
