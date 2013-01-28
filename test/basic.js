var assert = require("assert");
var QuickTimer = require('./../quicktimer').QuickTimer;

describe('QuickTimer', function() {
	before(function() {
		QuickTimer.start();
	});

	describe('ping', function() {

		it('should return a timeout number', function() {
			assert.equal(isNaN(QuickTimer.ping()), false);
		})
	})
})