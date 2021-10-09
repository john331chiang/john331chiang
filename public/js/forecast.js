app.factory('forecast', ['$http', function($http) { 
  return $http.get('/search') 
            .success(function(data) { 
              var result = {}
              for (var i=0;i<result.length;i++){
              	result[data[i].key]=data[i].value
              }
              return result; 
            }) 
            .error(function(err) { 
              return err; 
            }); 

}]);
//192.168.117.179
/*app.factory('forecast2',['$http',function($http){
	return $http.delete('http://192.168.117.179:4001/search/_id').success(function(){
		console.log('success')

	})
}])*/