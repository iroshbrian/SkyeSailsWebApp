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

		var eventCategory = {
			name: req.param('name')
		};

		EventCategory.create(eventCategory).exec(function(err, created) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				message: "Category added",
				data: created
			});

		});

	},

	getall: function(req, res) {

		EventCategory.find().exec(function(err, data) {

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

		EventCategory.findOne(req.param('id')).populateAll().exec(function(err, data) {
			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Success",
                                data: data
			});
		});
	}
};

