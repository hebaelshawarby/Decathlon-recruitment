angular.module('userApp',['appRoutes','userController','userServices','mainController','authServices','fileModelDirective','managementController','export'])
 .config(function($httpProvider){
 	$httpProvider.interceptors.push('AuthInterceptors');
 })