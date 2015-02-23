/**
 * service module 구현 
 * ngResource 모듈을 참조하여 RESTful 서비스 구현
 * ngResource모듈은 ../map.js에서 참조하였음
 */

angular.module('ngMap.map.service')
	.factory('mapService',['$resource',function($resource){
		var URL = 'maps/:id'
		var mapResource = $resource(URL,
				{id:'@id'},
				{'update':{
					method: 'PUT'
					}
				});
		
		return {
			selectList : function(map){
				//목록 데이터 호출할 경우 query method 실행
				//return memberResource.query(member);
				// 목록정보와 검색어정보를 포함한 하나의 object만 반환하므로 get method 사용
				return mapResource.get(map);
			},
			selectDetail : function(id){
				return mapResource.get({id:id});
			},
			insertData : function(map){
				return mapResource.save(map);
			},
			modifyData : function(map){
				return mapResource.update(map);
			},
			markAndUnmark : function(map){
				var markURL = 'maps/mark/:id'
				var markMapResource = $resource(markURL,
						{id:'@id'},
						{'update':{
							method: 'PUT'
							}
						});
				return markMapResource.update(map);
			},
			deleteData : function(id){
				return mapResource.remove({id:id});
			}
		}
	}]);

