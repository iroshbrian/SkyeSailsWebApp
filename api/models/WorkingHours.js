/**
 * WorkingHours.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		mon: {
			type: 'string',
			required: false,
			defaultsTo: ""
		},

		tue: {
			type: 'string',
			required: false,
			defaultsTo : ""
		},

		wed: {
			type: 'string',
			required: false,
			defaultsTo : ""
		},

		thur: {
			type: 'string',
			required: false,
			defaultsTo : ""
		},

		fri: {
			type: 'string',
			required: false,
			defaultsTo : ""
		},

		sat: {
			type: 'string',
			required: false,
			defaultsTo : ""
		},

		sun: {
			type: 'string',
			required: false,
			defaultsTo : ""
		},

		owner: {
			model: 'business',
			unique: false
		}
	}
};
