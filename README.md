# salaries-indeed
Salaries for job titles in zip codes scraped from indeed.com.

```js
var salary = require("salaries-indeed");
salary
	.of("developer", 31419)
	.and("programmer", 31419)
	.and("it project manager", 31419)
	.as("json", function(err, result) {
		// {
		// 	"currency": "USD",
		// 	"last_updated": 1444363200000,
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
