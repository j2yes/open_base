/**
 * controller module 구현 
 * 템플릿별 controller 따로 구현
 * 상세화면 템플릿용 controller
 */
angular.module('ngMap.map.controller')
	.controller('mapDetailController',['$scope','detail','mapService','$location','googleMapService',function($scope,detail,mapService,$location,googleMapService){
		
		//resolve되어 넘어온 상세정보 detail을 scope에 setting
		$scope.map = detail;
		
		//리스트에서 표시되던 모든 마커 지도에서 제거
		googleMapService.clearMarker($scope.map.latitude,$scope.map.longitude);
		
		//현재 상세 spot의 마커 지도에 표시 (green flag)
		googleMapService.setGreenMarker($scope.map);
		
		//파노라마 설정
		googleMapService.setPanoramaView($scope.map);
						 
		//back버튼에 기능 설정
		$scope.mapList = function(){
			//목록화면으로 이동
			$location.url('/maps/');
		};
		
		
		//수정버튼에 기능 설정
		$scope.modifyMap = function(map){
			if($scope.updateMapForm.$invalid){
				//$window.alert("간단 validation");
			}else{
				var modifyPromise = mapService.modifyData(map).$promise;
				
				modifyPromise.then(function(){
					//목록화면으로 이동
					$location.url('/maps/');
				});
			}
		};
		

		//삭제버튼에 기능 설정
		$scope.deleteMap = function(map){
			var deletePromise = mapService.deleteData(map.id).$promise;
			
			deletePromise.then(function(){
				//지도에서 marker 삭제
				googleMapService.removeMarker(map);
				
				//목록화면으로 이동
				$location.url('/maps/');
			});
		};
	}]);

