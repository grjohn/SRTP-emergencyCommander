package com.ecs.dto;

import java.util.List;

/**
 * 主菜单加载所需的数据传输模型
 * @author Administrator
 *
 */
public class MainMenuDTO {
	private int id; //节点id
	private String text; //节点名称
	private String url; //连接地址
	private Boolean leaf; //是否子节点
	private String iconCls; //图标
	private List<MainMenuDTO> children; //所拥有子节点集合
	
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Boolean getLeaf() {
		return leaf;
	}
	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public List<MainMenuDTO> getChildren() {
		return children;
	}
	public void setChildren(List<MainMenuDTO> children) {
		this.children = children;
	}
	
}
