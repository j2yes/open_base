/**
 * module 생성 
 * module 이름을 ngMap로 설정
 * 두번째 인자를 이용하여 다른 여러 모듈을 참조할 수 있다. (ngCookies,ngResource...)
 * ng-app diretive에서 모듈명을 ng-app 속성값으로 지정할 수 있다.
 * ex) ng-app='ngMap'
 */
//MVC 패턴을 위한 모듈 설정
//모듈간의 관계를 설정하기 위해 각 모듈 js를 html에서 선언하는 순서 중요!

//1.
//ngMap 모듈을 화면템플릿구성을 위한 ngRoute 모듈과 map과 관련된 모듈을 참조한다.
//ngMap의 모든 모듈은 ngMap.map의 하위로 표현
angular.module("ngMap",['ngRoute','ngMap.map']);

//2.
//ngMap.map 모듈은 map과 관련된 모든 모듈을 참조하도록 설정한다.
//ngMap.map.controller,ngMap.map.service .. 등 (filter, diretive...)
angular.module("ngMap.map",['ngMap.map.controller','ngMap.map.service']);

//3.
//ngMap.map.controller에 필요한 모듈 설정
angular.module("ngMap.map.controller",[]);

//4.
//ngMap.map.service에 RESTful 서비스 구현을 위한 ngResource모듈 참조
angular.module("ngMap.map.service",['ngResource']);

//VIEW 설정
//ngMember모듈 config : route를 이용하여 url별 템플릿 설정
//list와 detail처럼 화면전환 시 데이터가 필요한 경우 resolve처리를 한다.
angular.module("ngMap")

	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/maps/',
				{ templateUrl : 'resources/template/map/map-list.tmpl.html',
				  controller : 'mapListController',
				  resolve : {
					  result : function(mapService,googleMapService,$rootScope,$route){
						  //녹색 marker가 있으면 제거
						  googleMapService.removeGreenMarker();
						  googleMapService.delPanoramaView();
						  return mapService.selectList($rootScope.map).$promise;
					}
				}})
			.when('/maps/:id',
				{ templateUrl : 'resources/template/map/map-detail.tmpl.html',
				  controller : 'mapDetailController',
				  resolve : {
					  //$routeParams는 route가 변경된 후에 사용할 수 있다. 
					  //그래서 $route를 이용하여 파라미터 전달
					  detail : function(mapService,googleMapService,$route){
						  //목록화면의 모든 marker 제거
						  googleMapService.clearMarker();
						  return mapService.selectDetail($route.current.params.id).$promise;
					}
				}})
			.otherwise({redirectTo:'/maps/'});
	}])
	.run(function($rootScope) {
		/*
		$rootScope.$on('$locationChangeStart', function (event,newUrl,oldUrl) {
	        console.log('$locationChangeStart !', new Date());
	    });
		*/
		
		//화면 전환 후 실행
		$rootScope.$on('$locationChangeSuccess', function () {
	        console.log('$locationChangeSuccess changed!', new Date());
	        
	    });
		
	})
	.controller('mapMainController',['$scope','googleMapService','$rootScope','$window',function($scope,googleMapService,$rootScope,$window){
		//맵 초기화
		googleMapService.initialize(0,0);
		
		//search option 선택 초기값 지정
		$scope.searchMap = {};
		$scope.searchMap.searchOption = 'address';

		//search 버튼 클릭 시 실행될 함수
		$scope.search = function(searchMap){
			//주소로 검색
			if(searchMap.searchOption==='address'){
				
				//주소가 입력되지 않은 경우
				if($scope.searchMap.address==undefined){
					$window.alert("검색어 입력 후 조회해 주세요.");
				//주소가 입력된 경우
				}else{
					googleMapService.searchByAddress($scope.searchMap.address);
				}
				
				
			//좌표로 검색
			}else if(searchMap.searchOption==='coordinate'){
				//좌표가 입력되지 않은 경우
				if($scope.searchMap.latitude==undefined
						&&$scope.searchMap.longitude==undefined){
					$window.alert("좌표 입력 후 조회해 주세요.");
				//좌표가 입력된 경우	
				}else{
					googleMapService.searchByCoordinate($scope.searchMap.latitude,$scope.searchMap.longitude);
				}
			}
		}
		
		$scope.$on("map:mapList", function(e,mapList){
			
			angular.forEach(mapList,function(elemennt){
				//지도표시 여부가 Y인 경우 지도에 marker 생성
				if(elemennt.displayFlag=='Y'){
					googleMapService.setMarker(elemennt);
				}
			});
			
		});
		
	}]);





