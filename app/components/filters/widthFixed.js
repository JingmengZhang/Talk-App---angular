'use strict';

angular.module('myApp.detail.widthFixed-filter', [])
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
});