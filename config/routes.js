/**
 * Route Mappings
 * (sails.config.routes)
 */

module.exports.routes = {

	'/': {
		view: 'homepage'
	},

	// '/index': {
	// 	view: 'index'
	// },

	'/index': {
	 	view: 'index',
	    locals: {
	      layout: 'index'
	    }
	},


	//Business
	'post /business/upload/logo': 'BusinessController.uploadLogo',
	'post /business/upload/banner': 'BusinessController.uploadBanner',
	'get /business/logo/:id': 'BusinessController.logo',
	'get /business/banner/:id': 'BusinessController.banner',
	'post /business/:id': 'BusinessController.getBusiness',

	'post /business/user/:user_id': 'BusinessController.getUserBusiness',

	'post /business/update/:id': 'BusinessController.updateBusiness',
	'post /business/add/:user_id': 'BusinessController.addBusiness',
	'post /search': 'BusinessController.search',
	'post /discover': 'BusinessController.discover',
	'post /events': 'BusinessController.events',



	// 'post /deleteAccount/:business_id': 'BusinessController.deleteAccount',
	'post /deleteAccount/:business_id': 'BusinessController.deleteBusiness',
	'post /business/deactivate/:business_id': 'BusinessController.deactivateAccount',
	'post /business/reactivate/:busines_id': 'BusinessController.reactivateAccount',

	// User management
	//'get /signin': 'UserController.signin',

	'get /signin': 'UserController.signin', 
	//'post /register': 'UserController.register',
	//'/confirm/:email/:id': 'UserController.confirmAccount',
	//'post /login': 'UserController.login',
	// 'post /logout': 'UserController.logout', //Deprecated route, this will be done from the client side
	'post /changePwd/:user_id': 'UserController.changePwd',
	'post /deleteUserAccount/:user_id': 'UserController.deleteAccount',


	// Keyword management
	'post /keywords/add/:business_id': 'KeywordController.add',
	'post /keywords/get/:id': 'KeywordController.get',
	'post /keywords/getall/:business_id': 'KeywordController.getall',
	'post /keywords/update/:id': 'KeywordController.update',
	'post /keywords/delete/:id': 'KeywordController.delete',

	// Categories
	'post /category/add': 'CategoryController.addCategory',
	'post /category/get': 'CategoryController.getCategory',
	'post /categories/get': 'CategoryController.getCategories',
	'post /categories/get/active': 'CategoryController.getActiveCategories',
	'post /category/update': 'CategoryController.updateCategory',
	'post /category/delete': 'CategoryController.deleteCategory',
	'post /category/updatelayout/:id': 'CategoryController.updateCategoryLayout',
	'post /category/swap/:from/:to' : 'CategoryController.swap',

	// Category content
	'post /category/content/add/content': 'ContentController.addContent',
	'post /category/content/add/image_content': 'ContentController.addImageContent',
	//'post /category/content/add/image_tag': 'ContentController.addImageTag',
	'post /category/content/update/content': 'ContentController.updateContent',
	'post /category/content/update/image_content': 'ContentController.updateImageContent',
	'post /category/content/update/no_image_content': 'ContentController.updateContentNoImage',
	//'post /category/content/update/image_tag': 'ContentController.updateImageTag',
	'post /category/content/delete': 'ContentController.deleteContent',
	'get /content/image/:id': 'ContentController.image',
	'post /content/swap/:from/:to': 'ContentController.swap',

	// Social media
	'post /social/getavailable/:business_id': 'SocialMediaController.getAvailable',
	'post /social/getall/:business_id': 'SocialMediaController.getavailableMerged',
	'post /social/add/:business_id': 'SocialMediaController.add',
	'post /social/update/:id': 'SocialMediaController.update',
	'post /social/delete/:business_id/:type_id': 'SocialMediaController.delete',

	// Payment methods
	'post /paymentmethod/getavailable/:business_id': 'PaymentMethodController.getAvailable',
	'post /paymentmethod/getall/:business_id': 'PaymentMethodController.getAvailableMerged',
	'post /paymentmethod/add/:business_id': 'PaymentMethodController.add',
	 'post /paymentmethod/getalluser/:business_id': 'PaymentMethod.getallUserPaymentMethods',
	'post /paymentmethod/update/:id': 'PaymentMethodController.update',
	'post /paymentmethod/delete/:business_id/:type_id': 'PaymentMethodController.delete',

	// Events management
	'post /event/add': 'EventController.add',
	'post /event/add_no_banner': 'EventController.addNoBanner',
	'post /event/get/:id': 'EventController.get',
	'post /event/getall/:business_id': 'EventController.getall',
	'post /event/update/:id': 'EventController.update',
	'post /event/update_no_banner/:id': 'EventController.updateNoBanner',
	'post /event/delete/:id': 'EventController.delete',
	'get /event/image/:id': 'EventController.image',
	'post /event/get/active/:business_id': 'EventController.getActiveEvents',
	'post /event/get/featured/:business_id': 'EventController.getFeaturedEvents',

	//Business and Event Categories
	'post /businesscategory/add': 'BusinessCategoryController.add',
	'post /businesscategory/getall': 'BusinessCategoryController.getall',
	'post /businesscategory/getOne': 'BusinessCategoryController.getOne',
	'post /eventcategory/add': 'EventCategoryController.add',
    'post /eventcategory/getall': 'EventCategoryController.getall',
    'post /eventcategory/getOne': 'EventCategoryController.getOne',

	// Working hours management
	'post /working_hours/add/:business_id': 'WorkingHoursController.add',
	'post /working_hours/get/:business_id': 'WorkingHoursController.get',
	'post /working_hours/update/:business_id': 'WorkingHoursController.update',

	// Contacts
	'post /contact/add/:business_id': 'ContactController.add',
	'post /contact/:id': 'ContactController.get',
	'post /contact/getall/:business_id': 'ContactController.getall',
	'post /contact/update/:id': 'ContactController.update',
	'post /contact/delete/:id': 'ContactController.delete',


	'get /twitter/trends/:id': 'TwitterController.trends',

};
