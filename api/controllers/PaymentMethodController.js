var sync = require('synchronize');
var _ = require('lodash');

var await = sync.await;
var defer = sync.defer;
var fiber = sync.fiber;

module.exports = {

 getAvailable: function(req, res) {
	 var id=req.param('business_id');
  PaymentMethod.find({owner : id}).exec(function(err, methods) {

     if (err) return res.negotiate(err);

     return res.send({
        status: 1,
        message: "Fetched successfully",
        data: methods
     });

  });

 },

 getAvailableMerged: function(req, res) {

  req.validate({
   'business_id': 'string'
  });

  try {

   fiber(function() {

    var availQuery = PaymentMethod.find();
    var userQuery = PaymentMethodAssoc.find({
     owner: req.param('business_id')
    });

    var avail = await (availQuery.exec(defer()));
    var user = await (userQuery.exec(defer()));

    for (var i = 0; i < avail.length; i++) {

     var j = 0
     for (; j < user.length; j++) {

      if (avail[i].id == user[j].type) {

       avail[i].active = true;
       avail[i].value = user[j].value;
       break;

      }

     }

     if(j == user.length) {
      avail[i].active = false;
     }

    }

    return res.send({
      status: 1,
      message: "successful",
      data: avail

    });

   });

  } catch (err) {

   return res.negotiate(err);

  }
 },

 getallUserPaymentMethods: function(req, res) {


  req.validate({
   'business_id': 'string'
  });

  PaymentMethodAssoc.find({
   owner: req.param('business_id')
  }).exec(function(err, methods) {

   if (err) return res.negotiate(err);

   return res.send({
      status: 1,
      message: "Created successfully",
      data: methods

   });

  });

 },

 add: function(req, res) {

  req.validate([{
   'id': 'string',
   'business_id': 'string',
   'value': 'string'
  }]);

  var method = [{
   value: req.param('value'),
   type: req.param('id'),
   owner: req.param('business_id')
  }];

  PaymentMethodAssoc.create({method}).exec(function(err, created) {

   if (err) return res.negotiate(err);

   return res.send({
      status: 1,
      message: "Created successfully",
      data: created
   });

  });

 },

 update: function(req, res) {

var active = req.param('active')=="1" ? true : false;

console.log(req);

  PaymentMethod.update({id: req.param('id')}, 
{
   active: active,
  value : req.param('value')
}).exec(function(err, updated) {

   if (err) return res.negotiate(err);

   return res.send({
        status: 1,
        message: "Created successfully",
        data: updated

   });

  });

 },
 delete: function(req, res) {

  req.validate({
   business_id: 'string',
   type_id: 'string'
  });

  PaymentMethodAssoc.destroy({
   type: req.param('type_id'),
   owner: req.param('business_id'),
   value: req.param('value')
  }).exec(function(err) {

   if (err) return res.negotiate(err);

   return res.send({
    status: 1,
    message: "Method deleted succesfully",
    deleted: true
   });
  });
 }

};
