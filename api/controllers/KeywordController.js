/**
 * KeywordController
 *
 * @description :: Server-side logic for managing keywords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: function(req, res) {

    req.validate({
      'business_id': 'string',
      'keywords': 'string'
    });

		var keyword = {
			owner: req.param("business_id"),
			keywords: req.param("keywords")
		};

		Keyword.create(keyword).exec(function(err, response) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				data: response
			});
		});
	},

	getall: function(req, res) {
		var id = req.param('business_id');

		Keyword.find({owner: id}).exec(function(err, keywords) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				message: "Successfully fetched keywords",
				data: keywords
			});
		});
	},

	get: function(req, res)  {
		req.validate({
			id: 'string'
		});

		Keyword.findOne(req.param('id')).exec(function(err, keyword) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				message:"Successful",
				data: keyword
			});
		});
	},

	update: function(req, res) {

		req.validate({
			id: 'string',
			keyword: 'string'
		});

		Keyword.update({id: req.param('id')}, {keywords: req.param('keyword')}).exec(function(err, updated) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				message: "Success",
				updated: updated
			});
		});
	},

	delete: function(req, res) {

		req.validate({
			id: 'string'
		});

		Keyword.destroy({id: req.param('id')}).exec(function(err) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				deleted: true
			})
		});
	}
};

