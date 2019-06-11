angular.module('authServices',[])

.factory('Auth',function($http,AuthToken){
	authFactory={};

	authFactory.login=function(loginData){
		return $http.post('/api/authenticate' ,loginData).then(function(data){
			console.log(data)

			AuthToken.setToken(data.data.token);
			return data;
		})
	}


	authFactory.isLoggedIn=function(){
		if(AuthToken.getToken()){
			return true;
		}
		else
			return false;
	}

	authFactory.logout=function(){
		AuthToken.setToken();
	}

	authFactory.getUser=function(){
		if(AuthToken.getToken()){
			return $http.post('/api/me');
		}else{
			$q.reject({message:'User has no token'});
		}
	}

	return authFactory;
})

.factory('AuthToken',function($window){
	var authTokenFactory={};
	authTokenFactory.setToken=function(token){
		if(token)
		$window.localStorage.setItem('token',token);
		else
		$window.localStorage.removeItem('token');
	}

	authTokenFactory.getToken=function(){
		return $window.localStorage.getItem('token');
	}
	return authTokenFactory
})
.factory('AuthInterceptors',function(AuthToken){
	var AuthInterceptorsFactory={};
	AuthInterceptorsFactory.request=function(config){
		var token=AuthToken.getToken();
		if(token) config.headers['x-access-token']=token;
		return config;
	}
	return AuthInterceptorsFactory;
})
.factory('SavedItems',function($window){
	var savedItems={};
	savedItems.setItem=function(item){
		if(item)
		console.log('saved')
		$window.localStorage.setItem('item',item);

	}

	savedItems.getItem=function(){
		return $window.localStorage.getItem('item');
	}
	console.log(savedItems)
	return savedItems;
})
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
