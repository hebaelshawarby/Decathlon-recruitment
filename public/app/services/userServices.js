angular.module('userServices',[])

.factory('User',function($http){
	userFactory={};
    savedData={}

    userFactory.set=function(data){
      savedData=data;
     }
    userFactory.get = function(){
       return savedData;
    }
	userFactory.create=function(regData){
		return $http.post('/api/apply' ,regData).then(function(data){
			console.log(data)
		});
	}
	userFactory.postJob=function(regData){
		return $http.post('/api/postjob' ,regData).then(function(data){
			console.log(data)
		});
	}
	userFactory.getapplicantperJob=function(regData){
		return $http.post('/api/jobapplicants' ,regData)
	}
	
	userFactory.getJobs=function(){
		return $http.get('/api/getjobs');
	}
	userFactory.getrecentjobs=function(){
		return $http.get('/api/getrecentjobs');
	}
	userFactory.gethighpriority=function(){
		return $http.get('/api/gethighpriority');
	}
	
	userFactory.createModerator=function(data){
		return $http.post('/api/registerModerator' ,data);
		
	}
	userFactory.editJob=function(data){
		return $http.put('/api/editjob' ,data);
		
	}

	userFactory.adminPostJob=function(regData){
		return $http.post('/api/postjob' ,regData).then(function(data){
			console.log(data)
		});
	}
		userFactory.getPermission=function(){
			return $http.get('/api/permission')
			
	}


	userFactory.getApplicants=function(){
		return $http.get('/api/management/');
	}


	userFactory.getModerators=function(){
		return $http.get('/api/getModerators/');
	}
    userFactory.getOne = function(id) {
        return $http.get('/api/applicant/'+ id);
};
     userFactory.getstate = function(s) {
        //return $http.post('/api/state', state);
        return $http.put('/api/state/',s);
};

   userFactory.changestate = function(obj) {
        return $http.put('/api/changestate', obj);
};
   userFactory.deleteJob = function(obj) {
        return $http.delete('/api/deletejob/'+ obj);
};


	return userFactory;
})

