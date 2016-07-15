'use strict';
angular.module('myApp.detail', ['ngRoute', 'myApp.list'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2/:id', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$routeParams', 'messages', '$rootScope', function($scope, $routeParams, messages, $rootScope) {
	$rootScope.location = "#!/view2";
	$rootScope.loginId = 90001;
	$scope.info = messages.getDetail($routeParams.id);
	
	$scope.send = function(m) {
		

	};
}]);