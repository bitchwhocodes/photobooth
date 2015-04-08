
var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();
var azure = require("azure");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.writeHead(200, {"Content-Type": "application/json"});
  	var serviceBusService = azure.createServiceBusService(process.env.AZURE_SERVICE_ENDPOINT);
  	var message = {
    body: 'take photo stacey',
    customProperties: {
        messagenumber: 0
	    }
	}

	 serviceBusService.sendTopicMessage('photos', message, function(error) {
      if (error) {
        console.log(error);
      }
    });

	 var counter = 0;

	  	serviceBusService.receiveSubscriptionMessage('photos', 'AllMessages', { isPeekLock: true }, function(error, lockedMessage){
	    if(!error){
	    	
	    	//clearInterval(interval);
	    
	    	var objToJSON ={};
	    	objToJSON.result = lockedMessage;
			objToJSON.error = error;
			res.write(JSON.stringify(objToJSON));
	    	
       		
	    }else{
	    	console.log(error);
	    	//clearInterval(interval);
	    }

	    /*
	 var interval = setInterval( function() {
	 	 	serviceBusService.receiveSubscriptionMessage('photos', 'AllMessages', { isPeekLock: true }, function(error, lockedMessage){
	    if(!error){
	    	
	    	clearInterval(interval);
	    
	    	var objToJSON ={};
	    	objToJSON.result = lockedMessage;
			objToJSON.error = error;
			
			res.write(JSON.stringify(objToJSON));
	    	
       		
	    }else{
	    	console.log(error);
	    	clearInterval(interval);
	    }
	 

	    console.log(interval);
	    console.log("shit stacey"+(counter++))
	  
	     
	}, 5000);

*/


	  	

	  

});


});

module.exports = router;
