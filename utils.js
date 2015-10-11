var cheerio = require("cheerio");
var Q = require("q");
var request = require("request");

module.exports = {
	params: function(salary) {
		var jobs = salary.__jobs,
			parts = [];
		for (var i = 0; i < jobs.length; i++) {
			var job = jobs[i];
			var q = "q" + (i + 1) + "=" + job.title.split(' ').join('+');
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
	},
	updated: function(html) {
		$ = cheerio.load(html);
		var text = $("tfoot > tr > th.col_a > span").text().split(" ");
		return new Date(text.slice(4).join(" ")).getTime();
	},
	rows: function(html) {
		$ = cheerio.load(html);
		var jobs = [];
		$(".job_title").each(function(i, el) {
			var parts = el.children[0].data.split(" ");
			jobs.push({
				"what": parts[0],
				"where": parseInt(parts[parts.length - 1])
			});
		});
		$("span.salary").each(function(i, el) {
			var salary = Number(el.children[0].data.replace(/[^0-9\.]+/g,""))
			jobs[i].salary = salary;
		});
		return jobs;
	}
};
