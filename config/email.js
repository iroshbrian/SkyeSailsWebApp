module.exports.email = {

	service: 'Gmail',
	auth: {
		user: 'myemailaddress@gmail.com',
		pass: 'mypassword'
	},

	transporter: {
		host: 'root.server-ke138.com',
		port: 465,
		secure: true,
		auth: {
			user: 'noreply@skye-app.com',
			pass: 'asdfg!@#$%'
		},
		from: 'noreply@skye-app.com',
		tls: {
			rejectUnauthorized: false
		},
		debug: true
	},
	testMode: false
}