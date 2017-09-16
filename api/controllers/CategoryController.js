
module.exports = {

	addCategory: function(req, res) {

		req.validate({
			'name': 'string',
			'business_id': 'string'
		});

		var category = {
			name: req.param("name"),
			owner: req.param("business_id"),
			order: 0
		};

		Category.create(category).exec(function(err, response) {
			if(err) {
				res.status(err.status).send({
					status: 0,
					message: err.summary,
					error: err
				});
			} else {
				// Category created
				res.status(200).send({
					status: 1,
					message: 'Created succesfully',
					data: response
				});
			}
		});
	},

	updateCategory: function(req, res) {

		req.validate({
			'id': 'string',
			'name': 'string',
			'enabled': 'string',
		});

		var id = req.param("id");
		var name = req.param("name");
		var enabled = req.param("enabled");

		Category.update({id: id},{name: name, enabled: enabled}).exec(function(err, updated) {
			if(err) {
				res.status(err.status).send({
					status: 0,
					message: err.summary,
					data: err
				});
			} else if(updated === undefined) {
				// Category not found
				res.status(404).send({
					status: 0,
					message: 'Category not found'
				});
			} else {
				res.status(200).send({
					status: 1,
					message: "Updated succesfully",
					data: updated
				});
			}
		});
	},

	updateCategoryLayout: function(req, res) {
		req.validate({
			id: 'string'
		});

		Category.update({id: req.param("id")}, {layout: req.param("layout")}).exec(function(err, updated) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				data: updated
			});

		});
	},

	getCategory: function(req, res) {

		req.validate({
			'id': 'string',
		});

		var id = req.param('id');

		Category.findOne(id).populate('content').exec(function(err, category) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				message: "Success",
				data: category
			});

		});
	},

	getCategories: function(req, res) {
		var sortString= 'id DESC';



		req.validate({
			'business_id': 'string',
		});

		var id = req.param('business_id');

		Category.find({owner:id}).sort(sortString).exec(function(err, categories) {
			if(err) {
				res.status(err.status).send({
					status: 0,
					message: err.summary,
					data: err
				});
			} else {
				res.status(200).send({
					status: 1,
					message: "Fetched Successfully",
					data: categories
				});
			}
		});
	},

	getActiveCategories: function(req, res) {

		req.validate({
			'business_id': 'string',
		});

		var id = req.param('business_id');

		Category.find({owner:id, enabled: true}).exec(function(err, categories) {
			if(err) {
				res.status(err.status).send({
					status: 'error',
					message: err.summary,
					data: err
				});
			} else {
				res.status(200).send({
					status: 1,
					message: "Fetched successfully",
					data: categories
				});
			}
		});
	},

	swap: function(req, res) {

		req.validate({
			'from': 'string',
			'to' : 'string'
		});

		var fromQuery = Category.findOne(req.param('from'));
		var toQuery = Category.findOne(req.param('to'));

		try {

			fiber(function() {

				var from = await (fromQuery.exec(defer()));
				var to = await(fromQuery.exec(defer()));

				fromUpdateQuery = Category.update(from.id, {order: to.order});
				toUpdateQuery = Category.update(to.id, {order: from.order});

				var fromUpdated = await(fromUpdateQuery.exec(defer()));
				var toUpdated = await(toUpdateQuery.exec(defer()));

				res.send({
					status: 1,
					from: fromUpdated,
					to: toUpdated
				});

			});

		} catch(err) {

			return res.negotiate(err);

		}

	},

	deleteCategory: function(req, res) {

		req.validate({
			'id': 'string'
		});

		var id = req.param('id');

		Category.destroy({id: id}).exec(function(err) {
			if(err) {
				res.status(err.status).send({
					status: 'error',
					message: err.summary,
					error: err
				});
			} else {
				res.status(200).send({
					status: 1
				});
			}
		});
	}
};

