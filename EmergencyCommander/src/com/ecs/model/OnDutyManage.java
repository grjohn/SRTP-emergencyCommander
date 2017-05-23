package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 值班管理表实体
 * @author Administrator
 *
 */

public class OnDutyManage implements Serializable{
	
	//序列化，版本兼容
	public static final long serialVersionUID  = 1L;
	
	private int id;
	private Date date;//值班日期
	private Date weekday;//周几
	private String leader;//领导姓名
	private String lposition;//领导职务
	private String ltel;//领导电话
	private String name;//值班员
	private String shift;//班次
	private String dtel;//值班人员电话
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getLeader() {
		return leader;
	}
	public void setLeader(String leader) {
		this.leader = leader;
	}
	public String getLposition() {
		return lposition;
	}
	public void setLposition(String lposition) {
		this.lposition = lposition;
	}
	public String getLtel() {
		return ltel;
	}
	public void setLtel(String ltel) {
		this.ltel = ltel;
	}
	
	public String getDtel() {
		return dtel;
	}
	public void setDtel(String dtel) {
		this.dtel = dtel;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getShift() {
		return shift;
	}
	public void setShift(String shift) {
		this.shift = shift;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Date getWeekday() {
		return weekday;
	}
	public void setWeekday(Date weekday) {
		this.weekday = weekday;
	}
	
}
