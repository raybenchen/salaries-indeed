var cheerio = require("cheerio");
var Q = require("q");
var request = require("request");

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
	},
	request: function(domain, params) {
		var result = Q.defer();
		request(domain + params, function(err, response) {
			if (err) result.reject(err);
			result.resolve(response.body);
		});
		return result.promise;
	},
	table: function(html) {
		$ = cheerio.load(html);
		return $("table#salary_display_table").html();
	},
	currency: function(html) {
		$ = cheerio.load(html);
		var text = $("tfoot > tr > th.col_a > span").text().split(" ");
		return text.slice(1, 2)[0];
	}
};
