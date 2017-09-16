/**
 * Content.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		title: {
			type: 'string',
			required: true
		},

		type: {
			type: 'string',
			enum: ['text', 'textimage'],
			required: true,
			defaultsTo: 'text'
		},

		content: {
			type: 'longtext',
			defaultsTo: ""
		},

		order: {
			type: 'integer',
			defaultsTo: 0
		},

		imageUrl: {
			type: 'string',
			defaultsTo: ""
		},

		imageFd: {
			type: 'string'
		},

		belongsTo: {
			model: 'category'
		},

		owner: {
			model: 'business'
		}
	}
};
