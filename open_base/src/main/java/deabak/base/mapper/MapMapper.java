package deabak.base.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import deabak.base.domain.Map;

@Repository("mapMapper")
public interface MapMapper {

	public void createMap(Map map) throws Exception;
	public List<Map> getMapList(Map map) throws Exception;
	public Map getMap(String id) throws Exception;
	public void updateMap(Map map) throws Exception;
	public void markAndUnmark(Map map) throws Exception;
	public void deleteMap(String id) throws Exception;
}
