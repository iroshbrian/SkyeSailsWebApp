/**
 * SocialMedia.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {

		name: {
			type: 'string',
			required: true,
			unique: false
		},

		imageUrl: {
			type: 'string',
			required: false
		},

		hint: {
			type: 'string',
			required: false
		},
		// relationship
  		owner: {
  			model: 'business'
  		}
	}
};
