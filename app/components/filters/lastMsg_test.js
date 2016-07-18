'use strict';

describe('myApp.list module', function() {
	beforeEach(module('myApp.list'));
	
	describe('lastMsg filter', function() {
		beforeEach(module('myApp.list.lastMsg-filter'));
    
		it('should return the last message contains no more than 37 characters', function() {
			inject(function(lastMsgFilter) {
				var dialogue = [{"userId":10002,"datetime":"2015-04-23T18:29:43.511Z","text":"wonderful. When do we go to lunch, today?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2015-04-23T18:30:43.511Z","text":"Let's have it right now. I'm really hungray. What do you want to eat?","imgFlag":false,"readed":true}];
				expect(lastMsgFilter(dialogue).length).toBe(37);
			})
		});
	});
});
