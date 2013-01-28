/*
** Quicktimer - Simple specific performance benchmarks for your JavaScript.
** https://github.com/eighteyes/quicktimer/
** See README for usage - MIT License
** copyright (c) 2013 Sean Canton < sean (at) 8isc.com >
*/


var QuickTimer = (function() {
	var qt = {
		config: {
			// global on/off
			enable : true,
			//emit every
			countDownTime: 1000,
			// for phonegap / xcode / adb
			mobile: false,
			// colored console msgs for chrome/firebug :)
			warnTime : 500,
			warnColor : 'yellow'
		}
	};
	//get init date
	var start = Date.now();
	var lastTime = 0;
	var delta = 0;
	var methods = {};
	var funcName = "";
	var partName = "";
	var counter = 0;
	var countDown;

	methods.init = function() {
		delta = Date.now() - start;
		QuickTimer.emit(delta, "since load");
	};

	methods.start = function(functionName){
		funcName = functionName;
		lastTime = Date.now();
		counter = 0;

		QuickTimer.emit(0, funcName || "" + "() begins");
	};

	methods.ping = function(partName) {
		delta = Date.now() - lastTime;
		if (delta > 100000) { console.warn('QuickTimer ping() without start()'); }
		lastTime = Date.now();
		counter++;
		QuickTimer.emit(delta, funcName || "" + "()", partName, counter);
		return delta;
	};

	methods.end = function(){
		delta = Date.now() - lastTime;
		QuickTimer.emit(delta, funcName + "() ends");
		funcName = partName = "";
		counter = lastTime = 0;
		return delta;
	};

	methods.emit = function() {
		if (!qt.config.enable){
			return;
		}
		var time = arguments[0];
		var func = arguments[1];
		var part, mobilemsg, count;

		if (arguments.length > 2) {
			//ping
			part = arguments[2];
			count = arguments[3];
			mobilemsg = [time, func, part, count].join(' ');
		} else {
			mobilemsg = [qt.config.name, time, func].join(' ');
		}

		if (qt.config.mobile){
			console.log(mobilemsg);
			return;
		}

		if (time > qt.config.warnTime ){
			console.log('%c ' + time, 'color:'+ qt.config.warnColor +';',  func || "", part || "", count || "");
		} else {
			console.log(time, func || "", part || "", count || "");
		}
	};

	methods.startCountDown = function(){
		countDown = setInterval(function() {
			QuickTimer.emit(qt.config.countDownTime, "CountDown");
		}, qt.config.countDownTime );
	};

	methods.endCountDown = function() {
		clearInterval(countDown);
	};

	return methods;

}());

//export to node for tests
if (typeof module != 'undefined') {
	module.exports.QuickTimer = QuickTimer;
}
