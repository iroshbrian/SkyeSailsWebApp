var sync = require('synchronize');
var _ = require('lodash');
var haversine = require('haversine');
var mysql = require('sails-mysql');

var await = sync.await;
var defer = sync.defer;
var fiber = sync.fiber;

module.exports = {

	search: function(req, res) {

		req.validate({
			'keyword': 'string',
			'nearby': 'string'
		});

		var keywordQuery = Keyword.find({
			keywords: {
				'contains': req.param('keyword')
			}
		});
		var businessQuery = Business.find({
			name: {
				'contains': req.param('keyword')
			}
		});

		try {

			fiber(function() {

				var keywords = await (keywordQuery.exec(defer()));

				var b = [];

				for (var i = 0; i < keywords.length; i++) {

					var sb = Business.findOne(keywords[i].owner);

					b.push(await (sb.exec(defer())));

				}

				var business = await (businessQuery.exec(defer()));

				b = b.concat(business);

				b = _.uniqBy(b, 'id');

				for (var i = 0; i < b.length; i++) {

					if (req.param('nearby') == 1) {

						var d = {
							distance: haversine({
								latitude: b[i].lat,
								longitude: b[i].lng
							}, {
								latitude: req.param('lat'),
								longitude: req.param('lng')
							})
						};

						b[i] = _.assign(b[i], d);

					}

				}

				b = _.sortBy(b, ['distance', 'name']);

				return res.send({
					status: 1,
					message: "Business Searched successfully",
					data: b
				});

			});

		} catch (err) {

			return res.negotiate(err);
		}

	},

	discover: function(req, res) {

		req.validate({
			'lat': 'string',
			'lng': 'string'
		});

		Business.find().exec(function(err, b) {

			if (err) return res.negotiate(err);

			for (var i = 0; i < b.length; i++) {

				var d = {
					distance: haversine({
						latitude: b[i].lat,
						longitude: b[i].lng
					}, {
						latitude: req.param('lat'),
						longitude: req.param('lng')
					})
				};

				b[i] = _.assign(b[i], d);

			}

			b = _.sortBy(b, ['distance', 'name']);


			if (b.length > 10) {

				b = _.slice(b, 0, 10);

			}

			return res.send({
				status:1,
                                message: "Success",
                                data: b
			});

		});

	},

	events: function(req, res) {

		req.validate({
			'lat': 'string',
			'lng': 'string'
		});

		Business.find().populateAll().exec(function(err, b) {

			if (err) return res.negotiate(err);

			for (var i = 0; i < b.length; i++) {

				var d = {
					distance: haversine({
						latitude: b[i].lat,
						longitude: b[i].lng
					}, {
						latitude: req.param(0),
						longitude: req.param(0)
					})
				};

				b[i] = _.assign(b[i], d);

			}

			b = _.sortBy(b, ['distance', 'name']);

			var e = [];

			for (var j = 0; j < b.length; j++) {

				var events = b[j].events;

				for (var k = 0; k < events.length; k++) {

					events[k] = _.assign(events[k], b[j].d);

				}

				e = _.concat(e, events);

			}

			e = _.sampleSize(e, 10);

			return res.send({
				status:1,
                                message: "Success",
                                data: e
			});

		});

	},

	getUserBusiness: function(req, res) {

		req.validate({
			'user_id': 'string'
		});

		Business.find({user:req.param('user_id')})
			.exec(function(err, businesses) {

				if (err) return res.negotiate(err);

				return res.send({
					status:1,
                                	message: "Success",
                                	data: businesses
				});

			});

	},

	getBusiness: function(req, res) {

		 req.validate({
		 	'id': 'string'
		 });

		Business.findOne(req.param('id'))
			.populateAll()
			.exec(function(err, business) {

				if (err) return res.negotiate(err);

				return res.send({
					status:1,
                    			message: "Success",
                    			data: business
				});

			});

	},

	addBusiness: function(req, res) {

        req.validate({
            'name': 'string',
            'building': 'string',
            'street': 'string',
            'area': 'string',
            'city': 'string',
            'locationName': 'string',
            'lat': 'string',
            'lng': 'string'

        });

        var id = req.param("user_id");
        var name = req.param("name");
	var building = req.param("building");
	var street = req.param("street");
        var area = req.param("area");
        var city = req.param("city");
        var locationName = req.param("locationName");
        var lat = req.param("lat");
	var lng = req.param("lng");


        Business.create(
        {
            name    : name,
            building: building,
            street : street,
            area: area,
            city    : city,
            locationName: locationName,
            lat: lat,
            lng: lng,
	    user:id
        }).exec(function(err, business) {

         	if(err) {
                res.status(err.status).send({
                    status: 0,
                    message: err.summary,
                    data: err
                });
		return;
            	}

		CategoryService.addDefaultCategories(business.id);

                res.status(200).send({
                    status: 1,
                    message: "Added succesfully",
                    data: business
                });
        });
	},

	updateBusiness: function(req, res) {

        req.validate({
	    'business_id': 'string',
            'name': 'string',
            'building': 'string',
            'street': 'string',
            'area': 'string',
            'city': 'string',
            'locationName': 'string',
            'lat': 'string',
            'lng': 'string'

        });
	var id = req.param("business_id");
        var name = req.param("name");
	var building = req.param("building");
	var street = req.param("street");
        var area = req.param("area");
        var city = req.param("city");
        var locationName = req.param("locationName");
        var lat = req.param("lat");
	var lng = req.param("lng");


        Business.update({id: parseInt(id)},
        {
            name    : name,
            building: building,
            street : street,
            area: area,
            city    : city,
            locationName: locationName,
            lat: lat,
            lng: lng
        }).exec(function(err, updated) {

         	if(err) {
                res.status(err.status).send({
                    status: 0,
                    message: err.summary,
                    data: err
                });
            } else if(updated === undefined) {
                // Business not found
                res.status(404).send({
                    status: 0,
                    message: 'Business not found'
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

	deactivateAccount: function(req, res) {

		req.validate({
			'business_id': 'string',
		});

		Business.update({
			id: req.param('id')
		}, {
			"active": false
		}).exec(function(err, updated) {

			if (err) return res.negotiate(err);

			return res.send({
					status:1,
                                        message: "Success",
                                        data: updated
			});

		});

	},

	reactivateAccount: function(req, res) {

		req.validate({
			'business_id': 'string',
		});

		Business.update({
			id: req.param('id')
		}, {
			"active": true
		}).exec(function(err, updated) {

			if (err) return res.negotiate(err);

			return res.send({
					status:1,
                                        message: "Success",
                                        data: updated
			});

		});

	},

	deleteBusiness: function(req, res) {

		req.validate({
			'business_id': 'string',
		});

		Business.findOne(req.param('business_id'))
			.populateAll()
			.exec(function(err, business) {

				if (err) return res.negotiate(err);

				if (!business) return res.notFound();

				try {

					fiber(function() {

						var delBusiness = Business.destroy(business.id);
						var delUser = User.destroy(business.user);

						// TODO: Delete the other ones
						await (delBusiness.exec(defer()));
						await (delUser.exec(defer()));

						return res.send({
							"message": "Deleted successfully"
						});

					});

				} catch (err) {

					return res.negotiate(err);

				}

				// delete categories

				// delete content

				// delete events

				// delete user

				// delete keywords

				// delete Pyament methods

				// delete social media

				// delete contacts

				// delete Working hours

			});

	},

	uploadLogo: function(req, res) {

		var id = req.param('business_id');

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

				Business.update(id, {
					logoUrl: require('util').format('%s/business/logo/%s', sails.getBaseUrl(), id),
					logoFd: uploadedFiles[0].fd,
					//name: "Skye"

				}).exec(function(err) {

					if (err) return res.negotiate(err);

					var url = require('util').format('%s/business/logo/%s', sails.getBaseUrl(), id);

					return res.send({
						status: 1,
						url: url
					});
				});
			}
		});
	},

	uploadBanner: function(req, res) {
		//console.log(req);
		var id = req.param('business_id');

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

				Business.update(id, {
					bannerUrl: require('util').format('%s/business/banner/%s', sails.getBaseUrl(), id),
					bannerFd: uploadedFiles[0].fd

				}).exec(function(err) {

					if (err) return res.negotiate(err);

					var url = require('util').format('%s/business/banner/%s', sails.getBaseUrl(), id);

					return res.send({
						status: 1,
						url: url
					});
				});
			}
		});
	},

	logo: function(req, res) {

		req.validate({
			id: 'string'
		});

		Business.findOne(req.param('id')).exec(function(err, business) {
			if (err) return res.negotiate(err);
			if (!business) return res.notFound();

			if (!business.logoFd) {
				return res.notFound();
			}

			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk();

			fileAdapter.read(business.logoFd)
				.on('error', function(err) {
					return res.serverError(err);
				})
				.pipe(res);
		});
	},

	banner: function(req, res) {

		req.validate({
			id: 'string'
		});

		Business.findOne(req.param('id')).exec(function(err, business) {
			if (err) return res.negotiate(err);
			if (!business) return res.notFound();

			if (!business.bannerFd) {
				return res.notFound();
			}

			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk();

			fileAdapter.read(business.bannerFd)
				.on('error', function(err) {
					return res.serverError(err);
				})
				.pipe(res);
		});
	}
};
