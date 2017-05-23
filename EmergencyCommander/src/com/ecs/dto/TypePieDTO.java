package com.ecs.dto;

/**
 * 类型统计数据传输模型
 * @author Administrator
 *
 */
public class TypePieDTO {
	
	private String type;//类型
	private int count;//发生次数
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
}
