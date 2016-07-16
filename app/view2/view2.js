'use strict';
angular.module('myApp.detail', ['ngRoute', 'myApp.list'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2/:id', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.filter('widthFixed', function() {
	function formatMsg(input) {	
		if (input == null || input.length == 0){return '';}
		var r, i;
		r = '';
		while (input.length != null && input.length > 0) {
			if (input.length > 31) {
				r = r + input.slice(0, 30)+ '\n';
				input = input.substring(30);
			} else {
				r += input;
				input = '';
			}
		}
		return r;
	}

	return function(input) {	
		if (input == null || input.length == 0){return "";}
		var result, i, temp, arr;
		arr = input.split(' ');
		for (i=0; i<arr.length; i++) {
			temp = arr[i];
			if (temp.length > 31) {
				result = formatMsg(temp);
				arr[i] = result;
			}
		}
		result = arr.join(' ');

		return result;
	}
})
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
				e.preventDefault();
			}
		});
	};
})
.controller('View2Ctrl', ['$scope', '$routeParams', 'messages', '$rootScope', '$location', '$anchorScroll', function($scope, $routeParams, messages, $rootScope, $location, $anchorScroll) {
	$rootScope.location = "#!/view2";
	$rootScope.loginInfo= {"id": 90001, "name": "Recy", "url":"abc.jpg"};
	$scope.info = messages.getDetail($routeParams.id);	
	$scope.send = function(msg) {
		var connectorId, d, s, r, myId, nm, url;
		connectorId = $routeParams.id;
		myId = $rootScope.loginInfo.id;
		d = (new Date()).toJSON();
		//check it's a group talk or not
		var gFlag = $scope.info.group;
		if (gFlag) {
console.log("group talk: " + d + "   msg" + msg);
			nm = $rootScope.loginInfo.name;
			url = "img/" + $rootScope.loginInfo.url;
			s = messages.createNewSentenceG(myId, nm, url, d, msg);
		} else {
console.log("private talk");	
			s = messages.createNewSentenceP(myId, d, msg);	
		}
		
		r = messages.sendMsgIn(connectorId, s, d);
		if (r) {
			var newHash = 'anchor' + s.datetime;
			if ($location.hash() !== newHash) {
				$location.hash(newHash);
			} else {
				$anchorScroll();
			}
			
			//clear the input box
			$scope.newMessage = null;
			//$scope.newMessage.focus();
		}
	};

}]);