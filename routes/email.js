var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();

var sendgrid = require('sendgrid')(process.env.SENDGRID_USER,process.env.SENDGRID_PASS);
	
/* GET users listing. */
router.get('/', function(req, res, next) {

	var toAddress = req.query.email;
     
	var image = req.query.image;
	console.log("image"+image);
	

	var msg = "Hi There! Here is your photo from the photobooth at Nasa Space Apps in the Microsoft NY office. Click here to get it :"+image+ ". Thank you!";
	console.log("message "+msg);
	var email = new sendgrid.Email({
	    to: toAddress,
	    from: 'donotreply@spaceissoawesome.com',
	    subject: 'Your Photo',
	    text: msg
});

	sendgrid.send(email, function(err, json){
		if(err){
			
			 res.writeHead(200, {"Content-Type": "application/json"});
			 var obj ={}
			 obj.error = true;
			 obj.result = false;
			 res.writeHead(200, {"Content-Type": "application/json"});
			 res.write(JSON.stringify(obj));
			 res.end();
		}else{
			 res.writeHead(200, {"Content-Type": "application/json"});
			 res.write(JSON.stringify(json));
			 res.end();
		}
    
	});

});

module.exports = router;

