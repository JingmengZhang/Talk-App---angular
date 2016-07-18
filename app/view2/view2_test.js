'use strict';

describe('myApp.detail module', function() {
	beforeEach(module('myApp.detail'));
	var mockService, scope, ctrl;
	mockService = {
		dialogues:[{"id":900001,"userId":10001,"name":"Ryan Lian","title":"Product Manager","company":"Huawei","location":"Beijing, China","datetime":"2016-07-13T18:25:43.511Z","group":false,"contents":[{"userId":10001,"datetime":"2016-07-11T12:25:43.511Z","text":"How's going?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2016-07-11T12:26:43.511Z","text":"Pretty good. How about you?","imgFlag":false,"readed":true},{"userId":10001,"datetime":"2016-07-11T12:29:43.511Z","text":"wonderful. When do we go to lunch, today?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2016-07-11T12:30:43.511Z","text":"How about right now??","imgFlag":false,"readed":true}],"url":"img/ticon.jpg"},{"id":900005,"userId":10005002,"name":"Xiao, Susan, Weiwei","title":"","company":"","location":"","datetime":"2016-06-23T20:30:43.511Z","group":true,"contents":[{"userId":10003,"name":"Weiwei","url":"img/sicon.jpg","datetime":"2012-04-23T20:25:43.511Z","text":":smiley: Who wants to go shopping? :smiley:","imgFlag":false,"readed":true}],"url":"img/ticon.png","group_list":[{"userId":10005,"name":"Xiao","url":"img/sicon.png"},{"userId":10004,"name":"Susan","url":"img/ticon.jpg"},{"userId":10003,"name":"Weiwei","url":"img/sicon.jpg"},{"userId":90001,"name":"Recy","url":"img/abc.jpg"}]}],
		getDetail: function (id) {
			return this.dialogues[id];
		},
		/*		createNewSentenceP: function (id, datetime, txt, imgFlag) {
			return new Object();
		},
		createNewSentenceG: function (id, name, url, datetime, txt, imgFlag) {
			return new Object();
		},*/
		sendMsgIn: function (id, sentence, datetime) {
			return true;
		}
	};
	describe('detailCtrl controller', function(){
		var $location, id;

		it('should return a dialogue with a provided id initially', function() {
			inject(function($rootScope, $controller, $routeParams) {
              		scope = $rootScope.$new();
              		ctrl = $controller("detailCtrl", {$routeParams:{id:'10001'},$scope: scope,messages:mockService});
              		expect(scope.info.userId).toBe(10005002);
			});
		});
	});
});