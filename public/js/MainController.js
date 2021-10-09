app.controller('MainController', ['$scope', 'forecast', function($scope, forecast) {
  forecast.success(function(data) {
    $scope.fiveDay = data;
    $scope.GetTimeDiff = function (x,y) {
    	x = parseInt(x.replace(/[&\|\\\*^%$#@\-:]/g, ""));
        y = parseInt(y.replace(/[&\|\\\*^%$#@\-:]/g, ""));
    	if(x>=900 && y<900){
    		return x-y-40
    	} else {
    		return x-y
    	}
    	
}

    $scope.orderByMe = function(x){
    	$scope.myOrderBy = x;
    /*$scope.editUser = function(id){

    }*/
   
    }
  });
}]);