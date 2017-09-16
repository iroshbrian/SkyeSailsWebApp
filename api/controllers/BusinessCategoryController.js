/**
 * EventCategoryController
 *
 * @description :: Server-side logic for managing Eventcategories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req, res) {

		req.validate({
			name: 'string'
		});

		var businessCategory = {
			name: req.param('name')
		};

		BusinessCategory.create(businessCategory).exec(function(err, created) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				message: "Category added",
				data: created
			});

		});

	},

	getall: function(req, res) {

		BusinessCategory.find().exec(function(err, data) {

			if(err) return res.negotiate(err);

			return res.send({
				status:1,
				message: "Success",
				data: data
			});

		});
	},

	getOne: function(req, res) {
		req.validate({
			id: 'string'
		});

		BusinessCategory.findOne(req.param('id')).populateAll().exec(function(err, data) {
			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                		message: "Success",
                		data: data
			});
		});
	}
};


