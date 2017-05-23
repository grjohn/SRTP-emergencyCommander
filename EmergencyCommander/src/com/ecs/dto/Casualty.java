package com.ecs.dto;

/**
 * 伤亡情况数据传输模型
 * @author Administrator
 *
 */
public class Casualty {
	
	private String name;
	private int count;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
}
