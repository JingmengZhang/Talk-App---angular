'use strict';

describe('myApp.list module', function() {
	beforeEach(module('myApp.list'));
	
	var mockService = {
		dialogues:[{"id":900001,"userId":10001,"name":"Ryan Lian","title":"Product Manager","company":"Huawei","location":"Beijing, China","datetime":"2016-07-13T18:25:43.511Z","group":false,"contents":[{"userId":10001,"datetime":"2016-07-11T12:25:43.511Z","text":"How's going?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2016-07-11T12:26:43.511Z","text":"Pretty good. How about you?","imgFlag":false,"readed":true},{"userId":10001,"datetime":"2016-07-11T12:29:43.511Z","text":"wonderful. When do we go to lunch, today?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2016-07-11T12:30:43.511Z","text":"How about right now??","imgFlag":false,"readed":true}],"url":"img/ticon.jpg"}],
		getList: function () {
			return this.dialogues;
		}
	};
	describe('listCtrl controller', function(){
		
		it('should return dialogues array with 1 elements initially', function() {
			inject(function($rootScope, $controller) {
              		var scope = $rootScope.$new();
              		var ctrl = $controller("listCtrl", {$scope: scope,messages:mockService });
              		expect(scope.dialogues.length).toBe(1);
			})
		});
	});
});