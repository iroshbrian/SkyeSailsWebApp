/**
 * Contact.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		//value: {
		//	type: 'string',
		//	required: true
		//},
		mobileNo: {
			type: 'string',
			defaultsTo: ""
		},

		mobileNoTwo: {
			type: 'string',
                        defaultsTo: ""
		},

		landlineNo: {
			type: 'string',
			defaultsTo: ""
		},
		landlineNoTwo: {
			type: 'string',
                        defaultsTo: ""
		},

		tollFreeNo: {
			type: 'string',
			defaultsTo: ""
		},

		email: {
			type: 'string',
			defaultsTo: ""
		},

		website: {
			type: 'string',
			defaultsTo: ""
		},

		owner: {
			model: 'business'
		}
	}
};
