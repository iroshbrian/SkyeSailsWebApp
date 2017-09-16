// EmailService.js - in api/services
module.exports = {
	setupDefault: function() {
		var category1 = {
			name: "Technology",
			icon: "http://www.myicon.com"
		};

		var category2 = {
			name: "Business",
			icon: "http://www.myicon.com"
		};

		EventCategory.create(category1).exec(function(err, response) {});
		EventCategory.create(category2).exec(function(err, response) {});
	}
};