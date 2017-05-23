package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 事件信息表实体
 * @author Administrator
 *
 */
public class EventInformation implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int id;
	private String ename;//事件名称
	private String location;//事件发生地点
	private String type;//事件类型
	private String level;//事件等级
	private String detail;//事件详情
	private Date htime;//事件发生时间
	private Date rtime;//接报时间
	private String cman;//来电人
	private String rman;//接报人
	private String ctel;//来电人电话
	private String unittel;//上报单位电话
	private String rtel;//接报人电话
	private String cunit;//来电单位
	private String status;//事件处理状态
	private int casualty;//伤亡总数
	private int death;//死亡人数
	private int hurt;//受伤人数
	private int miss;//失踪人数
	
	public int getCasualty() {
		return casualty;
	}
	public void setCasualty(int casualty) {
		this.casualty = casualty;
	}
	public int getDeath() {
		return death;
	}
	public void setDeath(int death) {
		this.death = death;
	}
	public int getHurt() {
		return hurt;
	}
	public void setHurt(int hurt) {
		this.hurt = hurt;
	}
	public int getMiss() {
		return miss;
	}
	public void setMiss(int miss) {
		this.miss = miss;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEname() {
		return ename;
	}
	public void setEname(String ename) {
		this.ename = ename;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public Date getHtime() {
		return htime;
	}
	public void setHtime(Date htime) {
		this.htime = htime;
	}
	public Date getRtime() {
		return rtime;
	}
	public void setRtime(Date rtime) {
		this.rtime = rtime;
	}
	public String getCman() {
		return cman;
	}
	public void setCman(String cman) {
		this.cman = cman;
	}
	public String getRman() {
		return rman;
	}
	public void setRman(String rman) {
		this.rman = rman;
	}
	public String getCtel() {
		return ctel;
	}
	public void setCtel(String ctel) {
		this.ctel = ctel;
	}
	public String getRtel() {
		return rtel;
	}
	public void setRtel(String rtel) {
		this.rtel = rtel;
	}
	public String getCunit() {
		return cunit;
	}
	public void setCunit(String cunit) {
		this.cunit = cunit;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getUnittel() {
		return unittel;
	}
	public void setUnittel(String unittel) {
		this.unittel = unittel;
	}
	
	
	
	
}
