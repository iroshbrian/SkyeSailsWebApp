				/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var GoogleAuth = require('google-auth-library');

module.exports = {
/**
 * Register new user
 */
	signin: function(req, res) {

        req.validate({
                'token': 'string'
        });

        var token = req.param('token');
        var auth = new GoogleAuth;
		var client = new auth.OAuth2('492515439762-mo3vnbd3dqfia5kt36lt25cqf6hj43rb.apps.googleusercontent.com', '', '');

		client.verifyIdToken(
            token,
            '492515439762-mo3vnbd3dqfia5kt36lt25cqf6hj43rb.apps.googleusercontent.com',
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
            function(e, login) {
	            var payload = login.getPayload();
	            var userid = payload['sub'];
	              // If request specified a G Suite domain:
	              //var domain = payload['hd'];

	            var userEmail=payload['email'];


	            var userToFind = {
	              email:userEmail
	            };

	            var userToCreate = {
	              email : userEmail,
	              photo : payload['picture'],
	              display_name:payload['name'],
	              pwd : "Skye",
	              role : "administrator",
	              active : true
	            };

	            var business = {
	            	name: req.param('name'),
					lat: req.param('lat'),
					lng: req.param('lng'),
					locationName: req.param("locationName"),
					building: req.param('building'),
                	street: req.param('street'),
                	area: req.param('area'),
                	city: req.param('city')
	            };

	            User.findOrCreate(userToFind,userToCreate).exec(function (err, x) {

	             	if(err){
	                	res.status(err.status).send({
	                        status:0,
	                        message:err.summary,
	                        error:err
	                    });
	                    return;
	            	}

	                //business.user=x.id;

	                //Business.findOne(business).exec(function(err,y){ 

		        //        if(err){
		        //            res.status(err.status).send({
			//                    status:0,
			//                    message:err.summary,
			//                    error:err
		        //    		});
		        //        	return;
                    	//}

                        //if(!y){
                        //    Business.create(business).exec(function(err, y) {

                        //    	console.log(y);

	                //             if (err) {
	                //                res.status(err.status).send({
	                //                    status: 0,
	                //                    message: err.summary,
	                //                    error: err
	                //                });
	                //                return;
	                //            }

	                //            CategoryService.addDefaultCategories(y.id);

	                //            res.status(200).send({
	                //                status: 1,
	                //                message: 'user registered',
	                //                user: x,
	                //                business: y
	                //        	});
	                //    	});
	                //    	return;
                        //}

                        //console.log("business", err, y);

                    	return res.send({
							status: 1,
							message: 'login successful',
							user: x
						});


						//console.log("business", err, y);

                    		//});

                	});
			}

		);

	},


	/**
	 * Logout user
	 */
	logout: function(req, res) {
		req.logout();
		res.send('logout successful');
	},

	/**
	 * Recover password
	 */
	recoverPwd: function(req, res) {

	},

	/**
	 * Change password
	 */
	changePwd: function(req, res) {

	},

	/**
	 * Delete account
	 */
	deleteAccount: function(req, res) {

	}

};

// Overrides
module.exports.blueprints = {
	actions: true,
	rest: true,
	shortcuts: true
};








