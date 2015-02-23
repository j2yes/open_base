<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>Favorite Spot!!</title> 
	<meta name="description" content="Add Your Favorite Place"/>
	<meta name="keywords" content="Travel, Place, Korea, Spot" />
	<meta name="author" content="j2yes"/>
	<!-- end: Meta -->
	
	<!-- start: Mobile Specific -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<!-- end: Mobile Specific -->
	
	<!-- start : bootstrap -->
	
	<script src="resources/bootstrap/js/bootstrap.js"></script>
	<link href="resources/bootstrap/css/bootstrap.css" rel="stylesheet">
	
	<!-- bootstrap cdn -->
	<!-- 
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
     -->
	<!-- end : bootstrap -->
	
	<!-- start: CSS -->
    <!-- <link href="resources/bootstrap/css/bootstrap.css" rel="stylesheet"> -->
    <link href="resources/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
	<link href="resources/bootstrap/css/style.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Droid+Sans:400,700">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Droid+Serif">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Boogaloo">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Economica:700,400italic">
	<!-- end: CSS -->
	
	
	<!-- start: Java Script -->
	<!-- Placed at the end of the document so the pages load faster -->
	
	<!-- start : angularjs -->
	<script src="resources/js/angular/angular.js"></script>
	<script src="resources/js/angular/angular-route.js"></script>
	<script src="resources/js/angular/angular-resource.js"></script>
	<!-- end : angularjs -->
	
	<script src="resources/js/jquery/jquery-1.9.1.min.js"></script>
		
	<!-- <script src="resources/bootstrap/js/jquery-1.8.2.js"></script> -->
	<script src="resources/bootstrap/js/flexslider.js"></script>
	<script src="resources/bootstrap/js/carousel.js"></script>
	<script src="resources/bootstrap/js/jquery.cslider.js"></script>
	<script src="resources/bootstrap/js/slider.js"></script>
	<script def src="resources/bootstrap/js/custom.js"></script>
	
	<!-- end: Java Script -->
		
	   <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
	
</head>
<!-- <body style="transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;" onload="initialize(0,0);"> -->
<body style="transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;">
	
	<!--start: Header -->
	<header>
		
		<!--start: Container -->
		<div class="container">
			
			<!--start: Row -->
			<div class="row">
					
				<!--start: Logo -->
				<div class="logo span3">
						
					<a class="brand" href="<c:url value='/map.do'/>"><img src="resources/bootstrap/img/logo.png"></a>
						
				</div>
				<!--end: Logo -->
					
				<!--start: Navigation -->
				<div class="span9">
						
					<div class="navbar navbar-inverse">
			    		<div class="navbar-inner">
			        		<div class="container">
			          			<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
			            			<span class="icon-bar"></span>
			            			<span class="icon-bar"></span>
			            			<span class="icon-bar"></span>
			          			</a>
			          			<div class="nav-collapse collapse" >
			            			<ul class="nav">
			              				<li><a href="<c:url value='/map.do'/>">Map</a></li>
			              				<!-- 
			              				<li class="active"><a href="/member.do">Member</a></li>
			              				<li class="dropdown">
			                				<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
			                				<ul class="dropdown-menu">
			                  					<li><a href="#">Action</a></li>
			                  					<li><a href="#">Another action</a></li>
			                  					<li><a href="#">Something else here</a></li>
			                  					<li class="divider"></li>
			                  					<li class="nav-header">Nav header</li>
			                  					<li><a href="#">Separated link</a></li>
			                  					<li><a href="#">One more separated link</a></li>
			                				</ul>
			              				</li>
			              				 -->
			            			</ul>
			          			</div>
			        		</div>
			      		</div>
			    	</div>
					
				</div>	
				<!--end: Navigation -->
					
			</div>
			<!--end: Row -->
			
		</div>
		<!--end: Container-->			
			
	</header>
	<!--end: Header-->
	
	