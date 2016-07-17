'use strict';
angular.module('myApp.list', ['ngRoute', 'myApp.messages-factory'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'listCtrl'
  });
}])
.controller('listCtrl', [ '$scope', '$location', 'messages', '$rootScope', function($scope, $location, messages, $rootScope) {
	$rootScope.location = "#!/view1";
	$rootScope.loginInfo= {"id": 90001, "name": "Recy", "url":"abc.jpg"};
	$scope.dialogues = messages.getList();

	$scope.visitDetail = function (id) {
		$location.path("/view2/"+id);
	};

}]);
