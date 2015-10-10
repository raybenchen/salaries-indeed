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
	self.for = function(titles, zip) {
		if (Object.prototype.toString.call(titles) === "[object Array]") {
			titles.forEach(function(val, index) {
				self.of(val, zip);
			});
		} else {
			self.of(val, zip);
		}
	};
	self.then = function(cb) {
		var promise = util.request(DOMAIN, util.params(self));
		var salaries = {};
		promise.then(function(result) {
			salaries.currency = util.currency(result);
			salaries.updated_last = util.updated(result);
			salaries.salaries = [];
			
			cb.apply(this, [null, salaries]);
		}, function(err) {
			cb.apply(this, [err, null]);
		});
	};
	return self;
};
