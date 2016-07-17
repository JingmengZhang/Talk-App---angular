'use strict';

angular.module('myApp.detail.fdInput-directive', [])
.directive('fdInput', function() {
	//without upload ,just get the image name for disply only
	return {
		link: function (scope, elem, attrs) {
			elem.on('change', function(e) {
				var files = e.target.files;
				var m = "<img src='img/"+ files[0].name +"' class='detail-img-upld' />";
				//var m = files[0].name; //save for using with imgFlag
				scope.$apply(function() {
					scope.send(m, true)
				});
			});
		}
	};
});