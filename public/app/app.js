angular.module('userApp',['appRoutes','userController','userServices','mainController','authServices','fileModelDirective','managementController'])
 .config(function($httpProvider){
 	$httpProvider.interceptors.push('AuthInterceptors');
 })