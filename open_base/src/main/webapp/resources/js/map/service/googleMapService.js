/**
 * service module 구현 
 * google map과 관련된 기능을 서비스 모듈로 개발
 */
angular.module('ngMap.map.service')
	.factory('googleMapService',function($rootScope){
		
		//google map service에서 사용될 global 변수
		var globalMap;
		var globalMarker;
		var greenMarker;
		var globalGeocoder;
		/**
		 * markers 저장을 위한 array 맵처럼 사용하기
		 * spot 의 id를 key값으로 사용하자!!
		 */
		var markerArray = {};
		
		/**
		 * 지도 클릭시 마커 생성 및 이동
		 */
		function moveMarker(coordinate){
			var myOptions = {
			        position: coordinate,
			        draggable: false,
			        map: globalMap,
			        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
			        visible: true
			    };
			if(globalMarker==undefined||globalMarker==null){
				globalMarker = new google.maps.Marker(myOptions);
			}else{
				globalMarker.setPosition(coordinate);
			}
			
			globalGeocoder.geocode( { 'location': coordinate}, function(results, status) {
		        if (status == google.maps.GeocoderStatus.OK) {
		        	//call back 함수 대신 broadcast를 이용하여 변경된 값 전달
		        	$rootScope.$broadcast("map:address",results[0].formatted_address);
		        	$rootScope.$broadcast("map:latitude",coordinate.k);
		        	$rootScope.$broadcast("map:longitude",coordinate.D);
		        } else {
		            alert("Geocode was not successful for the following reason: " + status);
		        }
		    });
			    
		}	
		
		
		return {
			/**
			 * 지도 초기화 함수 
			 */
			initialize : function(latitude, longitude){
				
				// 입력된 좌표가 없으면 = (0,0)으로 입력되면
				//기본좌표를 용산으로 설정.
			    if(latitude==0){ latitude=37.528242717975054; }
			    if(longitude==0){ longitude=126.97998046875; }

			    //주소를 지리적 좌표로 변경시켜주는 geocoder
			    globalGeocoder = new google.maps.Geocoder();

			    //위도와 경도로 좌표구하기
			    var coordinate = new google.maps.LatLng(latitude, longitude);

			    var myOptions = { 
			        zoom: 12, 
			        center: coordinate, 
			        navigationControl: true,    
			        navigationControlOptions: { 
			            //position: google.maps.ControlPosition.BOTTOM_RIGHT,
			            style: google.maps.NavigationControlStyle.ZOOM_PAN // ANDROID, DEFAULT, SMALL, ZOOM_PAN
			        },
			        streetViewControl: true,

			        scaleControl: true,    // 지도 축적 보여줄 것인지.
			        //scaleControlOptions: { position: google.maps.ControlPosition.TOP_RIGHT },
			        
			        mapTypeControl: true, // 지도,위성,하이브리드 등등 선택 컨트롤 보여줄 것인지
			        mapTypeId: google.maps.MapTypeId.ROADMAP  // HYBRID, ROADMAP, SATELLITE, TERRAIN
			    }; 
			   
			    /** 
			     * google map api의 경우 첫번째 파라미터를 querySelector로 선택시 작동하지 않는다.
			     * https://developers.google.com/maps/documentation/javascript/reference?csw=1#Map
			     * */
			    //globalMap = new google.maps.Map(angular.element(document.querySelector("#googlemaps")), myOptions);
			    globalMap = new google.maps.Map(document.getElementById("googlemaps"), myOptions);

			    google.maps.event.addListener(globalMap, 'dragend', function(){    // 드래그시 이벤트 추가
			        //showMapPos();
			        //showMapAddr();
			    });
			    google.maps.event.addListener(globalMap, 'click', function(event){        // 지도클릭시 마커이동
			       moveMarker(event.latLng); 
			    });
			},
			/**
			 * 좌표로 검색
			 */
			searchByCoordinate : function(latitude, longitude){
			    var coordinate = new google.maps.LatLng(latitude, longitude);
			    globalGeocoder.geocode( { 'location': coordinate}, function(results, status) {
			        if (status == google.maps.GeocoderStatus.OK) {
			        	
			        	globalMap.setCenter(coordinate);
			            
			        } else {
			            alert("Geocode was not successful for the following reason: " + status);
			        }
			    });
			},
			/**
			 * 주소로 검색
			 */
			searchByAddress : function(address){
			    globalGeocoder.geocode( { 'address': address}, function(results, status) {
			        if (status == google.maps.GeocoderStatus.OK) {
			            
			        	globalMap.setCenter(results[0].geometry.location);
			            
			        	//latitude = results[0].geometry.location.k;
			            //longitude = results[0].geometry.location.D;
			            
			        } else {
			            alert("Geocode was not successful for the following reason: " + status);
			        }
			    });
			},
			/**
			 * 좌표로 마커 생성
			 */
			setMarker : function(map){
				//array에 marker가 없는 경우
				if(!markerArray.hasOwnProperty(map.id)){
					var coordinate = new google.maps.LatLng(map.latitude, map.longitude);
					var myOptions = {
					        position: coordinate,
					        draggable: false,
					        map: globalMap,
					        visible: true,
					        title: map.title
					    };
					marker = new google.maps.Marker(myOptions);
					//angular.copy(marker, markerArray[map.id]);
					markerArray[map.id] = marker;
				}else{
					//array에 marker가 있지만 visible이 false인 경우
					if(!markerArray[map.id].visible){
						markerArray[map.id].setOptions({
							visible: true,
							title: map.title
					    });
					}
				}
			},
			/**
			 * 마커 삭제하기
			 */
			removeMarker : function(map){
				marker = markerArray[map.id];
				if(marker!=undefined){
					marker.setOptions({
						visible: false
				    });
				}
			},
			/**
			 * 모든 마커 초기화
			 */
			clearMarker : function(){
				
				//현재 지도에 visible이 true인 모든 marker 제거
				for(markerKey in markerArray){
					if(markerArray[markerKey].visible){
						markerArray[markerKey].setOptions({
							visible: false
						});
					}
				}
			},
			/**
			 * 상세화면용 녹색 마커 생성
			 */
			setGreenMarker : function(map){
					var coordinate = new google.maps.LatLng(map.latitude, map.longitude);
					globalMap.setCenter(coordinate);
					var myOptions = {
							position: coordinate,
					        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
					        draggable: false,
					        map: globalMap,
					        visible: true,
					        title: map.title
					    };
					greenMarker = new google.maps.Marker(myOptions);
			},
			/**
			 * 녹색 마커 삭제하기
			 */
			removeGreenMarker : function(){
				if(greenMarker!=undefined){
					greenMarker.setOptions({
						visible: false
					});
					greenMarker = null;
				}
			},
			/**
			 * 파노라마화면 생성 (street view)
			 */
			setPanoramaView : function(map){
				var coordinate = new google.maps.LatLng(map.latitude, map.longitude);
				
				var panoramaOptions = {
					    position: coordinate,
					    pov: {
					        heading: 270,
					        pitch: 0
					      },
					    visible: true
					  };
				var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
				globalMap.setStreetView(panorama);
			},
			/**
			 * 파노라마화면 생성 (street view)
			 */
			delPanoramaView : function(){
				globalMap.getStreetView().setVisible(false);
			}
		}
	});


