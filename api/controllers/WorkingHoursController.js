module.exports = {
	add: function(req, res) {

		req.validate({
			'mon': 'string',
			'tue': 'string',
			'wed': 'string',
			'thur': 'string',
			'fri': 'string',
			'sat': 'string',
			'sun': 'string',
			'business_id': 'string'
		});

		WorkingHours.create({

			mon: req.param('mon'),
			tue: req.param('tue'),
			wed: req.param('wed'),
			thur: req.param('thur'),
			fri: req.param('fri'),
			sat: req.param('sat'),
			sun: req.param('sun'),
			owner: req.param('business_id')

		}).exec(function(err, response) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Created successfully",
                                data: response

			});

		});
	},

	get: function(req, res) {

		req.validate({
			'business_id': 'string'
		});

		WorkingHours.findOne({owner: req.param('business_id')}).exec(function(err, response) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Fetched successfully",
                                data: response

			});

		});

	},

	update: function(req, res) {

		req.validate({
			'mon': 'string',
			'tue': 'string',
			'wed': 'string',
			'thur': 'string',
			'fri': 'string',
			'sat': 'string',
			'sun': 'string',
			'business_id': 'string'
		});

		WorkingHours.update({owner: req.param('business_id')},
			{
				mon: req.param('mon'),
				tue: req.param('tue'),
				wed: req.param('wed'),
				thur: req.param('thur'),
				fri: req.param('fri'),
				sat: req.param('sat'),
				sun: req.param('sun'),
			}, function(err, updated) {

				if(err) return res.negotiate(err);

				return res.send({
					status: 1,
                                	message: "Created successfully",
                                	data: updated
				});

			});

	}
};

