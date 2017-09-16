/**
 * PaymentMethod.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		name: {
			type: 'string',
			required: true,
			unique:false
		},

		imageUrl: {
			type: 'string',
			defaultsTo: ""
		},
		active : {
			type: 'boolean',
			defaultsTo:false
		},
                value : {
			type : 'string',
			defaultsTo : ''
		},
		owner : {
			model : 'business'
		}
	}
};
