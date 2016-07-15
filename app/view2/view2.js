'use strict';
angular.module('myApp.detail', ['ngRoute', 'myApp.list'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2/:id', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.directive('myEnter', function($timeout) {
	return function (scope, elem, attrs) {
		elem.bind("keydown keypress", function(e) {
			//prevent empty input
			if (scope.newMessage == undefined || scope.newMessage == null || scope.newMessage == '') {
				return;
			}

			if (e.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.myEnter);
				});
				scope.$watchCollection(myEnter, function(newValue) {
					if (newValue) {
						$(elem).scrollTop(elem[0].scrollHeight);
					}

				});
				e.preventDefault();
			}
		});
	};
})
.controller('View2Ctrl', ['$scope', '$routeParams', 'messages', '$rootScope', function($scope, $routeParams, messages, $rootScope) {
	$rootScope.location = "#!/view2";
	$rootScope.loginId = 90001;
	$scope.info = messages.getDetail($routeParams.id);
	
	$scope.send = function(m) {
		var connectorId = $routeParams.id;
		var d = (new Date()).toJSON();
		var s = messages.createNewSentence($rootScope.loginId, d, m);
		messages.sendMsgIn(connectorId, s);

		//clear the input box
		$scope.newMessage = null;
	};
}]);