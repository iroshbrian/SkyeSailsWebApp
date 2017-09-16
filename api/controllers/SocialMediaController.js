var sync = require('synchronize');
var _ = require('lodash');

var await = sync.await;
var defer = sync.defer;
var fiber = sync.fiber;

module.exports = {

	getAvailable: function(req, res) {

		SocialMedia.find({owner:req.param('business_id')}).exec(function(err, available) {

			if (err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Get Available social media",
                                data: available
			});

		});

	},

	getAvailableMerged: function(req, res) {

		/** Default social media */
		var facebook = {
			name: 'Facebook',
			imageUrl: 'http://95.85.10.198:8123/png/40px/facebook.png',
			hint: 'Facebook link'
		};

		var twitter = {
			name: 'Twitter',
			imageUrl: 'http://95.85.10.198:8123/png/40px/twitter.png',
			hint: 'twitter @username'
		};

		var ig = {
			name: 'Instagram',
			imageUrl: 'http://95.85.10.198:8123/png/40px/instagram.png',
			hint: 'instagram @username'
		};

		var youtube = {
			name: 'YouTube',
			imageUrl: 'http://95.85.10.198:8123/png/40px/youtube.png',
			hint: 'YouTube link'
		};

		SocialMedia.create(facebook).exec(function(err) {});
		SocialMedia.create(twitter).exec(function(err) {});
		SocialMedia.create(ig).exec(function(err) {});
		SocialMedia.create(youtube).exec(function(err) {});

		req.validate({
			'business_id': 'string'
		});

		try {

			fiber(function() {

				var availQuery = SocialMedia.find();
				var userQuery = SocialMediaAssoc.find({
					owner: req.param('business_id')
				});

				var avail = await (availQuery.exec(defer()));
				var user = await (userQuery.exec(defer()));

				for (var i = 0; i < avail.length; i++) {

					var j = 0

					for (; j < user.length; j++) {



						if (avail[i].id == user[j].type) {

							avail[i].value = user[j].value;
							avail[i].created = true;

							break;

						}

					}

					if(j == user.length) {

						avail[i].value = "";
						avail[i].created = false;

					}

				}

				return res.send({
					status: 1,
                                	message: "Success",
                                	data: avail
				});

			});

		} catch (err) {

			return res.negotiate(err);

		}

	},

	getall: function(req, res) {

		req.validate({
			'business_id': 'string'
		});

		SocialMediaAssoc.find({
				owner: req.param('business_id')
			})
			.populateAll()
			.exec(function(err, accounts) {

				if (err) return res.negotiate(err);

				return res.send({
					status: 1,
                                	message: "Get All Social media Accounts",
                                	data: accounts
				});

			});

	},

	add: function(req, res) {

		req.validate({
			'id': 'string',
			'business_id': 'string',
			'value': 'string'
		});

		var account = {
			value: req.param('value'),
			type: req.param('id'),
			owner: req.param('business_id')
		};

		SocialMediaAssoc.create(account).exec(function(err, created) {

			if (err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Created successfully",
                                data: created
			});

		});

	},

	update: function(req, res) {

		req.validate({
			'id': 'string',
			'value': 'string'
		});

		var id = req.param('id');
		var newValue = req.param('value');

		SocialMedia.update(id, {
			hint: newValue
		}).exec(function(err, updated) {

			if (err) return res.negotiate(err);

			return res.send({
				status: 1,
                                message: "Created successfully",
                                data: updated
			});

		});

	},

	delete: function(req, res) {

		req.validate({
			'business_id': 'string',
			'type_id': 'string'
		});

		console.log(req.param('type_id'));

		console.log(req.param('business_id'));

		SocialMediaAssoc.destroy({
			type: req.param('type_id'),
			owner: req.param('business_id')
		}).exec(function(err) {

			console.log(err);

			if (err) return res.negotiate(err);

			return res.send({
				status: 1,
				deleted: 'true'
			});
		});
	}
};
