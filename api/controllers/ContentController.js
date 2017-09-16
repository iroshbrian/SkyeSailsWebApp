var sync = require('synchronize');
var _ = require('lodash');
var haversine = require('haversine');

var await = sync.await;
var defer = sync.defer;
var fiber = sync.fiber;

module.exports = {

	/* Add */

	addContent: function(req, res) {

		req.validate({
			'title': 'string',
			'content': 'string',
			'category_id': 'string',
			'business_id': 'string',
			'order': 'string'
		});

		var content = {
			title: req.param('title'),
			content: req.param('content'),
			type: 'text',
			belongsTo: req.param('category_id'),
			owner: req.param('business_id'),
			order: req.param("order")
		};

		Content.create(content).exec(function(err, response) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				message: "Success",
				data: response
			});

		});
	},

	addImageContent: function(req, res) {

		req.validate({
			'title': 'string',
			'content': 'string',
			'category_id': 'string',
			'business_id': 'string'
		});

		var content = {
			title: req.param('title'),
			content: req.param('content'),
			type: 'textimage',
			belongsTo: req.param('category_id'),
			owner: req.param('business_id')
		};

		Content.create(content).exec(function(err, content) {

			if (err) return res.negotiate(err);

			req.file('image').upload({

				// TODO: configure options

			}, function whenDone(err, uploadedFiles) {

				if (err) return res.negotiate(err);

				if (uploadedFiles.length === 0) {

					return res.status(500).send({
						status: 0,
						message: 'Error uploading files'
					});

				} else {

					Content.update(content.id, {
						imageUrl: require('util').format('%s/content/image/%s', sails.getBaseUrl(), content.id),
						imageFd: uploadedFiles[0].fd

					}).exec(function(err) {

						if (err) return res.negotiate(err);

						content.imageUrl = require('util').format('%s/content/image/%s', sails.getBaseUrl(), content.id);

						return res.send({
							status: 1,
							message: "Success",
							data: content
						});
					});
				}
			});

		});

	},

	swap: function(req, res) {

		req.validate({
			'from': 'string',
			'to' : 'string'
		});

		/*var fromQuery = Content.findOne(req.param('from'));
		var toQuery = Content.findOne(req.param('to'));

		try {

			fiber(function() {

				var from = await (fromQuery.exec(defer()));
				var to = await(fromQuery.exec(defer()));

				fromUpdateQuery = Content.update(from.id, {order: to.order});
				toUpdateQuery = Content.update(to.id, {order: from.order});

				var fromUpdated = await(fromUpdateQuery.exec(defer()));
				var toUpdated = await(toUpdateQuery.exec(defer()));

				res.send({
					status: 'ok',
					from: fromUpdated,
					to: toUpdated
				});

			});

		} catch(err) {

			return res.negotiate(err);

		}*/

	},



	/* Update */
	updateContent: function(req, res) {

		req.validate({
			'id': 'string',
			'title': 'string',
			'content': 'string'
		});

		Content.update({'id': req.param('id')}, {title: req.param('title'), content: req.param('content')}).exec(function(err, updated) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
            	message: "Updated successfully",
                data: updated

			});

		});

	},

	updateImageContent: function(req, res) {

		req.validate({
			'id': 'string',
			'title': 'string',
			'content': 'string'
		});

		req.file('image').upload({

				// TODO: configure options

			}, function whenDone(err, uploadedFiles) {

				if (err) return res.negotiate(err);

				if (uploadedFiles.length === 0) {

					return res.status(500).send({
						status: 0,
						message: 'Error uploading files'
					});

				} else {

					Content.update({'id': req.param('id')}, {
						imageUrl: require('util').format('%s/content/image/%s', sails.getBaseUrl(), req.param('id')),
						imageFd: uploadedFiles[0].fd,
						content:req.param('content'),
						title:req.param('title')

					}).exec(function(err) {

						if (err) return res.negotiate(err);

						//content.imageUrl = require('util').format('%s/content/image/%s', sails.getBaseUrl(), content.id);

						return res.send({
							status: 1,
							message: "Success",
					
						});
					});
				}

		});
	},


	updateContentNoImage: function(req, res) {

		req.validate({
			'id': 'string',
			'title': 'string',
			'content': 'string'
		});

		Content.update({'id': req.param('id')}, {title: req.param('title'),content: req.param('content'),imageUrl: ""}).exec(function(err, updated) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
            	message: "Updated successfully",
                data: updated

			});

		});

	},

	/* Delete */
	deleteContent: function(req, res) {
		var id = req.param('id');

		Content.destroy({
			id: id
		}).exec(function(err) {
			if (err) {
				res.status(err.status).send({
					status: 0,
					message: err.summary,
					error: err
				});
			} else {
				res.status(200).send({
					status: 1
				});
			}
		});
	},

	image: function(req, res) {

		req.validate({
			id: 'string'
		});

		Content.findOne(req.param('id')).exec(function(err, content) {
			if (err) return res.negotiate(err);
			if (!content) return res.notFound();

			if (!content.imageFd) {
				return res.notFound();
			}

			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk();

			fileAdapter.read(content.imageFd)
				.on('error', function(err) {
					return res.serverError(err);
				})
				.pipe(res);
		});
	}
};
