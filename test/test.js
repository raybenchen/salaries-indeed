var cheerio = require("cheerio");
var request = require("request");
require("chai").should();

describe("interface", function() {
	var salary = require("../index")();
	describe("'and' interface", function() {
		it("should have 1 job after calling 'and' before 'of'", function() {
			salary.and("developer", 31419);
			salary.should.have.property("__jobs");
			salary.__jobs.should.be.length(1);
		});
		it("'and' should add job object with title and zip props", function() {
			var jobs = salary.__jobs;
			jobs[0].should.have.property("title").equal("developer");
			jobs[0].should.have.property("zip").equal(31419);
		});
	});
	describe("'of' interface", function() {
		it("should have 2 job after calling 'of' after 'and'", function() {
			salary.of("developer", 31419);
			salary.should.have.property("__jobs");
			salary.__jobs.should.be.length(2);
		});
		it("'of' should add job object with title and zip props", function() {
			var jobs = salary.__jobs;
			jobs[0].should.have.property("title").equal("developer");
			jobs[0].should.have.property("zip").equal(31419);
		});
	});
});

describe("query generation", function() {
	var salary = require("../index")();
	var util = require("../utils");
	it("should provide a query string given a salary object", function() {
		salary.of("developer", 31419);
		util.query(salary)
			.should.equal("?q1=developer&l1=31419");
	});
	it("query should handle multiple job objects", function() {
		salary.of("programmer", 31406);
		util.query(salary)
			.should.equal("?q1=developer&l1=31419&q2=programmer&l2=31406");
	});
});

describe("indeed HTML parsing", function() {
	this.timeout(5000);

	var util = require("../utils");

	var params= "?q1=programmer&l1=31406&q2=developer&l2=31406&q3=it+product+manager&l3=31406";
	var domain = "http://www.indeed.com/salary";
	var body = null;
	before(function(done) {
		var promise = util.request(domain, params);
		promise.then(function(result) {
			body = result;
			done();
		}, function(err) {
			done(err);
		});
	});

	it("should have a 'salary_display_table'", function() {
		util.table(body).should.be.a("string");
	});

	it("should have a currency of 'USD'", function() {
		util.currency(util.table(body)).should.equal("USD");
	});
});
