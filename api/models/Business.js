/**
 * BusinessDetails.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		//id: {
		//	type: 'integer',
		//	primaryKey: true,
		//	autoIncrement: true
		//},
		name: {
			type: 'string',
			required: false,
			defaultsTo: ""
		},

		building: {
			type: 'string',
			defaultsTo: ""
		},

		street: {
			type: 'string',
			defaultsTo: ""
		},

		area: {
			type: 'string',
			defaultsTo: ""
		},

		city: {
			type: 'string',
			defaultsTo: ""
		},

		lat: {
			type: 'float',
			required: false,
			defaultsTo: 0.0
		},

		lng: {
			type: 'float',
			required: false,
			defaultsTo: 0.0
		},

		locationName: {
			type: 'string',
			defaultsTo: ""
		},

		logoUrl: {
			type: 'string',
			defaultsTo: ""
		},

		logoFd: {
			type: 'string',
			defaultsTo: ""
		},

		bannerUrl: {
			type: 'string',
			defaultsTo: ""
		},

		bannerFd: {
			type: 'string',
			defaultsTo: ""
		},

		category: {
			model: 'businessCategory'
		},

		active: {
			type: 'boolean',
			defaultsTo: true
		},

		/* relationships */
		user: {
			model: 'user',
			unique: false
		},

		// categories
		categories: {
			collection: 'category',
			via: 'owner'
		},

		// Keywords
		keywords: {
			collection: 'keyword',
			via: 'owner'
		},

		// social media
		socialMedia: {
			collection: 'socialMedia',
			via: 'owner'
		},

		// Events
		events: {
			collection: 'event',
			via: 'owner'
		},

		// Working hours
		workingHours: {
			collection: 'workingHours',
			via: 'owner'
		},

		// contact details
		contact: {
			collection: 'contact',
			via: 'owner'
		},

		paymentMethods: {
			collection: 'paymentMethod',
			via: 'owner'
		}
	}
};

