app.controller('searchController',['$scope','searchService',function($scope,searchService){
	searchService.success(function(data){
		$scope.results = data;
	})
}])