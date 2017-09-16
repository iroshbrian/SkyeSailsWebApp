/**
 * EventController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req, res) {

		req.validate({
			name: 'string',
			datetime: 'string',
			lat: 'string',
			business_id: 'string',
			lng: 'string',
			cost: 'string',
			description: 'string',
			category: 'string'
		});

		var event = {
			name: req.param('name'),
			datetime: req.param('datetime'),
			description: req.param('description'),
			owner: req.param('business_id'),
			lng: req.param('lng'),
			lat: req.param('lat'),
			cost: req.param('cost'),
			category: req.param('category')
		};

		Event.create(event).exec(function(err, created) {

			if(err) return res.negotiate(err);

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

					Event.update(created.id, {
						imageUrl: require('util').format('%s/event/image/%s', sails.getBaseUrl(), created.id),
						imageFd: uploadedFiles[0].fd

					}).exec(function(err) {

						if (err) return res.negotiate(err);

						event.imageUrl = require('util').format('%s/event/image/%s', sails.getBaseUrl(), created.id);

						return res.send({
							status: 1,
							response: created
						});
					});
				}
			});
		});

	},

	addNoBanner: function(req, res) {

		req.validate({
			name: 'string',
			datetime: 'string',
			lat: 'string',
			lng: 'string',
			cost: 'string',
			business_id: 'string',
			category: 'string',
			description: 'string'
		});

		var event = {
			name: req.param('name'),
			datetime: req.param('datetime'),
			description: req.param('description'),
			owner: req.param('business_id'),
			lat: req.param('lat'),
			lng: req.param('lng'),
			category: req.param('category'),
			cost: req.param('cost')
		};

		Event.create(event).exec(function(err, created) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                message: "Event created successfully",
                data: created
			});

		});

	},

	get: function(req, res) {
		req.validate({
			id: 'string'
		});

		Event.findOne(req.param('id')).exec(function(err, event) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
				message: "Event fetched successfully",
				data: event
			});
		});
	},

	getall: function(req, res) {
		req.validate({
			business_id: 'string'
		});

		Event.find({owner: req.param('business_id')}).exec(function(err, events) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                message: "Events fetched successfully",
                data: events
			});

		});
	},

	updateNoBanner: function(req, res) {

		req.validate({
			'id': 'string',
			'name': 'string',
			'datetime': 'string',
			'cost': 'string',
			'category': 'string'
		});

		var id = req.param("id");
		var name = req.param("name");
		var datetime = req.param("datetime");
		var cost = req.param("cost");
		var category = req.param("category");



		Event.update({id: id},
		{
			name	: name,
			datetime: datetime,
			cost	: cost,
			category: category,
			imageUrl: ""
		}).exec(function(err, updated) {
			if(err) {
				res.status(err.status).send({
					status: 0,
					message: err.summary,
					data: err
				});
			} else if(updated === undefined) {
				// Event not found
				res.status(404).send({
					status: 0,
					message: 'Event not found'
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



	update: function(req, res) {

		req.validate({
			'id': 'string',
			'name': 'string',
			'venue': 'string',
			'datetime': 'string',
			'cost': 'string',
			'category': 'string'
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

					Event.update({'id': req.param('id')}, {
						imageUrl: require('util').format('%s/content/image/%s', sails.getBaseUrl(), req.param('id')),
						imageFd: uploadedFiles[0].fd,
						name:req.param("name"),
						datetime: req.param("datetime"),
						cost: req.param("cost"),
						category:req.param("category")

 
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

	getFeaturedEvents: function(req, res) {

		req.validate({
			'business_id': 'string',
		});

		var id = req.param('business_id');

		Event.find({owner:id, featured: true}).exec(function(err, events) {
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
					data: events
				});
			}
		});
	},

	getActiveEvents: function(req, res) {

		req.validate({
			'business_id': 'string',
		});

		var id = req.param('business_id');

		Event.find({owner:id, enabled: true}).exec(function(err, events) {
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
					data: events
				});
			}
		});
	},

	delete: function(req, res) {

		req.validate({
			'id': 'string'
		});

		var id = req.param('id');

		Event.destroy({id: id}).exec(function(err) {
			if(err) {
				res.status(err.status).send({
					status: 'error',
					message: err.summary,
					error: err
				});
			} else {
				res.status(200).send({
					status: 1,
					message: "Event deleted successfully",
					deleted: true
				});
			}
		});

	},

	image: function(req, res) {

		req.validate({
			id: 'string'
		});

		Event.findOne(req.param('id')).exec(function(err, event) {
			if (err) return res.negotiate(err);
			if (!event) return res.notFound();

			if (!event.imageFd) {
				return res.notFound();
			}

			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk();

			fileAdapter.read(event.imageFd)
				.on('error', function(err) {
					return res.serverError(err);
				})
				.pipe(res);
		});
	}
};


