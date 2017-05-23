package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 通话记录表
 * @author Administrator
 *
 */
public class CallRecord implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String id;
	private Date time;//时间
	private String caller;//主叫电话
	private String called;//被叫电话
	private String timelong;//通话时长
	
	public CallRecord(String id, Date time, String caller, String called,String timelong) {
		this.id = id;
		this.time = time;
		this.caller = caller;
		this.called = called;
		this.timelong = timelong;
	}
	
	public CallRecord(){}
	
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getCaller() {
		return caller;
	}
	public void setCaller(String caller) {
		this.caller = caller;
	}
	public String getCalled() {
		return called;
	}
	public void setCalled(String called) {
		this.called = called;
	}
	public String getTimelong() {
		return timelong;
	}
	public void setTimelong(String timelong) {
		this.timelong = timelong;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
}
