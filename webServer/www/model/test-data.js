/**
	Some sample test data
**/

var thelist = function(){
	var objJson = {
		"subscriptionStatus": "Premium",
		"count": 4,
		"profiles": [
			{
				"fname": "tony",
				"email": "soricellia@gmail.com"
			}, {
				"fname": "mike",
				"email": "mike@gmail.com"
			}, {
				"fname": "morgan",
				"email": "morgan@gmail.com"
			}, {
				"fname": "eric",
				"email": "eric@gmail.com"
			}
		]
	};
	return objJson;
};
exports.profiles = thelist();