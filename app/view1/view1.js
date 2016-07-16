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
	$rootScope.loginInfo= {"id": 90001, "name": "Recy", "url":"abc.jpg"};
	$scope.dialogues = messages.getList();

	$scope.visitDetail = function (id) {
		$location.path("/view2/"+id);
	};

}])
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
})
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
		if (result.length != null && result.length > 38) {
			result = result.substr(0, 34) + '...';
		}

		return result;
	}
})
.factory('messages', ['$http', function($http) {
	//fake factory API for loading data
	var data = [{"id":900001,"userId":10001,"name":"Ryan Lian","title":"Product Manager","company":"Huawei","location":"Beijing, China","datetime":"2016-07-13T18:25:43.511Z","group":false,"contents":[{"userId":10001,"datetime":"2016-07-11T12:25:43.511Z","text":"How's going?","readed":true},{"userId":90001,"datetime":"2016-07-11T12:26:43.511Z","text":"Pretty good. How about you?","readed":true},{"userId":10001,"datetime":"2016-07-11T12:29:43.511Z","text":"wonderful. When do we go to lunch, today?","readed":true},{"userId":90001,"datetime":"2016-07-11T12:30:43.511Z","text":"How about right now??","readed":true}],"url":"img/ticon.jpg"},{"id":900002,"userId":10002,"name":"Bai Xie","title":"Former Teaching Assistant","company":"SDSU","location":"Los Angeles, California","datetime":"2015-04-23T18:30:43.511Z","group":false,"contents":[{"userId":10002,"datetime":"2015-04-23T18:25:43.511Z","text":"How's going?","readed":true},{"userId":90001,"datetime":"2015-04-23T18:26:43.511Z","text":"Pretty good. How about you?","readed":true},{"userId":10002,"datetime":"2015-04-23T18:29:43.511Z","text":"wonderful. When do we go to lunch, today?","readed":true},{"userId":90001,"datetime":"2015-04-23T18:30:43.511Z","text":"Let's have it right now. I'm really hungray. What do you want to eat?","readed":true}],"url":"img/sicon.jpg"},{"id":900003,"userId":90001,"name":"Weiwei, Susan","title":"","company":"","location":"","datetime":"2012-04-23T20:30:43.511Z","group":true,"contents":[{"userId":10003,"name":"Weiwei","url":"img/sicon.jpg","datetime":"2012-04-23T20:25:43.511Z","text":"Who wants to go shopping?","readed":true},{"userId":90001,"name":"Recy","url":"img/abc.jpg","datetime":"2012-04-23T20:26:43.511Z","text":"Which shopping mall r you going?","readed":true},{"userId":10004,"name":"Susan","url":"img/ticon.jpg","datetime":"2012-04-23T20:29:43.511Z","text":"wonderful. Add me on","readed":true},{"userId":90001,"name":"Recy","url":"img/abc.jpg","datetime":"2012-04-23T20:30:43.511Z","text":"Santana Row? How about on Saturday?","readed":true},{"userId":10004,"name":"Susan","url":"img/ticon.jpg","datetime":"2012-04-23T20:30:43.511Z","text":"I'm ok with it!","readed":true},{"userId":10004,"name":"Susan","url":"img/ticon.jpg","datetime":"2012-04-23T20:30:43.511Z","text":"When would be a good time for us to meet","readed":true}],"url":"img/ticon.png","group_list":[{"userId":10003,"name":"Weiwei","url":"img/sicon.jpg"},{"userId":10004,"name":"Susan","url":"img/ticon.jpg"},{"userId":90001,"name":"Recy","url":"img/abc.jpg"}]},{"id":900004,"userId":10005,"name":"Xiao, Susan","title":"","company":"","location":"","datetime":"2016-06-23T20:30:43.511Z","group":true,"contents":null,"url":"img/ticon.png","group_list":[{"userId":10005,"name":"Xiao","url":"img/sicon.png"},{"userId":10004,"name":"Susan","url":"img/ticon.jpg"},{"userId":90001,"name":"Recy","url":"img/abc.jpg"}]}];

	//construction for private talking sentence
	function SentenceP(id, dt, txt) {
		this.userId = id;
		this.datetime = dt;
		this.text = txt;
		this.readed = false;
	};

	//construction for group talking sentence
	function SentenceG(id, nm, url, dt, txt) {
		this.userId = id;
		this.name = nm;
		this.url = url;
		this.datetime = dt;
		this.text = txt;
		this.readed = false;
	};

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
		},
		// for private talk
		createNewSentenceP: function(id, dttm, txt) {
			return new SentenceP(id, dttm, txt);
		},
		// for group talk
		createNewSentenceG: function(id, nm, url, dt, txt) {
			return new SentenceG(id, nm, url, dt, txt);
		},

		sendMsgIn: function(id, s, dt) {
			if (id == null || s == null) 
				return false;
			var dlg, i, target;
			for (i=0; i<data.length; i++) {
				target = data[i];
				if (target.userId == id) {
					target.datetime = dt;
					dlg = target.contents;
					// add message to data
					if (dlg === null || dlg === undefined) {
						target.contents = [];
						target.contents.push(s);
					} else {
						dlg.push(s);
					}
				}
			}
			return true;
		}


	};
}]);