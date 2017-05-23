package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 录音文件信息表
 * @author Administrator
 *
 */
public class Audio implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int id;
	
	private Date time;//时间
	private String name;//文件名
	private int timelong;//录音时长
	
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTimelong() {
		return timelong;
	}
	public void setTimelong(int timelong) {
		this.timelong = timelong;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

}
