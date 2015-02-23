<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
	<!-- start: Mobile Specific -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<!-- end: Mobile Specific -->
	
	<!-- start : bootstrap -->
	<script src="resources/bootstrap/js/bootstrap.js"></script>
	<link href="resources/bootstrap/css/bootstrap.css" rel="stylesheet">
	
	<!-- start: CSS -->
    <link href="resources/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
	<link href="resources/bootstrap/css/style.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Droid+Sans:400,700">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Droid+Serif">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Boogaloo">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Economica:700,400italic">
	<!-- end: CSS -->
	
</head>
<title></title>
<body>
	<div id="wrapper">
		<!-- start: Container -->	
		<div class="container">
			
			<!-- start: Row -->
			<div class="row">
				<p/>
				<h1>Spring Rest Service Example</h1>
				
				<!-- start: Hero Unit - Main hero unit for a primary marketing message or call to action -->
	      		<div class="hero-unit">
	        		<p>
						spring rest service와 angularjs로 만든 web site 입니다. <br/>
						Back End : Spring + myBatis + mariaDB <br/>
						Front End : angularjs + bootstrap theme + google map api <br/>
					</p>
	        		<p><a class="btn btn-success btn-large" href="<c:url value='/map.do'/>">See... &raquo;</a></p>
	      		</div>
				<!-- end: Hero Unit -->
			</div>
		</div>
	</div>
</body>
</html>
