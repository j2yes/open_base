package deabak.base.service;

import java.util.List;

import deabak.base.domain.Map;

public interface MapService {

	public Map createMap(Map map) throws Exception;
	public List<Map> getMapList(Map map) throws Exception;
	public Map getMap(String id) throws Exception;
	public Map markAndUnmark(Map map) throws Exception;
	public Map updateMap(Map map) throws Exception;
	public Map deleteMap(String id) throws Exception;
}
