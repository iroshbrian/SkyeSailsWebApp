/**
 * Category.js
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

    type: {
      type: 'string',
      enum: ['default', 'custom'],
      defaultsTo: 'custom'
    },

    enabled: {
      type: 'boolean',
      defaultsTo: true
    },

    layout: {
      type: 'string',
      enum: ['list', 'grid'],
      defaultsTo: 'list',
      required: true
    },

    order: {
      type: 'integer',
      defaultsTo: 0
    },

  	// relationship
  	owner: {
  		model: 'business'
  	},

  	// category contains content
  	content: {
  		collection: 'content',
  		via: 'belongsTo'
  	}
  }
};

