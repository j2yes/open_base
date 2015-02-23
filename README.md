# 스프링으로 RESTFul 서비스 만들기

## 사용 기술 Stack
Spring Rest API + myBatis + AngularJS + Bootstrap Theme + Google Map API

## 개발(실행)환경
JAVA 8  
Tomcat 8.X  
MariaDB 10.X  
개발환경 설정은 작성해 놓은 [slideshare](http://www.slideshare.net/jiseobkim3/spring-44190451 "spring 개발 환경 설정")를 참고하세요.  


## How To Use
1. 데이터베이스에 따라 context-datasource.xml 파일 수정해주세요.
  * database의 url, username과 password를 알맞게 수정해주세요.
2. servlet은 rest api용과 일반 web용으로 두개 선언되어 있어요.
  * CRUD는 controller package하위의 rest package안에 restful로 개발하면 됩니다.
  * 일반화면 전환은 controller package하위의 web package 에 Controller파일을 만들어 이용하세요.
3. 나머지 개발은 일반적인 MVC패턴에 맞춰 개발하시면 됩니다.

