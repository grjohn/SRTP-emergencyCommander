package com.ecs.dto;

import java.util.List;
/**
 * 树节点数据传输模型
 * @author Administrator
 *
 */
public class TreeNodeDTO {

	private int id;
	private String text;
	private boolean leaf;
	private String iconCls;
	private boolean expanded = false;
	private boolean checked;
	private List<TreeNodeDTO> children;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public boolean isLeaf() {
		return leaf;
	}
	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public boolean isExpanded() {
		return expanded;
	}
	public void setExpanded(boolean expanded) {
		this.expanded = expanded;
	}
	public boolean isChecked() {
		return checked;
	}
	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	public List<TreeNodeDTO> getChildren() {
		return children;
	}
	public void setChildren(List<TreeNodeDTO> children) {
		this.children = children;
	}
	
}
