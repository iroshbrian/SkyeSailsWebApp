var bcrypt = require('bcrypt');

module.exports = {

	attributes: {
               display_name : {
			type:'string',
			required:true
		},

		photo : {
			type:'string',
			required : true
		},

		email: {
			type: 'email',
			required: true,
			unique: true
		},

		pwd: {
			type: 'string',
			required: false,
		},

		role: {
			type: 'string',
			enum: ['administrator', 'business'],
			defaultsTo: 'business'
		},

		active: {
			type: 'boolean',
			defaultsTo: false
		},
		/* relationships */
		//business: {
		//	model: 'business',
		//	unique: true
		//},


		details: {
			collection: 'business',
			via: 'user'
		}
	},
	/**
	 * Hash password before saving
	 */
	beforeCreate: function(values, cb) {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(values.pwd, salt, function(err, hash) {
				if (err) {
					cb(err);
				} else {
					values.pwd = hash;
					cb(null, values);
				}
			});
		});
	}
};
