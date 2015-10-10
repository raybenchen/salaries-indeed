module.exports = {
	query: function(salary) {
		var jobs = salary.__jobs,
			parts = [];
		for (var i = 0; i < jobs.length; i++) {
			var job = jobs[i];
			var q = "q" + (i + 1) + "=" + job.title;
			var l = "l" + (i + 1) + "=" + job.zip;
			parts.push(q);
			parts.push(l);
		}
		return "?" + parts.join("&");
	}
};
