package com.ecs.dto;

/**
 * 等级统计数据传输模型
 * @author Administrator
 *
 */
public class LevelPieDTO {
	
	private String level;
	private int count;
	
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
}
