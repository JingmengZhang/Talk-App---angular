'use strict';

angular.module('myApp.list.lastMsg-filter', [])
.filter('lastMsg', function() {
	//to display only 
	return function(input) {	
		if (input == null || input.length == 0){return "";}
		var result, i, temp, saveInfo, spealerNm;
		saveInfo = input[input.length-1];
		result = saveInfo.text;

		// disply speaker name for group only
		var spealerNm = '';
		if (saveInfo.hasOwnProperty('name')) {
			spealerNm = saveInfo.name;
			result = spealerNm + ": " +result;
		}
		// set length in disply
		if (result.length != null && result.length > 35) {
			result = result.substr(0, 34) + '...';
		}

		return result;
	}
});