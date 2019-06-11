angular.module('userController',['userServices','fileModelDirective','uploadFileService'])
.controller('regCtrl',function($http,$scope,User,uploadFile){
	$scope.file={};
	this.regUser=function(regData){
		console.log(this.regData);
		User.create(this.regData).then(function(data){
			console.log(data);

		});
	}
})