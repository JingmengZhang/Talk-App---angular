'use strict';
angular.module('myApp.list', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'listCtrl'
  });
}])
.controller('listCtrl', [ '$scope', '$location', 'messages', '$rootScope', function($scope, $location, messages, $rootScope) {
	$rootScope.location = "#!/view1";
	$rootScope.loginId = 90001;
	$scope.dialogues = messages.getList();

	$scope.visitDetail = function (id) {
		$location.path("/view2/"+id);
	};

}])
.filter('dateFormat', function($filter) {
	return function(input) {
		if (input == null){return "";}
		var result = $filter('date')(input, 'MM/dd/yyyy');
		var today = $filter('date')(new Date(), 'MM/dd/yyyy');
		if (result === today) {
			result = $filter('date')(input, 'HH:mm');;
		}
		return result;
	}
})
.filter('lastMsg', function($filter) {
	return function(input) {
		if (input == null || input.length == 0){return "";}
		var result, i, temp, saveInfo;
		saveInfo = input[0];
		for (i=1; i<input.length; i++) {
			temp = input[i];
			if (saveInfo.datetime < temp.datetime) {
				saveInfo = temp;
			}
		}
		result = saveInfo.text;
		if (result.length > 48) {
			result = result.substr(0, 46) + '...';
		}
		return result;
	}
})
.factory('messages', ['$http', function($http) {
	//fake factory API for loading data
	var data = [{"id":900001,"userId":10001,"name":"Ryan Lian","title":"Product Manager","company":"Huawei Technologies Co., Ltd","location":"Beijing, China","datetime":"2016-07-13T18:25:43.511Z","contents":[{"id":990001,"userId":10001,"datetime":"2016-07-11T12:25:43.511Z","text":"How's going?","readed":true},{"id":990002,"userId":90001,"datetime":"2016-07-11T12:26:43.511Z","text":"Pretty good. How about you?","readed":true},{"id":990003,"userId":10001,"datetime":"2016-07-11T12:29:43.511Z","text":"wonderful. When do we go to lunch, today?","readed":true},{"id":990004,"userId":90001,"datetime":"2016-07-11T12:30:43.511Z","text":"How about right now??","readed":true}],"url":"img/ticon.jpg"},{"id":900002,"userId":10002,"name":"Bai Xie","title":"Former Teaching Assistant","company":"SDSU","location":"Los Angeles, California","datetime":"2015-04-23T18:30:43.511Z","contents":[{"id":990001,"userId":10002,"datetime":"2015-04-23T18:25:43.511Z","text":"How's going?","readed":true},{"id":990002,"userId":90001,"datetime":"2015-04-23T18:26:43.511Z","text":"Pretty good. How about you?","readed":true},{"id":990003,"userId":10002,"datetime":"2015-04-23T18:29:43.511Z","text":"wonderful. When do we go to lunch, today?","readed":true},{"id":990004,"userId":90001,"datetime":"2015-04-23T18:30:43.511Z","text":"Let's have it right now. I'm really hungray. What do you want to eat?","readed":true}],"url":"img/sicon.jpg"},{"id":900003,"userId":90001,"name":"Weiwei, Susan","title":"","company":"","location":"","datetime":"2012-04-23T20:30:43.511Z","contents":[{"id":990001,"userId":10003,"datetime":"2012-04-23T20:25:43.511Z","text":"Who wants to go shopping?","readed":true},{"id":990002,"userId":90001,"datetime":"2012-04-23T20:26:43.511Z","text":"Which shopping mall r you going?","readed":true},{"id":990003,"userId":10004,"datetime":"2012-04-23T20:29:43.511Z","text":"wonderful. Add me on","readed":true},{"id":990004,"userId":90001,"datetime":"2012-04-23T20:30:43.511Z","text":"Santana Row? How about on Saturday?","readed":true}],"url":"img/sicon.png"}];
	return {
		getList: function() {
			return data;
		},
		getDetail: function(id) {
			var info, i;
			info = {};
			for (i=0; i<data.length; i++) {
				if (data[i].userId == id) {
					info = data[i];
				}
			}
			return info;
		}
	};
}]);