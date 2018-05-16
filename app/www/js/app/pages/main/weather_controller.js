controllers.controller("weatherCtrl", ["$scope", "$weatherView", "$weatherLang", "$action",
						function($scope, $weatherView, $weatherLang, $action){

	$scope.response = function(response){
		$weatherView.manageView($scope, response);
	}

	$scope.reload = function(){
		$weatherView.reload($scope);
	}

	$scope.switchContent = function(view){
		$weatherView.switchContent(view);
	}

	$scope.toogleDays = function(index){
		$weatherView.toogleDays(index);
	}

	$scope.setDaysName = function(index, text){
		$weatherView.setDaysName($scope, index, text);
	}

	$action.forecast($scope);

	$weatherLang.setLang($scope);
}]);