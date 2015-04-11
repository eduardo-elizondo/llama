'use strict';
var express = require('express');
var app = express()
var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//var fs      = require('fs');
//var vm      = require('vm');
//include("./dataStructures.js");
//function include(path) {
//    var code = fs.readFileSync(path, 'utf-8');
//    vm.runInThisContext(code, path);
//}

var usersLang = {};
function addM(from, to, message) {
	var key = langKey(from, to);
}



var messageList = {};
var messageUnseen = {};

/* Message */
var Message = function (username, from, original, fromLang, toLang, translated) {
    this.username   = username;
    this.from       = from;
    this.original   = original;
    this.fromLang   = fromLang;
    this.toLang     = toLang;
    this.translated = translated;
    this.time       = new Date().getTime();
};

Message.prototype.addTranslated = function(translated) {
	this.translated = translated;
}

function addMessage(msg) {
	var user = msg.username;
	if (!messageList[user]) {
		messageList[user] = [];
	}
	messageList[user].push(msg);
}

function getMessages(username) {
	var list = messageList[username];
	if (list) {
//			send(list);
//		for (var i=0; i<messageList.length; i++) {
			// TODO: Finish sending
//		}
		delete messageList[username];
		return list;
	}
}

function seenMessage() {

}

/* UserList */
var UserList = function () {
	this.users = {};
}

/* User */
var User = function (username, from, to) {
    this.username = username;
    this.from = from || "en-US";
    this.to   = to   || "zh-CN";
};

/* UserList */
var UserList = function () {
	this.users = {};
}

UserList.prototype.addUser = function(username, from, to) {
	var exists = this.has(username);
	if (!exists) {
		var user = new User(username, from, to);
		this.users[username] = user;
		var key = langKey(from, to);
		usersLang[key].push(user);
		console.log("Registered: " + username);
	}
	return !exists;
}

UserList.prototype.randomUser = function(username) {
	var user = this.has(username);
	if (user) {
		var from = user.from;
		var to   = user.to;
		var key  = langKey(to, from);
		var list = usersLang[key];
		var pos  = Math.floor(Math.random() * list.length);
		var res  = list[pos];
		console.log("Chose: " + res.username);
	}
	return !exists;
}

UserList.prototype.has = function(username) {
	return this.users[username] !== undefined;
}

UserList.prototype.get = function(username) {
	return this.users[username];
}

function langKey(from, to) {
	return from + "_" + to;
}

function randomUser(username) {
	return userList.randomUser(username, from, to);
}

/* Register User */
function registerUser(username, from, to) {
	return userList.addUser(username, from, to);
}

/* Translation */
function sendMessage(msg, from, to) {
	if (msg && userList.has(from) && userList.has(to)) {
		var userFrom = userList.get(from);
		var userTo   = userList.get(to);
		var lTo   = userTo  .language
		var lFrom = userFrom.language;
		var blue = shouldUseBlueMix(from, to);
		var message = new Message(userTo.username, userFrom.username, msg, lFrom, lTo);
		if (!blue) {
			var word     = ["word",     msg];
			var langFrom = ["langFrom", userFrom.language];
			var langTo   = ["langTo",   userTo.language];
			var url = buildUrlSafe(net.translate, [word, langFrom, langTo]);
			call(url, null, message);
		}
		else if (blue) {
			var sid = "mt-" + blueMixConvert(lFrom) + "-" + blueMixConvert(lTo);
			var obj = {
				txt : msg,
				sid : sid,
				rt  : text,
			};
			Api.callUrlJson("", obj, true, null, message);
		}
	}
}

function translate(msg, from, to, res) {
	var blue = shouldUseBlueMix(from, to);
	if (!blue) {
		var word     = ["word",     msg];
		var langFrom = ["langFrom", from];
		var langTo   = ["langTo",   to];
		var url = buildUrlSafe(net.translate, [word, langFrom, langTo]);
		call(url, res);
	}
	else if (blue) {
		var sid = "mt-" + blueMixConvert(from) + "-" + blueMixConvert(to);
		var obj = {
			txt : msg,
			sid : sid,
			rt  : "text",
		};
		Api.callUrlJson("", obj, true, res);
	}
}

function shouldUseBlueMix(from, to) {
	var langs = ["es","fr","pt"];
	if (from == "en" || to == "en") {
		if (langs.indexOf(from) > -1 || langs.indexOf(to)> -1) {
			return true;
		}
	}
	return false;
}

function blueMixConvert(lang) {
	var blue = {
		"en" : "enus",
		"es" : "eses",
		"fr" : "frfr",
		"pt" : "ptbr",
	}
	return blue[lang];
}

function call(url, res, message) {
	var req = new XMLHttpRequest();
	req.onload = function() {
		console.log(this.responseText);
		var json = JSON.parse(this.responseText);
		var text = json.text;
		if (res) {
			res.send({text:text});
			res.end();
		}
		console.log("Message: " + message);
		if (message) {
			message.addTranslated(text);
			addMessage(message);
		}
//		sendMessage(socket, text);
	};
	console.log(url);
	req.open("get", url, true);
	req.send();
}


/* Boiler-plate */
var net = {
    end       : "https://web.engr.illinois.edu/~reese6/worldchat/",
	translate : "translateText.php",
	blue      : "http://wildhacks.cloudapp.net:3000/",
}

function buildUrlParamClean(param) {
	if (typeof param == 'string' && (param.indexOf('&') > -1 || param.indexOf('?') > -1 || param.indexOf('=') > -1)) {
		param = param.split('&').join('%26');
		param = param.split('?').join('%3F');
		param = param.split('=').join('%3D');
	}
	return param;
}

function buildUrl(php, param, end) {
	param = param || [];
	end = end || net.end;
	var url = end + php + (param.length ? "?" + param[0] : "");
	for (var i = 1; i < param.length; i++) {
		url += "&" + param[i];
	}
	return url;
}

function buildUrlSafe(php, param, end) {
	param = param || [];
	end = end || net.end;
	var url = end + php;
	var total = 0;
	for (var i = 0; i < param.length; i++) {
		if (param[i]) {
			url += (total ? "&" : "?") + param[i][0] + "=" + buildUrlParamClean(param[i][1]);
			total++;
		}
	}
	return url;
}

var Api = {
	url: function(php, end) {
		end = end || net.blue;
		php = php || "";
		return end + php;
	},

	sendJson: function(url, json, async, res, message) {
		if (async !== false) {
			async = true;
		}
		/*
		var req = new XMLHttpRequest();
		req.open("POST", url, async);
		req.setRequestHeader("Content-type", "application/json");
		req.onreadystatechange = function() {
			console.log(req.responseText);
			if (res) {
				res.send('test');
				//res.send(req.responseText);
			}
		};
		req.send(json);
		return req;
		*/
		var options = {
			uri: url,
			method: 'POST',
			form: {sid: json['sid'], txt: json['txt']}
		};
		console.log('Requesting translation');
		console.log(json);
		console.log(options);
		request(options, function(error, response, body) {
			var text = JSON.parse(body)["translation"];
			if (res) {
				res.send({text:text});
			}
			console.log("Message: " + message);
			if (message) {
				message.addTranslated(text);
				addMessage(message);
			}
		});
	},

	callUrlJson: function(php, object, async, res, message) {
		//var json = JSON.stringify(object);
		var url  = Api.url(php);
		var req  = Api.sendJson(url, object, async, res, message);
		//var req  = Api.sendJson(url, json, async, res);
		//console.log(json);
		console.log(url);
	},
}






var userList = new UserList();
function init() {
    registerUser("a", "en-US", "zh-CN");
    registerUser("b", "zh-CN", "en-US");
    registerUser("c", "zh-CN", "en-US");
    registerUser("d", "zh-CN", "en-US");
    registerUser("e", "zh-CN", "en-US");
}
init();


app.get('/send/:from/:to/:msg', function(req, res) {
	res.set("Connection", "close");
	res.end();
	var msg  = req.params.msg;
	var from = req.params.from;
	var to   = req.params.to;
	console.log("Sent " + msg + " from " + from + " to " + to);
	sendMessage(msg, from, to);
});

// 104.236.28.245:4730/register/aaa
app.get('/register/:user/:from/:to', function(req, res) {
    res.type('application/json');
	var user = req.params.user;
	var from = req.params.from || "en-US";
	var to   = req.params.to   || "zh-CN";
	if (!user || !registerUser(user, from, to)) {
		res.send({status:"failed"});
	}
	else {
		console.log("Registered: " + user);
		res.send({status:"success"});
	}
});

// 104.236.28.245:4730/get/Gibolt
app.get('/get/:user', function(req, res) {
    res.type('application/json');
	var user = req.params.user;
	var msgs = getMessages(user) || [];
	console.log(msgs);
	res.send(msgs);
});

app.get('/random/:user', function(req, res) {
    res.type('application/json');
	var user = req.params.user;
	if (randomUser(user)) {
		res.send({status:"failed"});
	}
	else {
		console.log("Registered: " + user);
		res.send({status:"success"});
	}
});

// 104.236.28.245:4730/ping/Gibolt
app.get('/ping/:user', function(req, res) {
    res.type('application/json');
	var user = req.params.user;
	var time = new Date().getTime();
	ping(user);
});

// 104.236.28.245:4730/translate/en/es/Hello
app.get('/translate/:from/:to/:msg', function(req, res) {
//    res.type('application/json');
	var msg  = req.params.msg;
	var from = req.params.from;
	var to   = req.params.to;
	console.log("Translated " + msg + " from " + from + " to " + to);
	translate(msg, from, to, res);
});

app.listen(process.env.PORT || 4730, '0.0.0.0');
