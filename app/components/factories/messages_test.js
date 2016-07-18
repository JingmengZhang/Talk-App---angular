'use strict';

describe('myApp.messages-factory module', function() {
	beforeEach(module('myApp.messages-factory'));
	
	describe('messages factory', function (){
		var factory, obj;
		//excuted before each "it" is run.
		beforeEach(function (){
			//load the module.
			module('myApp.messages-factory');

			//inject your factory for testing.
			inject(function(messages) {
				factory = messages;
			});
		});

		//check to see if it has the expected function
		it('should have a getList function', function () { 
			expect(angular.isFunction(factory.getList)).toBe(true);
			expect(angular.isFunction(factory.getDetail)).toBe(true);
			expect(angular.isFunction(factory.createNewSentenceP)).toBe(true);
			expect(angular.isFunction(factory.createNewSentenceG)).toBe(true);
			expect(angular.isFunction(factory.sendMsgIn)).toBe(true);
		});

		//check to see if it returns 5 dialogue initially
		it('should return five dialogue initially', function (){
			var result = factory.getList();
			expect(result.length).toBe(5);
		});

		//check to see if it returns a specific dialogue through id
		it('should return a dialogue with specific id', function (){
			var result = factory.getDetail('10001');
			expect(result.userId).toEqual(10001);
		});
		
		//check to see if it returns a SentenceP object
		it('should return one SentenceP Object initially', function (){
			var result = factory.createNewSentenceP();
			expect(typeof result).toBe('object');
		});
		
		//check to see if it returns a SentenceG object
		it('should return one SentenceG Object initially', function (){
			var result = factory.createNewSentenceG();
			expect(typeof result).toBe('object');
		});
		
		//check if it successfully adds a new message to the content
		it('should return "Hi there" after adding one more message', function (){
			obj = {"userId":10003,"name":"Weiwei","url":"img/sicon.jpg","datetime":"2016-07-17T20:25:43.511Z","text":"Hi there.","imgFlag":false,"readed":true};
			factory.sendMsgIn(10005002, obj, false);
			var result = factory.getDetail('10005002');
			var messge = result.contents[result.contents.length-1];
			expect(messge.text).toBe("Hi there.");
		});
	});
});
