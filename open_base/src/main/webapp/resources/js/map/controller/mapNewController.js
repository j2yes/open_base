/**
 * controller module 구현 
 * 기능별 controller 따로 구현
 * 등록 controller
 */
angular.module('ngMap.map.controller')
	.controller('mapNewController',['$scope','mapService','googleMapService','$location','$rootScope','$window',function($scope,mapService,googleMapService,$location,$rootScope,$window){
		
		
		//map 객체 초기화
		$scope.map = {};
		
		//address 값이 변경될 경우 발생할 이벤트 listener
		$scope.$on("map:address",function(e,address){
			/**
			 * 데이터 바인딩을 위해 apply 사용 (digest)
			 * http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
			 */
			$scope.$apply(function () {
				$scope.map.address = address;
			});
		});
		
		//latitude 값이 변경될 경우 발생할 이벤트 listener
		$scope.$on("map:latitude",function(e,latitude){
			$scope.$apply(function () {
				$scope.map.latitude = latitude;
			});
		});
		
		//longitude 값이 변경될 경우 발생할 이벤트 listener
		$scope.$on("map:longitude",function(e,longitude){
			$scope.$apply(function () {
				$scope.map.longitude = longitude;
			});
		});
		
		
		//'가입' 버튼에 기능 추가
		$scope.createSpot = function(map){
			
			if($scope.addMapFrm.$invalid){
				//$window.alert("간단 validation");
			}else{
				var insertPromise = mapService.insertData(map).$promise;
				
				//데이터 추가 후 목록 표시하기
				insertPromise.then(function(newSpot){
					//insert된 데이터 spot 리스트로 추가!
					//rootScope에서 받아서 unshift하기
					$scope.$emit("map:newSpot", newSpot);
					//맵정보 초기화
					$scope.map = {};
				});
			}
		};
		
	}]);
