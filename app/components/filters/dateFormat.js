'use strict';

angular.module('myApp.list.dateFormat-filter', [])
.filter('dateFormat', function($filter) {
	//to change datetime disply
	return function(input) {
		if (input == null){return "";}
		var result = $filter('date')(input, 'MM/dd/yyyy');
		var today = $filter('date')(new Date(), 'MM/dd/yyyy');
		if (result === today) {
			result = $filter('date')(input, 'HH:mm');;
		}
		return result;
	}
});