'use strict';

describe('myApp.detail module', function() {
	var el, scope, ctrl;
	
	beforeEach(function() {
		module('myApp.detail');
		inject(function($compile, $rootScope, $controller) {
			scope = $rootScope.$new();
			//ctrl = $controller("detailCtrl", {$routeParams:{id:'10001'},$scope: scope,messages:mockService});
			el = $compile(angular.element('<input type="text" my-enter="send()">'))(scope);
			ctrl = el.controller("detailCtrl");
			scope.$digest();
		});
	});

	describe('my-enter directive', function() {
		it('Enter key should call the method inside controller', function() {
			
      		spyOn(ctrl, 'send');
      		var enterKey = $.Event('keydown');
      		enterKey.which = 13;
      		
      		// as el is reference to compiled directive
      		el.triggerHandler(enterKey);
      		
      		
      		expect(ctrl.sent).toHaveBeenCalled();
    		});
	});
});
