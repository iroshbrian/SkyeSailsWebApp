var Twitter = require('twitter-node-client').Twitter;


module.exports = {


	trends: function(req, res) {
			        //Callback functions
        var error = function (err, response, body) {
        console.log('ERROR [%s]', err);
        };
        var success = function (data) {
        console.log('Data [%s]', data);
        };

	var twitter = new Twitter();

	twitter.getCustomApiCall(
		'/trends/places.json',
		{ id: '1528488'},
		error, success);

	},

	getTrends : function(req, res) {

	}

};
