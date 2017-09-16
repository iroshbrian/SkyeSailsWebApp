/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		name: {
			type: 'string',
			required: true
		},

		featured: {
	          type: 'boolean',
	          defaultsTo : false
	        },

	        enabled: {
	          type: 'boolean',
	          defaultsTo: false
	        },

	        type: {
	          type: 'string',
	          enum: ['sponsored', 'custom'],
	          defaultsTo: 'custom'
	        },

		cost: {
			type: 'string',
			required: true,
			defaultsTo: 0
		},

		lat: {
			type: 'float',
			required: true,
			defaultsTo: 0.0
		},

		lng: {
			type: 'float',
			required: true,
			defaultsTo: 0.0
		},

		datetime: {
			type: 'string',
			required: true,
			defaultsTo: ""
		},

		description: {
			type: 'string',
			defaultsTo: ""
		},

		category: {
			model: 'eventCategory'
		},

		imageUrl: {
			type: 'string',
			defaultsTo: ""
		},

		imageFd: {
			type: 'string',
			defaultsTo: ""
		},

		owner: {
			model: 'business'
		}
	}
};

