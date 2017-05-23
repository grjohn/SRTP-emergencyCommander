package com.ecs.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	private DateFormat dm;
	
	public DateFormat getDateFormat(String format){
		dm = new SimpleDateFormat(format);
		return dm;
	}
	
	public String date2String(Date date, String format){
		return this.getDateFormat(format).format(date);
	}
	
	public Date str2Date(String dateStr, String format){
		try {
			return this.getDateFormat(format).parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}
}
