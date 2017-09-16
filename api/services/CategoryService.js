// CategoryService.js - in api/services
module.exports = {

	addDefaultCategories: function(id) {

		/** Default categories */
		var workingHours = {
			name: 'Working Hours',
			type: 'default',
			enabled: true,
			owner: id
		};

		var contactUs = {
			name: 'Contact Us',
			type: 'default',
			enabled: true,
			owner: id
		};

		var paymentOptions = {
			name: 'Payment Options',
			type: 'default',
			enabled: true,
			owner: id
		};

		Category.create(workingHours).exec(function(err, response) {});
		Category.create(contactUs).exec(function(err, response) {});
		Category.create(paymentOptions).exec(function(err, response) {});

		/** Default social media */
		var facebook = {
			name: 'Facebook',
			imageUrl: 'http://95.85.10.198:8123/png/40px/facebook.png',
			owner: id
		};

		var twitter = {
			name: 'Twitter',
			imageUrl: 'http://95.85.10.198:8123/png/40px/twitter.png',
			owner: id
		};

		var ig = {
			name: 'Instagram',
			imageUrl: 'http://95.85.10.198:8123/png/40px/instagram.png',
			owner: id
		};

		var youtube = {
			name: 'YouTube',
			imageUrl: 'http://95.85.10.198:8123/png/40px/youtube.png',
			owner: id
		};

		SocialMedia.create(facebook).exec(function(err) {});
		SocialMedia.create(twitter).exec(function(err) {});
		SocialMedia.create(ig).exec(function(err) {});
		SocialMedia.create(youtube).exec(function(err) {});


		/** Default Payment Methods **/
		var mpesa = {
			name: 'Mpesa',
			imageUrl: '',
			owner: id
		};

		var airtelMoney = {
			name: 'Airtel Money',
			imageUrl: '',
			owner: id
		};

		var visa = {
			name: 'Visa',
			imageUrl: 'http://95.85.10.198:8123/images/visa.png',
			owner: id
		};

		var masterCard = {
			name: 'Master Card',
			imageUrl: 'http://95.85.10.198:8123/images/master_card.png',
			owner: id
		};

		var paypal = {
			name: 'Paypal',
			imageUrl: 'http://95.85.10.198:8123/images/paypal.png',
			owner: id
		};
		 var americanExpress = {
                        name: 'American Express',
			imgUrl: '',
			owner: id
                };


		PaymentMethod.create(mpesa).exec(function(err, created) {});
		PaymentMethod.create(airtelMoney).exec(function(err, created) {});
		PaymentMethod.create(visa).exec(function(err, created) {});
		PaymentMethod.create(masterCard).exec(function(err, created) {});
		PaymentMethod.create(paypal).exec(function(err, created) {});
		PaymentMethod.create(americanExpress).exec(function(err, created) {});

		var working = {
			owner: id
		};

		WorkingHours.create(working).exec(function(err,created){});

		var contact = {
			owner: id
		}

		Contact.create(contact).exec(function(err,created){});
	}
};
