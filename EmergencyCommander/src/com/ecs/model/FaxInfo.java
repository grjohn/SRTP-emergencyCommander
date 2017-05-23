package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 传真文件你管理表
 * @author Administrator
 *
 */
public class FaxInfo implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int id;
	private Date time;//时间
	private String name;//文件名
	private String topic;//主题
	private String snumber;//发送方电话
	private String rnumber;//接收方电话
	
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
	public String getTopic() {
		return topic;
	}
	public void setTopic(String topic) {
		this.topic = topic;
	}
	public String getSnumber() {
		return snumber;
	}
	public void setSnumber(String snumber) {
		this.snumber = snumber;
	}
	public String getRnumber() {
		return rnumber;
	}
	public void setRnumber(String rnumber) {
		this.rnumber = rnumber;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
}
