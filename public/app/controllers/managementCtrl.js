angular.module('managementController',['userServices','authServices'])
.controller('managementCtrl',function(User,$scope,$location,SavedItems,$localstorage){

	var app=this;
	app.loading=true;
	app.accessDenied=true;
	app.errorMsg=false;
	app.limit=10;
    app.userSuccess='';

// app.Submit=function(data){
//   User.createModerator(data).then(function(d){
//         console.log(d);
//         if(d.data.success)
//         app.userSuccess='User is created Successfully'
//    })

// }

$scope.gotojob=function(){
	$location.path('addjob')
}
app.postJob=function(data){
  console.log(data)

  User.postJob(data).then(function(d){
    console.log(d)
     // $window.location.href = '/viewjobs';
    

 })
}
app.jobs='';
app.jobId='';
User.getJobs().then(function(data){
	console.log(data.data.jobs);
  app.jobs=data.data.jobs;
  app.jobLength=data.data.jobs.length
  console.log(app.jobLength)
})

// $scope.appforJob=function(){
// 	for(x=0;i<app.jobs.length;i++){
// 		User.getapplicantperJob(app.jobs[i]).then(function(data){

// 		})
// 	}
	
// }

User.getApplicants().then(function(data){
 // console.log(data)
	if(data.data.success){
		if(data.data.permission==="admin"||data.data.permission==="moderator"){
			app.apps=data.data.apps;
            console.log(app.apps.length)
            app.total=app.apps.length;


		}else{
			app.errorMsg='no permission';
			app.loading=false;
		}
	}
	else{
		app.errorMsg=data.data.message;
		app.loading=false

	}
})

// var matching={};
// matching['state']='match';
// User.getstate(matching).then(function(data){
//     app.matchtotal=data.data.user.length;
// })
// var matching1={};
// matching1['state']='maymatch';
// User.getstate(matching1).then(function(data){
//     app.maybetotal=data.data.user.length;
// })
// var matching2={};
// matching2['state']='notmatch';
// User.getstate(matching2).then(function(data){
//     app.unmatchtotal=data.data.user.length;
// })


// // User.getModerators().then(function(data){
// //     //console.log(data.data.users);
// //     app.moderators=data.data.users
// //     app.moderatorsLength=data.data.users.length;
// //   })


// app.getModerators=function(){
//     $location.path('/moderator')
  

// }
// app.getAll=function(){
//     User.getApplicants().then(function(data){
//     if(data.data.success){
//         if(data.data.permission){
//             app.apps=data.data.apps;
//             console.log(app.apps)
//             app.total=app.apps.length;



//         }else{
//             app.errorMsg='no permission';
//             app.loading=false;
//         }
//     }
//     else{
//         app.errorMsg=data.data.message;
//         app.loading=false

//     }
// })
// }

// app.getstate=function(state){
//   var matching={};
// matching['state']=state;
// User.getstate(matching).then(function(data){
//     console.log(data.data.user);
//     app.apps=data.data.user

// });

// }


// app.change=function(id,state){
//     var obj={};
//     obj['id']=id;
//     obj['state']=state
//     console.log(obj)
//     User.changestate(obj).then(function(data){
//        // console.log(data);
//     })
// }   

// $scope.name='not found';
//     app.changeState=function(id,state){
//         console.log(id);
//         if(state='view'){

//     User.getOne(id).then(function(data){
//      $location.path('/applicant');
//      console.log(data.data.user)
//       $localstorage.set('email', data.data.user.email);
//       $localstorage.set('firstname', data.data.user.firstname);
//       $localstorage.set('lastname', data.data.user.lastname);
//       $localstorage.set('id', data.data.user._id);
//       $localstorage.set('phone', data.data.user.phone);
//       $localstorage.set('cv', data.data.user.cv);
//       $localstorage.set('date', data.data.user.date);
//       $localstorage.set('gender', data.data.user.gender);
//       $localstorage.set('description', data.data.user.description);
//       $localstorage.set('job', data.data.user.jobtitle);
//       $localstorage.set('state', data.data.user.state);
//       $localstorage.set('info', data.data.user.info);



//     })
     
           
//         }

         
   
//     }
 
// $scope.email=$localstorage.get('email')
// $scope.id=$localstorage.get('id')
// $scope.firstname=$localstorage.get('firstname')
// $scope.lastname=$localstorage.get('lastname')
// $scope.phone=$localstorage.get('phone')
// $scope.cv=$localstorage.get('cv')
// $scope.date=$localstorage.get('date')
// $scope.job=$localstorage.get('job')
// $scope.gender=$localstorage.get('gender')
// $scope.description=$localstorage.get('description')
// $scope.state=$localstorage.get('state')
// $scope.info=$localstorage.get('info')


//   console.log($localstorage.get('email'));

//     // Function: Show more results on page
//     app.showMore = function(number) {
//     	console.log(number)
//         app.showMoreError = false; // Clear error message
//         // Run functio only if a valid number above zero
//         if (number > 0) {
//             app.limit = number; // Change ng-repeat filter to number requested by user
//         } else {
//             app.showMoreError = 'Please enter a valid number'; // Return error if number not valid
//         }
// };

//     // Function: Show all results on page
//     app.showAll = function() {
//         app.limit = undefined; // Clear ng-repeat limit
//         app.showMoreError = false; // Clear error message
//     };

//     // Function: Delete a user
//     app.deleteUser = function(username) {
//         // Run function to delete a user
//         User.deleteUser(username).then(function(data) {
//             // Check if able to delete user
//             if (data.data.success) {
//                 getUsers(); // Reset users on page
//             } else {
//                 app.showMoreError = data.data.message; // Set error message
//             }
//         });
// };





// $scope.url = "../assets/images/banner.jpg"
})
