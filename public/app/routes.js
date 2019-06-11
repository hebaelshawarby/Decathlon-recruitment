app=angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/home.html',
				controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/jobPage',{
		templateUrl:'app/views/pages/jobpage.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/jobs',{
		templateUrl:'app/views/pages/browsejobs.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/thankyou',{
		templateUrl:'app/views/pages/thankyou.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/blog',{
		templateUrl:'app/views/pages/blog.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/blog2',{
		templateUrl:'app/views/pages/blog2.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/blog3',{
		templateUrl:'app/views/pages/blog3.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})

	.when('/applications',{
		templateUrl:'app/views/pages/applications.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/login',{
		templateUrl:'app/views/pages/login.html',
				controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/logout',{
		templateUrl:'app/views/pages/logout.html',
				controller:'mainCtrl',
		controllerAs:'mainCtrl'
		
	})
	.when('/management',{
		templateUrl:'app/views/pages/management.html',
		controller:'managementCtrl',
		controllerAs:'management',
		// authenticated:true,
		// permission:['admin','moderator']
})
	.when('/managejobs',{
		templateUrl:'app/views/pages/managejobs.html',
		controller:'managementCtrl',
		controllerAs:'management',
		// authenticated:true,
		// permission:['admin','moderator']
})
	.when('/addjob',{
		templateUrl:'app/views/pages/addjobs.html',
		controller:'managementCtrl',
		controllerAs:'management',
		// authenticated:true,
		// permission:['admin','moderator']
})
	// .when('/addjob',{
	// 	templateUrl:'app/views/pages/add-job.html',
	// 	controller:'managementCtrl',
	// 	controllerAs:'management',
	// 	authenticated:true,
	// 	permission:true
	// })
	// .when('/viewJobs',{
	// 	templateUrl:'app/views/pages/manage-jobs.html',
	// 	controller:'managementCtrl',
	// 	controllerAs:'management',
	// 	authenticated:true,
	// 	permission:true
	// })
	// .when('/about',{
	// 	templateUrl:'app/views/pages/about.html'
	// })
	// .when('/browsejobs',{
	// 	templateUrl:'app/views/pages/browse-jobs.html'
	// })
	// .when('/register2',{
	// 	templateUrl:'app/views/pages/users/register2.html'
	// })
	// .when('/register3',{
	// 	templateUrl:'app/views/pages/users/register3.html'
	// })
	// .when('/register4',{
	// 	templateUrl:'app/views/pages/users/register4.html'
	// })
	// .when('/login',{
	// 	templateUrl:'app/views/pages/users/login.html'
	// })
	// .when('/profile',{
	// 	templateUrl:'app/views/pages/users/profile.html'
	// })
	// .when('/logout',{
	// 	templateUrl:'app/views/pages/users/logout.html',
	// 	authenticated:true
	// })
	// .when('/admin',{
	// 	templateUrl:'app/views/pages/users/admin.html',
	// 	authenticated:true
	// })
	// .when('/management',{
	// 	templateUrl:'app/views/pages/management/management.html',
	// 	controller:'managementCtrl',
	// 	controllerAs:'management',
	// 	authenticated:true,
	// 	permission:true

	// })
	// .when('/applicant',{
	// 	templateUrl:'app/views/pages/management/applicant.html',
	// 	controller:'managementCtrl',
	// 	controllerAs:'management',
	// 	authenticated:true,
	// 	permission:true

	// })
	// 	.when('/moderator',{
	// 	templateUrl:'app/views/pages/management/moderators.html',
	// 	controller:'managementCtrl',
	// 	controllerAs:'management',
	// 	authenticated:true,
	// 	permission:true

	// })
	// .when('/job',{
	// 	templateUrl:'app/views/pages/job.html'

	// })
	.otherwise({redirectTo:'/'});

})

.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({
  	enabled:true,
  	requireBase:false
  })

}]);



app.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);

app.run(['$rootScope','Auth','$location','User',function($rootScope,Auth,$location,User){
	$rootScope.$on('$routeChangeStart',function(event,next,current){
		if(next)
		if(next.$$route.authenticated){
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			}else if (next.$$route.permission){
				User.getPermission().then(function(data){
					if(next.$$route.permission!=data.data.permision)
					{
						event.preventDefault();
				        $location.path('/');
					}

					console.log(next.$$route.permission)
					console.log(data.data.permision)
				})
			}
		}
	
	})
}])



