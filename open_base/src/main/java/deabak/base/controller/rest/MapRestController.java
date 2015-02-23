package deabak.base.controller.rest;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import deabak.base.domain.Map;
import deabak.base.domain.ResponseWrapper;
import deabak.base.service.MapService;

@RestController
@RequestMapping(value="/maps")
public class MapRestController {

	@Resource(name="mapService")
	MapService mapService;
	
	/** 목록 */
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<ResponseWrapper> getmaps(Map map) throws Exception{
		List mapList = mapService.getMapList(map); 
		ResponseWrapper wrapper = new ResponseWrapper();
		
		//실제 데이터
		wrapper.setList(mapList);
		
		//검색어와 페이징관련 데이터
		if(mapList.size()>0){
			Map mapParam = (Map)mapList.get(0);
			//데이터 총 row 수
			map.setTotalCount(mapParam.getTotalCount());
		}
		wrapper.setDefaultObj(map);
		
		return new ResponseEntity<ResponseWrapper>(wrapper, HttpStatus.OK);
	}
	
	/** 상세 */
	@RequestMapping(value="/{id}", method = RequestMethod.GET)
	public ResponseEntity<Map> getMap(@PathVariable("id") String id) throws Exception{
		Map selectedMap = mapService.getMap(id); 
		return new ResponseEntity<Map>(selectedMap,HttpStatus.OK);
	}
	
	/** 등록 */
	@RequestMapping(method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map> createMapByJson(@RequestBody Map map) throws Exception{
		Map createdMap = mapService.createMap(map); 
		return new ResponseEntity<Map>(createdMap,HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes=MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity<Map> createMap(Map map) throws Exception{
		Map createdMap = mapService.createMap(map); 
		return new ResponseEntity<Map>(createdMap,HttpStatus.CREATED);
	}
	
	/** 수정 */
	@RequestMapping(value="/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map> updateMapByJson(@PathVariable("id") String id, @RequestBody Map map) throws Exception{
		map.setId(id);
		Map updatedMap = mapService.updateMap(map); 
		return new ResponseEntity<Map>(updatedMap,HttpStatus.OK);
	}
	
	@RequestMapping(value="/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity<Map> updateMap(Map map) throws Exception{
		Map updatedMap = mapService.updateMap(map); 
		return new ResponseEntity<Map>(updatedMap,HttpStatus.OK);
	}
	
	/** markAndUnmark */
	@RequestMapping(value="/mark/{id}", method = RequestMethod.PUT, consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map> markAndUnmarkByJson(@PathVariable("id") String id, @RequestBody Map map) throws Exception{
		map.setId(id);
		Map updatedMap = mapService.markAndUnmark(map); 
		return new ResponseEntity<Map>(updatedMap,HttpStatus.OK);
	}
	
	/** 삭제 */
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Map> deleteMap(@PathVariable("id") String id) throws Exception{
		Map deletedMap = mapService.deleteMap(id); 
		return new ResponseEntity<Map>(deletedMap,HttpStatus.OK);
	}
}
