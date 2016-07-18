'use strict';

describe('myApp.list module', function() {
	beforeEach(module('myApp.list'));
	
	describe('dateFormat filter', function() {
		var $filter;
		
		beforeEach(function() {
			module('myApp.list.dateFormat-filter');
			
			inject(function(_$filter_) {
				$filter = _$filter_;
			});
		});
		
		it('should return date with format MM/dd/yyyy', function() {
			inject(function(dateFormatFilter) {
				expect(dateFormatFilter('2015-04-23T18:26:43.511Z')).toEqual('04/23/2015');
			});
		});
		
	});
});
