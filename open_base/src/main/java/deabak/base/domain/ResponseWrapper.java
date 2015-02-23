package deabak.base.domain;

import java.util.List;

public class ResponseWrapper {
	Default defaultObj;
	List<Object> list;
	
	public Default getDefaultObj() {
		return defaultObj;
	}
	public void setDefaultObj(Default defaultObj) {
		this.defaultObj = defaultObj;
	}
	public List<Object> getList() {
		return list;
	}
	public void setList(List<Object> list) {
		this.list = list;
	}
}
