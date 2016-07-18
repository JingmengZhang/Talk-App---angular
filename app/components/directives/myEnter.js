'use strict';

angular.module('myApp.detail.myEnter-directive', [])
.directive('myEnter', function($timeout) {
	return {
		link: function (scope, elem, attrs, send) {
			elem.bind("keydown keypress", function(e) {
			//prevent empty input
			if (scope.newMessage == undefined || scope.newMessage == null || scope.newMessage == '') {
				return;
			}
			if (e.which === 13 || e.keyCode === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.myEnter);
				});
				e.preventDefault();
			}
		});
	}
	};
});