var fs = require("fs");
var cheerio = require("cheerio");
var request = require("request");
require("chai").should();

var PARAMS = "?q1=programmer&l1=31406&q2=developer&l2=31406&q3=it+product+manager&l3=31406";
var URL = "http://www.indeed.com/salary" + PARAMS;
describe("salaries-indeed", function() {
	var $ = "";
	before(function(done) {
		request(URL, function(err, response, body) {
			if (err) return done(err);
			$ = cheerio.load(body);
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
