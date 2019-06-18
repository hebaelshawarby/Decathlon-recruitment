angular.module('managementController',['userServices','authServices'])
.controller('managementCtrl',function(User,$scope,$location,SavedItems,$localstorage){

	var app=this;
	app.loading=true;
	app.accessDenied=true;
	app.errorMsg=false;
	app.limit=3;
    app.userSuccess='';


function getJobs() {
        // Runs function to get all the users from database
        User.getJobs1().then(function(data) {
            // Check if able to get data from database
            if (data.data.success) {
            	console.log(data)
                // Check which permissions the logged in user has
                // if (data.data.permission === 'admin' || data.data.permission === 'moderator') {
                //     app.jobs = data.data.jobs; // Assign users from database to variable
                //     app.loading = false; // Stop loading icon
                //     app.accessDenied = false; // Show table

                //     // Check if logged in user is an admin or moderator
                //     if (data.data.permission === 'admin') {
                //         app.editAccess = true; // Show edit button
                //         app.deleteAccess = true; // Show delete button
                //     } else if (data.data.permission === 'moderator') {
                //         app.editAccess = true; // Show edit button
                //     }
                // } else {
                //     app.errorMsg = 'Insufficient Permissions'; // Reject edit and delete options
                //     app.loading = false; // Stop loading icon
                // }
            } else {
                app.errorMsg = data.data.message; // Set error message
                app.loading = false; // Stop loading icon
            }
        });
    }

    getJobs(); // Invoke function to get users from databases



    // Function: Show more results on page
    app.showMore = function(number) {
        app.showMoreError = false; // Clear error message
        // Run functio only if a valid number above zero
        if (number > 0) {
            app.limit = number; // Change ng-repeat filter to number requested by user
        } else {
            app.showMoreError = 'Please enter a valid number'; // Return error if number not valid
        }
    };

    // Function: Show all results on page
    app.showAll = function() {
        app.limit = undefined; // Clear ng-repeat limit
        app.showMoreError = false; // Clear error message
    };




        // Function: Delete a user
    app.deleteJob = function(username) {
        // Run function to delete a user
        User.deleteJob(username).then(function(data) {
            console.log("here")
            // Check if able to delete user
            if (data.data.success) {
                getJobs2(); // Reset users on page
            } else {
                app.showMoreError = data.data.message; // Set error message
            }
        });
    };



 app.deleteApplicant = function(username) {
        // Run function to delete a user
        User.deleteApplicant(username).then(function(data) {
            // Check if able to delete user
            if (data.data.success) {
                getApp(); // Reset users on page
            } else {
                app.showMoreError = data.data.message; // Set error message
            }
        });
    };







// app.Submit=function(data){
//   User.createModerator(data).then(function(d){
//         console.log(d);
//         if(d.data.success)
//         app.userSuccess='User is created Successfully'
//    })

// }






$scope.addStatus=function(data,s){

	data["_id"]=s;
	User.addStatus(data).then(function(d){
		console.log(d);
		getApp();
	})
}

$scope.addNote=function(data,s){

    data["_id"]=s;
    User.addNote(data).then(function(d){
        console.log(d);
        getApp();
    })
}


$scope.gotojob=function(){
	$location.path('addjob')
}
app.postJob=function(data){
  console.log(data)
  data["date"]=Date.now();
  User.postJob(data).then(function(d){
    console.log(d)
    if(d.data.success){
        $location.path('/managejobs')
     // $window.location.href = '/viewjobs';
    }
    

 })
}








app.jobs='';
app.jobId='';


function getJobs2() {
User.getJobs().then(function(data){
	console.log(data.data.jobs);
  app.jobs=data.data.jobs;
  app.jobLength=data.data.jobs.length
  console.log(app.jobLength)
})
}

getJobs2();
// $scope.appforJob=function(){
// 	for(x=0;i<app.jobs.length;i++){
// 		User.getapplicantperJob(app.jobs[i]).then(function(data){

// 		})
// 	}
	
// }
app.MyCSV={};
function getApp(){


User.getApplicants().then(function(data){
 // console.log(data)
	if(data.data.success){
		if(data.data.permission==="admin"||data.data.permission==="moderator"){
			app.apps=data.data.apps;
            console.log(app.apps.length)
            app.total=app.apps.length;
            app.MyCSV =app.apps; 

	$localstorage.set('csv',app.apps);
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

}
getApp();

console.log($scope.MyCSV)



})




.controller('editCtrl', function($scope, $routeParams, User, $timeout) {
    var app = this;
    $scope.nameTab = 'active'; // Set the 'name' tab to the default active tab
    app.phase1 = true; // Set the 'name' tab to default view

    // Function: get the user that needs to be edited
    // User.getUser($routeParams.id).then(function(data) {
    //     // Check if the user's _id was found in database
    //     if (data.data.success) {
    //         $scope.newName = data.data.user.name; // Display user's name in scope
    //         $scope.newEmail = data.data.user.email; // Display user's e-mail in scope
    //         $scope.newUsername = data.data.user.username; // Display user's username in scope
    //         $scope.newPermission = data.data.user.permission; // Display user's permission in scope
    //         app.currentUser = data.data.user._id; // Get user's _id for update functions
    //     } else {
    //         app.errorMsg = data.data.message; // Set error message
    //     }
    // });

    // Function: Set the name pill to active
    // app.namePhase = function() {
    //     $scope.nameTab = 'active'; // Set name list to active
    //     $scope.usernameTab = 'default'; // Clear username class
    //     $scope.emailTab = 'default'; // Clear email class
    //     $scope.permissionsTab = 'default'; // Clear permission class
    //     app.phase1 = true; // Set name tab active
    //     app.phase2 = false; // Set username tab inactive
    //     app.phase3 = false; // Set e-mail tab inactive
    //     app.phase4 = false; // Set permission tab inactive
    //     app.errorMsg = false; // Clear error message
    // };

    // Function: Set the e-mail pill to active
    // app.emailPhase = function() {
    //     $scope.nameTab = 'default'; // Clear name class
    //     $scope.usernameTab = 'default'; // Clear username class
    //     $scope.emailTab = 'active'; // Set e-mail list to active
    //     $scope.permissionsTab = 'default'; // Clear permissions class
    //     app.phase1 = false; // Set name tab to inactive
    //     app.phase2 = false; // Set username tab to inactive
    //     app.phase3 = true; // Set e-mail tab to active
    //     app.phase4 = false; // Set permission tab to inactive
    //     app.errorMsg = false; // Clear error message
    // };

    // // Function: Set the username pill to active
    // app.usernamePhase = function() {
    //     $scope.nameTab = 'default'; // Clear name class
    //     $scope.usernameTab = 'active'; // Set username list to active
    //     $scope.emailTab = 'default'; // CLear e-mail class
    //     $scope.permissionsTab = 'default'; // CLear permissions tab
    //     app.phase1 = false; // Set name tab to inactive
    //     app.phase2 = true; // Set username tab to active
    //     app.phase3 = false; // Set e-mail tab to inactive
    //     app.phase4 = false; // Set permission tab to inactive
    //     app.errorMsg = false; // CLear error message
    // };

    // Function: Set the permission pill to active
    // app.permissionsPhase = function() {
    //     $scope.nameTab = 'default'; // Clear name class
    //     $scope.usernameTab = 'default'; // Clear username class
    //     $scope.emailTab = 'default'; // Clear e-mail class
    //     $scope.permissionsTab = 'active'; // Set permission list to active
    //     app.phase1 = false; // Set name tab to inactive
    //     app.phase2 = false; // Set username to inactive
    //     app.phase3 = false; // Set e-mail tab to inactive
    //     app.phase4 = true; // Set permission tab to active
    //     app.disableUser = false; // Disable buttons while processing
    //     app.disableModerator = false; // Disable buttons while processing
    //     app.disableAdmin = false; // Disable buttons while processing
    //     app.errorMsg = false; // Clear any error messages
    //     // Check which permission was set and disable that button
    //     if ($scope.newPermission === 'user') {
    //         app.disableUser = true; // Disable 'user' button
    //     } else if ($scope.newPermission === 'moderator') {
    //         app.disableModerator = true; // Disable 'moderator' button
    //     } else if ($scope.newPermission === 'admin') {
    //         app.disableAdmin = true; // Disable 'admin' button
    //     }
    // };

    // Function: Update the user's name
    // app.updateName = function(newName, valid) {
    //     app.errorMsg = false; // Clear any error messages
    //     app.disabled = true; // Disable form while processing
    //     // Check if the name being submitted is valid
    //     if (valid) {
    //         var userObject = {}; // Create a user object to pass to function
    //         userObject._id = app.currentUser; // Get _id to search database
    //         userObject.name = $scope.newName; // Set the new name to the user
    //         // Runs function to update the user's name
    //         User.editUser(userObject).then(function(data) {
    //             // Check if able to edit the user's name
    //             if (data.data.success) {
    //                 app.successMsg = data.data.message; // Set success message
    //                 // Function: After two seconds, clear and re-enable
    //                 $timeout(function() {
    //                     app.nameForm.name.$setPristine(); // Reset name form
    //                     app.nameForm.name.$setUntouched(); // Reset name form
    //                     app.successMsg = false; // Clear success message
    //                     app.disabled = false; // Enable form for editing
    //                 }, 2000);
    //             } else {
    //                 app.errorMsg = data.data.message; // Clear any error messages
    //                 app.disabled = false; // Enable form for editing
    //             }
    //         });
    //     } else {
    //         app.errorMsg = 'Please ensure form is filled out properly'; // Set error message
    //         app.disabled = false; // Enable form for editing
    //     }
    // };

    // Function: Update the user's e-mail
    // app.updateEmail = function(newEmail, valid) {
    //     app.errorMsg = false; // Clear any error messages
    //     app.disabled = true; // Lock form while processing
    //     // Check if submitted e-mail is valid
    //     if (valid) {
    //         var userObject = {}; // Create the user object to pass in function
    //         userObject._id = app.currentUser; // Get the user's _id in order to edit
    //         userObject.email = $scope.newEmail; // Pass the new e-mail to save to user in database
    //         // Run function to update the user's e-mail
    //         User.editUser(userObject).then(function(data) {
    //             // Check if able to edit user
    //             if (data.data.success) {
    //                 app.successMsg = data.data.message; // Set success message
    //                 // Function: After two seconds, clear and re-enable
    //                 $timeout(function() {
    //                     app.emailForm.email.$setPristine(); // Reset e-mail form
    //                     app.emailForm.email.$setUntouched(); // Reset e-mail form
    //                     app.successMsg = false; // Clear success message
    //                     app.disabled = false; // Enable form for editing
    //                 }, 2000);
    //             } else {
    //                 app.errorMsg = data.data.message; // Set error message
    //                 app.disabled = false; // Enable form for editing
    //             }
    //         });
    //     } else {
    //         app.errorMsg = 'Please ensure form is filled out properly'; // Set error message
    //         app.disabled = false; // Enable form for editing
    //     }
    // };

    // Function: Update the user's username
    // app.updateUsername = function(newUsername, valid) {
    //     app.errorMsg = false; // Clear any error message
    //     app.disabled = true; // Lock form while processing
    //     // Check if username submitted is valid
    //     if (valid) {
    //         var userObject = {}; // Create the user object to pass to function
    //         userObject._id = app.currentUser; // Pass current user _id in order to edit
    //         userObject.username = $scope.newUsername; // Set the new username provided
    //         // Runs function to update the user's username
    //         User.editUser(userObject).then(function(data) {
    //             // Check if able to edit user
    //             if (data.data.success) {
    //                 app.successMsg = data.data.message; // Set success message
    //                 // Function: After two seconds, clear and re-enable
    //                 $timeout(function() {
    //                     app.usernameForm.username.$setPristine(); // Reset username form
    //                     app.usernameForm.username.$setUntouched(); // Reset username form
    //                     app.successMsg = false; // Clear success message
    //                     app.disabled = false; // Enable form for editing
    //                 }, 2000);
    //             } else {
    //                 app.errorMsg = data.data.message; // Set error message
    //                 app.disabled = false; // Enable form for editing
    //             }
    //         });
    //     } else {
    //         app.errorMsg = 'Please ensure form is filled out properly'; // Set error message
    //         app.disabled = false; // Enable form for editing
    //     }
    // };

    // Function: Update the user's permission
    // app.updatePermissions = function(newPermission) {
    //     app.errorMsg = false; // Clear any error messages
    //     app.disableUser = true; // Disable button while processing
    //     app.disableModerator = true; // Disable button while processing
    //     app.disableAdmin = true; // Disable button while processing
    //     var userObject = {}; // Create the user object to pass to function
    //     userObject._id = app.currentUser; // Get the user _id in order to edit
    //     userObject.permission = newPermission; // Set the new permission to the user
    //     // Runs function to udate the user's permission
    //     User.editUser(userObject).then(function(data) {
    //         // Check if was able to edit user
    //         if (data.data.success) {
    //             app.successMsg = data.data.message; // Set success message
    //             // Function: After two seconds, clear and re-enable
    //             $timeout(function() {
    //                 app.successMsg = false; // Set success message
    //                 $scope.newPermission = newPermission; // Set the current permission variable
    //                 // Check which permission was assigned to the user
    //                 if (newPermission === 'user') {
    //                     app.disableUser = true; // Lock the 'user' button
    //                     app.disableModerator = false; // Unlock the 'moderator' button
    //                     app.disableAdmin = false; // Unlock the 'admin' button
    //                 } else if (newPermission === 'moderator') {
    //                     app.disableModerator = true; // Lock the 'moderator' button
    //                     app.disableUser = false; // Unlock the 'user' button
    //                     app.disableAdmin = false; // Unlock the 'admin' button
    //                 } else if (newPermission === 'admin') {
    //                     app.disableAdmin = true; // Lock the 'admin' buton
    //                     app.disableModerator = false; // Unlock the 'moderator' button
    //                     app.disableUser = false; // unlock the 'user' button
    //                 }
    //             }, 2000);
    //         } else {
    //             app.errorMsg = data.data.message; // Set error message
    //             app.disabled = false; // Enable form for editing
    //         }
    //     });
    // };
});
















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

