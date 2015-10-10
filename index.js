var util = require("./utils");

var DOMAIN = "http://www.indeed.com/salary";
module.exports = function() {
	var self = {};
	self.of = function(title, zip) {
		if (!self.__jobs) { self.__jobs = []; }
		self.__jobs.push({
			"title": title,
			"zip": zip
		});
		return self;
	};
	self.and = function(title, zip) {
		return self.of(title, zip);
	};
	self.then = function(cb) {
		var promise = util.request(DOMAIN, util.params(self));
		var salaries = {};
		promise.then(function(result) {
			salaries.currency = util.currency(result);
			salaries.updated_last = util.updated(result);
			
			cb.apply(this, [null, salaries]);
		}, function(err) {
			cb.apply(this, [err, null]);
		});
	};
	return self;
};
