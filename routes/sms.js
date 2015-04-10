var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();

var twilio = require('twilio');


/* GET users listing. */
router.get('/', function(req, res, next) {



	var cellnumber = req.query.cell;
	var msg ='';
	var image = req.query.image;
	var responseItem = {};
	

var client = new twilio.RestClient(process.env.TWILIO_ID, process.env.TWILIO_PASS);
 
// Pass in parameters to the REST API using an object literal notation. The
// REST client will handle authentication and response serialzation for you.
var msg = 'Hi from the Photobooth. Here is your photo '+image;
client.sms.messages.create({
    to:cellnumber,
    from:process.env.TWILIO_NUMBER,
    body:msg
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
         
		responseItem.error = false;
		responseItem.result = "Thank you!";
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify(responseItem));
		res.end();
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');

        
		responseItem.error = true;

		responseItem.result = error;
		res.writeHead(200, {"Content-Type": "application/json"});
		res.write(JSON.stringify(responseItem));
		res.end();

    }
});

});

module.exports = router;




// Load the twilio module

 
// Create a new REST API client to make authenticated requests against the
// twilio back end

