'use strict';

describe('myApp.detail module', function() {
	var el, scope;
	
	beforeEach(function() {
		module('myApp.detail');
		inject(function($compile, $rootScope) {
			scope = $rootScope.$new();
			el = $compile(angular.element('<input type="file"  fd-input" />'))(scope);
			scope.$digest();
		});
	});

	describe('fd-input directive', function() {
		it('Choose a picture should call the method inside controller', function() {
      		
      		spyOn(scope, 'send').and.callThrough();
      		var ev = $.Event('change');
      		// as el is reference to compiled directive
      		el.triggerHandler(ev);
      		expect(el.scope().sent).toHaveBeenCalled();
    		});
	});
});