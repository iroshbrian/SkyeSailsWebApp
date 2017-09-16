var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bcrypt = require('bcrypt');

//helper functions
function findById(id, fn) {
	User.findOne(id).exec(function(err, user) {
		if (err) {
			return fn(null, null);
		} else {
			return fn(null, user);
		}
	});
}

function findByEmail(u, fn) {
	User.findOne({
		email: u
	}).exec(function(err, user) {
		// Error handling
		if (err) {
			return fn(null, null);
			// The User was found successfully!
		} else {
			return fn(null, user);
		}
	});
}

// Passport session setup.
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	findById(id, function(err, user) {
		done(err, user);
	});
});

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'pwd'
	},
	function(email, pwd, done) {
		// asynchronous verification, for effect...
		process.nextTick(function() {
			// Find the user by email. If there is no user with the given
			// email, or the pwd is not correct, set the user to `false` to
			// indicate failure and set a flash message. Otherwise, return the
			// authenticated `user`.
			findByEmail(email, function(err, user) {
				if (err)
					return done(null, err);

				if (!user) {
					return done(null, false, {
						message: 'Unknown user ' + email
					});
				}

				console.dir(user);

				/*if(!user.active) {
					return done(null, false, {
						message: 'User account not activated',
					})
				}*/

				bcrypt.compare(pwd, user.pwd, function(err, res) {
					if (!res)
						return done(null, false, {
							message: 'Invalid Password'
						});

					var returnUser = {
						email: user.email,
						createdAt: user.createdAt,
						id: user.id
					};
					return done(null, returnUser, {
						message: 'Logged In Successfully'
					});
				});
			})
		});
	}
));