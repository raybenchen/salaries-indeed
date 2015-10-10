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
		
	};
	return self;
};
