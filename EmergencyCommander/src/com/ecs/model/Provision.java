package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 相关办事规定表实体
 * @author Administrator
 *
 */
public class Provision implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int id;
	private String title;//文件名
	private String confirmer;//审核人
	private Date time;//文件发布时间
	private String comment;//文件概要描述
	private Date etime;
	private String filelocation;//文件存储位置
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getConfirmer() {
		return confirmer;
	}
	public void setConfirmer(String confirmer) {
		this.confirmer = confirmer;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public Date getEtime() {
		return etime;
	}
	public void setEtime(Date etime) {
		this.etime = etime;
	}
	public String getFilelocation() {
		return filelocation;
	}
	public void setFilelocation(String filelocation) {
		this.filelocation = filelocation;
	}
	
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	
}
