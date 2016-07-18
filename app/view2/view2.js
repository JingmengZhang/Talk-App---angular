'use strict';
angular.module('myApp.detail', ['ngRoute', 'myApp.messages-factory', 'ngSanitize', 'emoji'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2/:id', {
    templateUrl: 'view2/view2.html',
    controller: 'detailCtrl'
  });
}])
.controller('detailCtrl', ['$scope', '$routeParams', 'messages', '$rootScope', '$location', '$anchorScroll', function($scope, $routeParams, messages, $rootScope, $location, $anchorScroll) {
	$scope.error = null;
	$rootScope.location = "#!/view2";
	$rootScope.loginInfo= {"id": 90001, "name": "Recy", "url":"abc.jpg"};
	$scope.info = messages.getDetail($routeParams.id);
	// show error message
	if (!$scope.info.hasOwnProperty('id')) {
		$scope.error = "Error! Please refresh page or click Home to go back.";
	}

	$scope.createEmoji = function() {
		var message = $scope.newMessage;
		if (message == null) {
			$scope.newMessage = ":smiley:";
		} else {
			$scope.newMessage = message + " :smiley:";
		}
		
	};

	$scope.send = function(msg, imgFlag) {
		var connectorId, d, s, r, myId, nm, url;
		connectorId = $routeParams.id;
		myId = $rootScope.loginInfo.id;
		d = (new Date()).toJSON();
		// Check it's a group talk or not
		// To create related message
		var gFlag = $scope.info.group;
		if (gFlag) {
			nm = $rootScope.loginInfo.name;
			url = "img/" + $rootScope.loginInfo.url;
			s = messages.createNewSentenceG(myId, nm, url, d, msg, imgFlag);
		} else {
			s = messages.createNewSentenceP(myId, d, msg, imgFlag);	
		}
		// save new message
		r = messages.sendMsgIn(connectorId, s, d);
		if (r) {
			// scroll to the bottom to disply
			var newHash = 'anchor' + s.datetime;
			if ($location.hash() !== newHash) {
				$location.hash(newHash);
			} else {
				$anchorScroll();
			}
			
			//clear the input box and any error message
			$scope.newMessage = null;
			$scope.error = null;
		} else {
			$scope.error = "Error! Please refresh page or click Home to go back.";
		}
	};

}]);