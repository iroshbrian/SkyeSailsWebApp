/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	add: function(req, res) {

		req.validate({
			'business_id': 'string',
			'mobileNo': 'string',
			'mobileNoTwo': 'string',
			'landlineNo': 'string',
			'landlineNoTwo': 'string',
			'email': 'string',
			'website': 'string',
			'tollFreeNo': 'string'
		});

		Contact.create({
			'mobileNo': req.param('mobileNo'),
                        'mobileNoTwo': req.param('mobileNoTwo'),
                        'landlineNo': req.param('landlineNo'),
                        'landlineNoTwo': req.param('landlineNoTwo'),
                        'email': req.param('email'),
                        'website': req.param('website'),
                        'tollFreeNo': req.param('tollFreeNo'),
			'owner': req.param('business_id')

		}).exec(function(err, contact) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Created successfully",
                                data: contact
			});

		});

	},

	get: function(req, res) {

		req.validate({
			'id': 'string'
		});

		Contact.findOne(req.param('id')).exec(function(err, contact) {

			if(err) return res.negotiate(err);

			if(!contact) return res.notFound();

			return res.send({
				status: 1,
                                message: "Fetched successfully",
                                data: contact

			});

		});

	},

	getall: function(req, res) {

		req.validate({
			'business_id': 'string',
		});

		Contact.find({owner: req.param('business_id')}).exec(function(err, contacts) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                               	message: "Fetched successfully",
                                data: contacts

			});

		});

	},

	update: function(req, res) {

		req.validate({
			'business_id': 'string',
                        'mobileNo': 'string',
                        'mobileNoTwo': 'string',
                        'landlineNo': 'string',
                        'landlineNoTwo': 'string',
                        'email': 'string',
                        'website': 'string',
                        'tollFreeNo': 'string',
			'id': 'string'
		});

		Contact.update({'id': req.param('id')}, {

			 'mobileNo': req.param('mobileNo'),
                        'mobileNoTwo': req.param('mobileNoTwo'),
                        'landlineNo': req.param('landlineNo'),
                        'landlineNoTwo': req.param('landlineNoTwo'),
                        'email': req.param('email'),
                        'website': req.param('website'),
                        'tollFreeNo': req.param('tollFreeNo'),


		}).exec(function(err, updated) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Created successfully",
                                data: updated

			});

		});

	},

	delete: function(req, res) {

		req.validate({
			'id': 'string',
		});

		Contact.destroy({id: req.param('id')}).exec(function(err, deleted) {

			if(err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Deleted successfully",
                                data:deleted

			});

		});

	},


};

