package com.ecs.model;

import java.io.Serializable;

/**
 * 单位通讯信息表
 * @author Administrator
 *
 */
public class Contact implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String id;//单位编号
	private String name;//单位名
	private String contact;//联系人
	private String ctel;//联系人电话
	private String dtel;//值班电话
	private String email;//单位邮箱
	private String address;//单位地址
	private String postalcode;//邮政编码
	private String intro;//单位简介
	private String comment;//备注
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getCtel() {
		return ctel;
	}
	public void setCtel(String ctel) {
		this.ctel = ctel;
	}
	public String getDtel() {
		return dtel;
	}
	public void setDtel(String dtel) {
		this.dtel = dtel;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPostalcode() {
		return postalcode;
	}
	public void setPostalcode(String postalcode) {
		this.postalcode = postalcode;
	}
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
}
