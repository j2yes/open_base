<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@include file="/WEB-INF/jsp/template/top.jsp"%>
	
<div ng-app="ngMap">

	<!-- start: Page Title -->
	<div id="page-title">
	
		<div id="page-title-inner">
	
			<!-- start: Container -->
			<div class="container">
	
				<h2><i class="ico-road ico-white"></i>Map</h2>
	
			</div>
			<!-- end: Container  -->
	
		</div>	
	
	</div>
	<!-- end: Page Title -->	
	
	
	<!-- start: Map -->
	<div>
		<!-- starts: Google Maps -->
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true&region=KR"></script> 
		<div id="googlemaps-container-top"></div>
		<div id="googlemaps" class="google-map google-map-full"></div>
		<div id="googlemaps-container-bottom"></div>
		<!-- end: Google Maps -->
	</div>
	<!-- end: Map -->	

	<!-- start: Wrapper -->	
	<div id="wrapper" ng-controller="mapMainController">
		<!-- start: Container -->	
		<div class="container">
			<!-- start: Row -->
			<div class="row">
				
				<!-- start : search -->
				<div class="span12">
					<div class="title"><h3>Search</h3></div>
					
					<label for="searchOption">Search Option:</label>
					<input type="radio" ng-model="searchMap.searchOption" name="searchOption"  value="address"/> Address 
					<input type="radio" ng-model="searchMap.searchOption" name="searchOption"  value="coordinate" /> Coordinate 
					
					<div class="input">
						<input size="18" id="searchAddress" name="searchAddress" type="text" placeholder="input address keyword for search" class="input-xlarge" ng-required="true" ng-model='searchMap.address' ng-disabled="searchMap.searchOption==='coordinate'"/>
						<input size="6" id="searchLatitude" name="searchCoordinate" type="text" placeholder="latitude" class="input-xlarge" ng-model='searchMap.latitude' ng-disabled="searchMap.searchOption==='address'"/>
						<input size="6" id="searchLongitude" name="searchCoordinate" type="text" value="" placeholder="longitude" class="input-xlarge" ng-model='searchMap.longitude' ng-disabled="searchMap.searchOption==='address'"/>
						<input type="button" class="btn btn-info" value="search" ng-click="search(searchMap)"/>
					</div>
				</div>
				<!-- end : search -->
				
				<!-- start: Simply Add Spot Information -->
				<div class="span4" ng-controller="mapNewController">
						<fieldset>
						<form name="addMapFrm">
							<div class="title"><h3>Simply Add Spot Information</h3></div>
							<div class="span4">
								<h3>How To Add Spot</h3>
								<p>
									1. click map to mark (you can see blue flag)<br/>
									2. fill out below form<br/>
									3. click 'add spot!' button<br/>
								</p>
							</div>
						
							<div class="clearfix">
								<label for="address"><span>Address:</span></label>
								<div class="input">
									<input tabindex="1" size="18" id="address" name="address" type="text" class="input-xlarge" ng-required="true" ng-model='map.address' ng-disabled="true"/>
								</div>
							</div>
							
							<div class="clearfix">
								<label for="coordinate"><span>Coordinate:</span></label>
								<div class="input">
									<input tabindex="2" size="6" id="latitude" name="coordinate" type="text" class="input-xlarge" ng-required="true" ng-model='map.latitude' ng-disabled="true"/>
									<input tabindex="3" size="6" id="longitude" name="coordinate" type="text" class="input-xlarge" ng-required="true" ng-model='map.longitude' ng-disabled="true"/>
								</div>
							</div>
							
							<div class="clearfix">
								<label for="title"><span>Title:</span></label>
								<div class="input">
									<input tabindex="4" size="25" id="title" name="title" type="text" class="input-xlarge" ng-required="true" ng-model='map.title' ng-maxlength="20"/>
								</div>
							</div>

							<div class="clearfix">
								<label for="comment"><span>Comment:</span></label>
								<div class="input">
									<textarea tabindex="5" class="input-xlarge" id="comment" name="comment" rows="4"  ng-model='map.comment' ng-maxlength="500"></textarea>
								</div>
							</div>

							<div class="actions">
								<button tabindex="6" type="submit" class="btn btn-succes btn-large" ng-click="createSpot(map)">Add spot!</button>
							</div>
						</form>
						</fieldset>

					
				</div>
				<!-- end: Simply Add Spot Information -->		

				<!-- start: angular template -->
				<ng-view></ng-view>
				<!-- end: angular template -->
			
			</div>
			<!-- end: Row -->

		</div>
		<!-- end: Container -->
			
			
				
		<div class="container">
			
		</div>
  	</div>
  	
</div>
	<!-- end: Wrapper  -->		
	<script src="resources/js/map/map.js"></script>
	<script src="resources/js/map/service/mapService.js"></script>
	<script src="resources/js/map/service/googleMapService.js"></script>
	<script src="resources/js/map/controller/mapNewController.js"></script>
	<script src="resources/js/map/controller/mapListController.js"></script>
	<script src="resources/js/map/controller/mapDetailController.js"></script>
	
	
	
<%@include file="/WEB-INF/jsp/template/bottom.jsp"%>
