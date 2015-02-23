/**
 * controller module 구현 
 * 템플릿별 controller 따로 구현
 * 목록화면용 controller
 */
angular.module('ngMap.map.controller')
	.controller('mapListController',['$scope','result','$location','mapService','$rootScope','$window','googleMapService',function($scope,result,$location,mapService,$rootScope,$window,googleMapService){

		//resolve되어 넘어온 result에서 list값 get
		$scope.mapList = result.list;
		
		
		//검색어 처리를 위한 parameter용 map객체
		$scope.map = result.defaultObj;
		
		
		//조회된 list rootScope로 보내기
		//지도표시여부 확인 후 지도에 marker 표시를 하기 위함!!
		$scope.$emit("map:mapList", $scope.mapList);
		
		
		//새로등록된 spot 정보 list로 unshift (reverse push)
		$rootScope.$on("map:newSpot", function(e,newSpot){
			//push대신 unshift 사용 
			//array 맨 앞에 newSpot 추가
			/**
			 * http://www.w3schools.com/jsref/jsref_unshift.asp
			 * syntax : array.unshift(item1,item2, ..., itemX)
			 */
			$scope.mapList.unshift(newSpot);
		});
		
		
		//list템플릿에서 개발 Spot div 클릭 시 호출될 함수
		//지도 표시 여부 변경 함수
		$scope.markAndUnmark = function(map){
			//현재 표시 여부 확인 후 변경할 값으로 수정
			if(map.displayFlag=='Y'){
				map.displayFlag = 'N';
			}else{
				map.displayFlag = 'Y';
			}
			
			var markPromise = mapService.markAndUnmark(map).$promise;
			
			markPromise.then(function(result){
				map = result;
				
				//지도표시 여부가 Y인 경우 지도에 marker 생성
				if(map.displayFlag=='Y'){
					googleMapService.setMarker(map);
				//지도표시 여부가 N인 경우 지도에서 marker 제거
				}else{
					googleMapService.removeMarker(map);
				}
				
			}, function(error){
				//수정 실패 시 원래 값으로 변경
				if(map.displayFlag=='Y'){
					map.displayFlag = 'N';
				}else{
					map.displayFlag = 'Y';
				}
			});
		};
		
		
		//more spot 클릭 시 실행될 function
		$scope.selectMoreMapList = function(){
			//현재 출력된 list element갯수를 조회시 index값으로 사용
			$scope.map.startIndex = $scope.mapList.length;

			//전체 개수보다 출력된 element가 더 많거나 같으면 조회하지 않음
			if($scope.mapList.length>=$scope.map.totalCount){
				$window.alert('더 이상 조회할 spot이 존재하지 않습니다.')
			}else{
				var selectMorePromise = mapService.selectList($scope.map).$promise;
				
				selectMorePromise.then(function(result){
					
					// 추가로 조회된 spot 정보 기존 list에 push 하기
					angular.forEach(result.list,function(elemennt){
						$scope.mapList.push(elemennt);
					});
					
					//지도표시 여부가 Y인 경우 지도에 marker 생성
					$scope.$emit("map:mapList",result.list);
					
					//검색 관련 parameter 새로 setting
					$scope.map = result.defaultObj;
					
				});
			}
		};
		
	}]);

