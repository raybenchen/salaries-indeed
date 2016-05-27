# salaries-indeed
Salaries for job titles in zip codes scraped from indeed.com.

```js 
var salary = require("salaries-indeed");

salary.for("developer", 31406).then(function(err, result) { ... });
salary.for(["developer", "programmer"], 31406).then(function(err, result) { ... });
salary
	.of("developer", 31419)
	.and("programmer", 31419)
	.and("it project manager", 31419)
	.then(function(err, result) {
		// {
		// 	"currency": "USD",
		// 	"updated_last": 1444363200000,
		// 	"salaries": [
		// 		{
		// 			"what": "developer",
		// 			"where": 31419,
		// 			"salary": 97000
		// 		},
		// 		{
		// 			"what":  "programmer",
		// 			"where": 31419,
		// 			"salary": 85000
		// 		},
		// 		{
		// 			"what":  "it project manager",
		// 			"where": 31419
		// 			"salary": 84000
		// 		}
		// 	]
		// }
	});
```
