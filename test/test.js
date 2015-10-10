var fs = require("fs");
var cheerio = require("cheerio");
require("chai").should();

describe("salaries-indeed", function() {
	var $ = "";
	before(function(done) {
		fs.readFile(__dirname + "/test-data.html", function(err, html) {
			if (err) return done(err);
			$ = cheerio.load(html.toString());
			done();
		});
	});
	describe("parse salary table", function() {
		it("should have three rows", function() {
			var rows = $("table#salary_display_table > tbody > tr");
			rows.should.have.length(3);
		});
	});
});
