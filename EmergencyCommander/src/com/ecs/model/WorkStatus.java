package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 组织工作动态表实体
 * @author Administrator
 *
 */
public class WorkStatus implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int id;
	private String title;//标题
	
	//@DateTimeFormat(pattern = "yyyy/MM/dd")
	//@Temporal(TemporalType.TIMESTAMP)
	private Date etime;//上次编辑时间
	
	private Date rtime;//发布时间
	private String editor;//编辑人
	private String confirmer;//签发人
	private String comment;//备注
	private String location;//文件存储位置
	
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
	//@DateTimeFormat(pattern = "yyyy/MM/dd")
	//@Temporal(TemporalType.TIMESTAMP)
	public Date getEtime() {
		return etime;
	}
	//@DateTimeFormat(pattern = "yyyy/MM/dd")
	//@Temporal(TemporalType.TIMESTAMP)
	public void setEtime(Date etime) {
		this.etime = etime;
	}
	public Date getRtime() {
		return rtime;
	}
	public void setRtime(Date rtime) {
		this.rtime = rtime;
	}
	public String getEditor() {
		return editor;
	}
	public void setEditor(String editor) {
		this.editor = editor;
	}
	public String getConfirmer() {
		return confirmer;
	}
	public void setConfirmer(String confirmer) {
		this.confirmer = confirmer;
	}
	
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	
	
}
