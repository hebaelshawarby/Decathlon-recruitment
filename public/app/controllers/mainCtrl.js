angular.module('mainController',['userServices','authServices','fileModelDirective','uploadFileService','export','ngSanitize', 'ngCsv'])
.controller('mainCtrl',function(Auth,$location,$timeout,$rootScope,uploadFile,$scope,User,$localstorage,$window){
	var app=this;


// $rootScope.$on('$rootChangeStart',function(){

		if(Auth.isLoggedIn()){
		console.log('LOGGED IN');
		app.authorized=true;
		Auth.getUser().then(function(data){
			console.log(data.data);
			// app.username=data.data.username;
			// app.email=data.data.email;
			
			User.getPermission().then(function(data){
				console.log(data.data.permission)
				if(data.data.permission==='admin'||data.data.permission==='moderator')
				{
					console.log("hiiiii")
					$localstorage.set('show',true );
					app.loadme=true;
					$scope.show=true;
					app.authorized=true
				}
				else
				{
					app.loadme=true;
					$localstorage.set('show',false );
				}
			})
		})
	}
	else{
		app.authorized=false;
		console.log('not logged in');
	}

// })
$scope.message=""
$scope.istrue=app.authorized

console.log(app.authorized)
// $rootScope.$on('$rootChangeStart',function(){
$scope.myfile={}; 

$scope.cv={};
$scope.dm='DIGITAL MARKETER'
$scope.jobKeyword='no job keyword';
		 $scope.date = new Date();
		 console.log($scope.date);





app.jobs='';
app.jobId='';
User.getJobs().then(function(data){
	console.log(data.data.jobs);
  app.jobs=data.data.jobs;
  // app.jobLength=data.data.jobs.length
  console.log(app.jobLength)
})

app.recentjob='';
User.getrecentjobs().then(function(data){
app.recentjob=data.data.jobs;
})


app.highjob='';
User.gethighpriority().then(function(data){
app.highjob=data.data.jobs;
})

$scope.getOneJob=function(data){
	console.log(data)
	app.jobId=data
	$localstorage.set('jobname',data.jobtitle );
	$localstorage.set('jobtags',data.tags );
	$localstorage.set('jobcategory',data.category );
	$localstorage.set('joblocation',data.location );
	$localstorage.set('joblocationdes',data.locationdes );
	$localstorage.set('jobdate',data.date );
	$localstorage.set('jobtype',data.jobtype );
	$localstorage.set('jobdescription',data.description );

	$location.path('/jobPage')

}

$scope.joblocationdes=$localstorage.get('joblocationdes');
$scope.jobtitle=$localstorage.get('jobname');
$scope.jobtags=$localstorage.get('jobtags');
$scope.jobcategory=$localstorage.get('jobcategory');
$scope.joblocation=$localstorage.get('joblocation');
$scope.jobdate=$localstorage.get('jobdate');
$scope.jobtype=$localstorage.get('jobtype');
$scope.jobdescription=$localstorage.get('jobdescription');

	$scope.Submit=function(regData){
		console.log(regData)
		console.log($scope.myfile)
		var application={};
		application['fullname']=regData.fullname;
		application['email']=regData.email;
		application['phone']=regData.phone;
		application['jobtitle']=$scope.jobtitle;
		application['date']=new Date();
		application['description']=regData.description;
		application['sport']=regData.sport;
		
		uploadFile.upload($scope.myfile).then(function(data){
			console.log(data);
		 

			application['cv']=data.data.data.filename;

		User.create(application).then(function(data){
			console.log(data);

			$location.path('/thankyou');
		$timeout(function() {
			$location.path('/');
		}, 3000);

		});
			

		})
		
	}



// })
$scope.gotohome=function(){
	$location.path('/')
}
$scope.division=function(){

	$location.path('/jobs')
}


app.sportjobs='';

app.sportJson={}
app.sportJson['sport']=$localstorage.get('currentsport');
User.getjobssport(app.sportJson).then(function(data){
	app.sportjobs=data.data.jobs
	console.log(data.data.jobs)
  // app.sportjobs=data.data.jobs;
})

$scope.getjobssport=function(data){
$location.path('/sport')
$localstorage.set('currentsport',data)

}
app.locationjobs='';

app.locationJson={}
app.locationJson['location']=$localstorage.get('currentlocation');
User.getjoblocation(app.locationJson).then(function(data){
	app.locationjobs=data.data.jobs
	console.log(data.data.jobs)
  // app.sportjobs=data.data.jobs;
})
$scope.getjoblocation=function(data){
$location.path('/location')
$localstorage.set('currentlocation',data)
}

app.catjobs='';

app.catJson={}
app.catJson['category']=$localstorage.get('categ');
User.getjobscat(app.catJson).then(function(data){
	app.catjobs=data.data.jobs
	console.log(data.data.jobs)
  // app.sportjobs=data.data.jobs;
})
$scope.getjobscat=function(data){
	$location.path('/category')
$localstorage.set('categ',data)
}
$scope.gotojobs=function(){
	$location.path('/jobs')
}

$scope.gotojob=function(){
	$location.path('/addjob')
}
$scope.gotomanage=function(){
	$location.path('/managejobs')
}

$scope.gotoapp=function(){
	$location.path('/management')
}

$scope.dataToPresent='';
	this.click=function(name){
		
		//console.log(name);
		if(name=='all'){
			$localstorage.set('job','all' );
			// $location.path('/browsejobs');
			// $location.path('/register');
			$window.location.href = '/browsejobs';

			// console.log($location.path())
			

			}
		else if (name=='cm'){
			$localstorage.set('job','CRM MANAGER' );
		}else if(name=='cl'){
			$localstorage.set('job','CITY SPORT TEAM LEADER' );
		}else if(name=='wm'){
			$localstorage.set('job','WEB MERCHANDISING & ONLINE EXPERIENCE MANAGER' );
			
		}else
		{
		$scope.jobKeyword='not found';
		}

		// $scope.jobKeyword=$localstorage.get('job');
		// console.log($scope.jobKeyword)
		//$location.path('/register')
		//$location.path('/browsejobs');




	}
		

	$scope.gotoblog1=function(){
		$location.url('/blog');
		// $window.href='/blog'
	}

	this.click2=function(name){
		$location.path('/register');
		console.log(name);
		if(name=='dm'){
			$scope.jobKeyword='DIGITAL MARKETER';
			}
		}
	this.doLogin= function(loginData){
		console.log(loginData)
		Auth.login(loginData).then(function(data){
			console.log(data);
			$location.path('/management');
		})

	}
	this.logout=function(){
		console.log("hii")
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/');
		}, 2000);
	}
});