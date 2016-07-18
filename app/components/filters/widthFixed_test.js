'use strict';

describe('myApp.detail module', function() {
	beforeEach(module('myApp.detail'));
	
	describe('WidthFixed filter', function() {
		beforeEach(module('myApp.detail.widthFixed-filter'));
    
		it('should get message contains each word no more than 30 characters', function() {
			inject(function(widthFixedFilter) {
				var msg = "Let's have it right now. I'm really hungray. What do you want to eat?";
				expect(widthFixedFilter(msg).length).toEqual(69);
			});
		});
		
	});
});
