/**
 * PaymentMethodAssoc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		type: {
			model: 'paymentMethod',
			required: true
		},

		owner: {
			model: 'business',
			required: true
		},

		value: {
			type: 'string',
			required: true,
			defaultsTo: ""
		}
	}
};
