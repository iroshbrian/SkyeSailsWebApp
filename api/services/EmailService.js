// EmailService.js - in api/services
module.exports = {

	sendConfirmationEmail: function(name, email, token) {

		sails.hooks.email.send(
			"main", {
				recipientName: name,
				senderName: "Skye App",
				link: sails.getBaseUrl() + "/confirm/" + email + "/" + token
			}, {
				to: email,
				subject: "New account created at Skye app"
			},
			function(err) {
				console.log(err || "It worked!");
			}
		);

	}
};