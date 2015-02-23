package deabak.base.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import deabak.base.domain.Map;
import deabak.base.mapper.MapMapper;
import deabak.base.service.MapService;

@Service("mapService")
public class MapServiceImpl implements MapService {

	@Resource(name="mapMapper")
	MapMapper mapMapper;
	
	@Override
	public Map createMap(Map map) throws Exception {
		mapMapper.createMap(map);
		return getMap(map.getId());
	}

	@Override
	public List<Map> getMapList(Map map) throws Exception {
		return mapMapper.getMapList(map);
	}
	
	@Override
	public Map getMap(String id) throws Exception {
		return mapMapper.getMap(id);
	}
	
	@Override
	public Map updateMap(Map map) throws Exception {
		mapMapper.updateMap(map);
		return getMap(map.getId());
	}

	@Override
	public Map markAndUnmark(Map map) throws Exception {
		mapMapper.markAndUnmark(map);
		return getMap(map.getId());
	}
	
	@Override
	public Map deleteMap(String id) throws Exception {
		mapMapper.deleteMap(id);
		return new Map();
	}

}
