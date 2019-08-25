app=angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/home.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl',

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
.when('/sport',{
		templateUrl:'app/views/pages/sport.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
.when('/category',{
		templateUrl:'app/views/pages/category.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
.when('/location',{
		templateUrl:'app/views/pages/location.html',
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
	.when('/test',{
		templateUrl:'app/views/pages/t.html',
		controller:'mainCtrl',
		controllerAs:'mainCtrl'
	})
	.when('/c19xON2Yir3RgOkKoOUcpH2v7dyaLVbITOYxJU827woSGzLjpwk6H1wXoSTTvIyBbPSQpDrvn4sxDEEUh8M6rPvd9CU5kGjXDUYB6R2K6sJdvYQlaQdDOyD7nsq90LyZAc8J2CV6t65spbO2luPNa8xpMuiA4FQh',{
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
		authenticated:true,
		permission:['admin','moderator']
})
	.when('/managejobs',{
		templateUrl:'app/views/pages/managejobs.html',
		controller:'managementCtrl',
		controllerAs:'management',
		authenticated:true,
		permission:['admin','moderator']
})
	.when('/addjob',{
		templateUrl:'app/views/pages/addjobs.html',
		controller:'managementCtrl',
		controllerAs:'management',
		authenticated:true,
		permission:['admin','moderator']
})
	.when('/editjob/:id',{
		templateUrl:'app/views/pages/editjob.html',
		controller:'editCtrl',
		controllerAs:'edit',
		authenticated:true,
		permission:['admin','moderator']
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

app.run(['$rootScope', 'Auth', '$location', 'User', function($rootScope, Auth, $location, User) {

    // Check each time route changes    
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        // Only perform if user visited a route listed above
        if (next.$$route !== undefined) {
            // Check if authentication is required on route
            if (next.$$route.authenticated === true) {
                // Check if authentication is required, then if permission is required
                if (!Auth.isLoggedIn()) {
                    event.preventDefault(); // If not logged in, prevent accessing route
                    $location.path('/'); // Redirect to home instead
                } else if (next.$$route.permission) {
                    // Function: Get current user's permission to see if authorized on route
                    User.getPermission().then(function(data) {
                        // Check if user's permission matches at least one in the array
                        console.log(data.data)
                        if (next.$$route.permission[0] !== data.data.permission) {
                            if (next.$$route.permission[1] !== data.data.permission) {
                                event.preventDefault(); // If at least one role does not match, prevent accessing route
                                $location.path('/'); // Redirect to home instead
                            }
                        }
                    });
                }
            } else if (next.$$route.authenticated === false) {
                // If authentication is not required, make sure is not logged in
                if (Auth.isLoggedIn()) {
                    event.preventDefault(); // If user is logged in, prevent accessing route
                    $location.path('/profile'); // Redirect to profile instead
                }
            }
        }
    });
}]);


