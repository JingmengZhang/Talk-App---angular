'use strict';

angular.module('myApp.messages-factory', ['ngStorage'])
.factory('messages', ['$localStorage', function($localStorage) {
	//fake data
	var data = [{"id":900001,"userId":10001,"name":"Ryan Lian","title":"Product Manager","company":"Huawei","location":"Beijing, China","datetime":"2016-07-13T18:25:43.511Z","group":false,"contents":[{"userId":10001,"datetime":"2016-07-11T12:25:43.511Z","text":"How's going?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2016-07-11T12:26:43.511Z","text":"Pretty good. How about you?","imgFlag":false,"readed":true},{"userId":10001,"datetime":"2016-07-11T12:29:43.511Z","text":"wonderful. When do we go to lunch, today?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2016-07-11T12:30:43.511Z","text":"How about right now??","imgFlag":false,"readed":true}],"url":"img/ticon.jpg"},{"id":900002,"userId":10002,"name":"Bai Xie","title":"Former Teaching Assistant","company":"SDSU","location":"Los Angeles, California","datetime":"2015-04-23T18:30:43.511Z","group":false,"contents":[{"userId":10002,"datetime":"2015-04-23T18:25:43.511Z","text":"How's going?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2015-04-23T18:26:43.511Z","text":"Pretty good. How about you?","imgFlag":false,"readed":true},{"userId":10002,"datetime":"2015-04-23T18:29:43.511Z","text":"wonderful. When do we go to lunch, today?","imgFlag":false,"readed":true},{"userId":90001,"datetime":"2015-04-23T18:30:43.511Z","text":"Let's have it right now. I'm really hungray. What do you want to eat?","imgFlag":false,"readed":true}],"url":"img/sicon.jpg"},{"id":900003,"userId":90001001,"name":"Weiwei, Susan","title":"","company":"","location":"","datetime":"2012-04-23T20:30:43.511Z","group":true,"contents":[{"userId":10003,"name":"Weiwei","url":"img/sicon.jpg","datetime":"2012-04-23T20:25:43.511Z","text":"Who wants to go shopping?","imgFlag":false,"readed":true},{"userId":90001,"name":"Recy","url":"img/abc.jpg","datetime":"2012-04-23T20:26:43.511Z","text":"Which shopping mall r you going?","imgFlag":false,"readed":true},{"userId":10004,"name":"Susan","url":"img/ticon.jpg","datetime":"2012-04-23T20:29:43.511Z","text":"wonderful. Add me on","imgFlag":false,"readed":true},{"userId":90001,"name":"Recy","url":"img/abc.jpg","datetime":"2012-04-23T20:30:43.511Z","text":"Santana Row? How about on Saturday?","imgFlag":false,"readed":true},{"userId":10004,"name":"Susan","url":"img/ticon.jpg","datetime":"2012-04-23T20:30:43.511Z","text":"I'm ok with it!","imgFlag":false,"readed":true},{"userId":10004,"name":"Susan","url":"img/ticon.jpg","datetime":"2012-04-23T20:30:43.511Z","text":"When would be a good time for us to meet","imgFlag":false,"readed":true}],"url":"img/ticon.png","group_list":[{"userId":10003,"name":"Weiwei","url":"img/sicon.jpg"},{"userId":10004,"name":"Susan","url":"img/ticon.jpg"},{"userId":90001,"name":"Recy","url":"img/abc.jpg"}]},{"id":900004,"userId":10005001,"name":"Xiao, Susan","title":"","company":"","location":"","datetime":"2016-06-23T20:30:43.511Z","group":true,"contents":null,"url":"img/ticon.png","group_list":[{"userId":10005,"name":"Xiao","url":"img/sicon.png"},{"userId":10004,"name":"Susan","url":"img/ticon.jpg"},{"userId":90001,"name":"Recy","url":"img/abc.jpg"}]},{"id":900005,"userId":10005002,"name":"Xiao, Susan, Weiwei","title":"","company":"","location":"","datetime":"2016-06-23T20:30:43.511Z","group":true,"contents":[{"userId":10003,"name":"Weiwei","url":"img/sicon.jpg","datetime":"2012-04-23T20:25:43.511Z","text":":smiley: Who wants to go shopping? :smiley:","imgFlag":false,"readed":true}],"url":"img/ticon.png","group_list":[{"userId":10005,"name":"Xiao","url":"img/sicon.png"},{"userId":10004,"name":"Susan","url":"img/ticon.jpg"},{"userId":10003,"name":"Weiwei","url":"img/sicon.jpg"},{"userId":90001,"name":"Recy","url":"img/abc.jpg"}]}];
	
	//construction for private talking sentence
	function SentenceP(id, dt, txt, imgFlag) {
		this.userId = id;
		this.datetime = dt;
		this.text = txt;
		this.imgFlag = imgFlag;
		this.readed = false;
	};

	//construction for group talking sentence
	function SentenceG(id, nm, url, dt, txt, imgFlag) {
		this.userId = id;
		this.name = nm;
		this.url = url;
		this.datetime = dt;
		this.text = txt;
		this.imgFlag = imgFlag;
		this.readed = false;
	};

	return {
		getList: function() {
			var msgList;
			if (!$localStorage.msgData) {
				$localStorage.msgData = data;
			}
			msgList = $localStorage.msgData;
			return msgList;
		},

		getDetail: function(id) {
			var info, i, msgList;
			info = {};
			if (!$localStorage.msgData) {
				$localStorage.msgData = data;
			}
			msgList = $localStorage.msgData;

			for (i=0; i<msgList.length; i++) {
				if (msgList[i].userId == id) {
					info = msgList[i];
				}
			}
			return info;
		},
		// for private talk
		createNewSentenceP: function(id, dttm, txt, imgFlag) {
			return new SentenceP(id, dttm, txt, imgFlag);
		},
		// for group talk
		createNewSentenceG: function(id, nm, url, dt, txt, imgFlag) {
			return new SentenceG(id, nm, url, dt, txt, imgFlag);
		},
		// save message to data
		sendMsgIn: function(id, s, dt) {
			if (id == null || s == null) 
				return false;
			var dlg, i, target, msgList;
			if (!$localStorage.msgData) {
				$localStorage.msgData = data;
			}
			msgList = $localStorage.msgData;

			for (i=0; i<msgList.length; i++) {
				target = msgList[i];
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