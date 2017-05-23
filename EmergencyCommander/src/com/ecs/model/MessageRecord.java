package com.ecs.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 短信记录表
 * @author Administrator
 *
 */
public class MessageRecord implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private int id;
	private Date time;//时间
	private String topic;//主题
	private String content;//内容
	private String sender;//发送方
	private String receiver;//接收方
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public String getTopic() {
		return topic;
	}
	public void setTopic(String topic) {
		this.topic = topic;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getReceiver() {
		return receiver;
	}
	public void setReceiver(String receiver) {
		this.receiver = receiver;
	}
}
