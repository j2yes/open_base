/**
 * google map global 변수
 */
var globalMap;
var globalMarker;
var globalGeocoder;


/**
 * 지도 초기화 함수 
 */
function initialize(latitude, longitude){
	// 입력된 좌표가 없으면 = (0,0)으로 입력되면
	//기본좌표를 역삼동으로 설정.
    if(latitude==0){ latitude=37.50075507977441; }
    if(longitude==0){ longitude=127.03690767288208; }

    //주소를 지리적 좌표로 변경시켜주는 geocoder
    globalGeocoder = new google.maps.Geocoder();

    //위도와 경도로 좌표구하기
    var coordinate = new google.maps.LatLng(latitude, longitude);

    var myOptions = { 
        zoom: 16, 
        center: coordinate, 
        navigationControl: true,    // 눈금자 형태로 스케일 조절하는 컨트롤 활성화 선택.
        navigationControlOptions: { 
            position: google.maps.ControlPosition.BOTTOM_RIGHT,
            style: google.maps.NavigationControlStyle.ZOOM_PAN // ANDROID, DEFAULT, SMALL, ZOOM_PAN
        },
        streetViewControl: true,

        scaleControl: true,    // 지도 축적 보여줄 것인지.
        //scaleControlOptions: { position: google.maps.ControlPosition.TOP_RIGHT },
        
        mapTypeControl: true, // 지도,위성,하이브리드 등등 선택 컨트롤 보여줄 것인지
        mapTypeId: google.maps.MapTypeId.ROADMAP  // HYBRID, ROADMAP, SATELLITE, TERRAIN
    }; 
   

    globalMap = new google.maps.Map(document.getElementById("googlemaps"), myOptions); 

    google.maps.event.addListener(globalMap, 'dragend', function(){    // 드래그시 이벤트 추가
        showMapPos();
        showMapAddr();
    });
    google.maps.event.addListener(globalMap, 'click', function(event){        // 지도클릭시 마커이동
    	moveMarker(event.latLng); 
    });
}

//맵 드래그할 때 맵 중앙 좌표 보여주기
function showMapPos(){
    var pos=globalMap.getCenter();

    return {latitude:pos.lat(), longitude:pos.lng()};

    //document.getElementById("centerX").value = pos.lat();
    //document.getElementById("centerY").value = pos.lng();
}

// 드래그할 때 맵 중앙 좌표의 주소
function showMapAddr(){
    globalGeocoder.geocode( { 'location': globalMap.getCenter()}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            /*
            var str="";
            for(var i=0; i<results[0].address_components.length; i++){
                str += "/"+results[0].address_components[0].long_name
            }
            document.getElementById("txtAddress").innerHTML=str;

            document.getElementById("txtAddress").innerHTML=results[0].address_components[0].types;
            */

            
            var str="";
            for(var i=3; i>=0; i--){
                str += " "+results[0].address_components[i].short_name;
            }
            document.getElementById("txtAddress").innerHTML=str;
            //document.getElementById("txtAddress").innerHTML=results[0].address_components[0].long_name;
            

        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

// 맵 중앙에 마크찍기
function setMark(){
    var myOptions = {
        position: globalMap.getCenter(),
        draggable: true,
        map: globalMap,
        //icon: "http://sstatic.naver.net/search/img2/ico_bal_a.gif", // 아이콘 설정할 때
        visible: true
    };

    globalMarker = new google.maps.Marker(myOptions);
}

// 마크 삭제하기
function removeMark(){
    globalMarker.setOptions({
        map: null,
        visible: false
    });
    globalMarker = null;
}

// 마크좌표 가져오기
function getMarkPos(){
    var pos=globalMarker.getPosition();

    //alert(pos.lat()+"/"+pos.lng());
    //return {x:pos.lat(), y:pos.lng()};

    document.getElementById("markerX").value = pos.lat();
    document.getElementById("markerY").value = pos.lng();
}

//좌표로 검색
function searchByCoordinate(latitude, longitude){
    var coordinate = new google.maps.LatLng(latitude, longitude);
    globalGeocoder.geocode( { 'location': coordinate}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        	
        	globalMap.setCenter(coordinate);
            
            document.getElementById("address").value=results[0].formatted_address;
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

//주소로 검색 
function searchByAddress(address) {
    globalGeocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            
        	globalMap.setCenter(results[0].geometry.location);
            
        	latitude = results[0].geometry.location.k;
            longitude = results[0].geometry.location.D;
            document.getElementById('latitude').value = latitude;
            document.getElementById('longitude').value = longitude;
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

//
// 정보창 마크 찍기
function setInfoMark(){
    //var html = "<div><a href='http://www.findall.co.kr' target='_blank'>www.findall.co.kr</a></div>";
    //var html = "<div><iframe src='http://www.findall.co.kr' style='width:300px;height:120px;'></iframe></div>";

    var html = "";
    html += "<div>";
    html += "    <a href='http://www.findall.co.kr' target='_blank'>";
    html += "        <img src='http://image.findall.co.kr/FANew/Topmain/summer_logo.gif' border='0'>";
    html += "    </a>";
    html += "</div>";

    var infoWin = new google.maps.InfoWindow({content: html, maxWidth:1000});
    var loc = new google.maps.LatLng(37.500061375296184,127.03099206089973);
    
    var myOptions = {
        position: loc,
        draggable: false,
        map: globalMap,
        //icon: "http://sstatic.naver.net/search/img2/ico_bal_a.gif", // 아이콘 설정할 때
        visible: true
    };

    // 마커 생성
    globalMarker = new google.maps.Marker(myOptions);

    // 마커에 이벤트리스너 추가
    google.maps.event.addListener(globalMarker, 'click', function(){
        infoWin.open(globalMap, globalMarker);
    });

    // 지도 중심좌표 이동
    globalMap.setCenter(loc);
}

// 지도 위의 마크 모두 삭제 - Refresh 말고 방법 없을까?
function clearMark(){
    var loc = globalMap.getCenter(); // 현재의 지도의 위치를 가져온다.

    globalMap = null;
    globalMarker = null;
    globalGeocoder = null;

    initialize(loc.lat(), loc.lng());
}

// 지도 클릭시 마커 생성 및 이동
function moveMarker(coordinate){
	var myOptions = {
	        position: coordinate,
	        draggable: true,
	        map: globalMap,
	        //icon: "http://sstatic.naver.net/search/img2/ico_bal_a.gif", // 아이콘 설정할 때
	        visible: true
	    };
	if(globalMarker==undefined||globalMarker==null){
		globalMarker = new google.maps.Marker(myOptions);
	}else{
		globalMarker.setPosition(coordinate);
	}
	
	globalGeocoder.geocode( { 'location': coordinate}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            document.getElementById("address").value=results[0].formatted_address;
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
	    
}	
