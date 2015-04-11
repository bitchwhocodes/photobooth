
var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();
var azure = require("azure");
var uuid = require('node-uuid');
/* GET users listing. */
router.get('/', function(req, res, next) {
 

 	var uniqueId = uuid.v4();
 	var msg = 'take photo '+uniqueId;
  	var serviceBusService = azure.createServiceBusService(process.env.AZURE_SERVICE_ENDPOINT);
  	var message = {
    body: 'take photo',
    customProperties: {
        messagetype: 0,
        unique:uniqueId
	    }
	}

	 serviceBusService.sendTopicMessage('photos', message, function(error) {
      if (error) {
        console.log(error);
      }
    });

	 
	

	  	serviceBusService.receiveSubscriptionMessage('photos', 'AllMessages', { isPeekLock: true }, function(error, lockedMessage){
	    if(!error){
	   
	    	if(lockedMessage.customProperties.messagetype =='1')
	    	{
	    		var objToJSON ={};
	    		var blobSvc = azure.createBlobService(process.env.AZURE_BLOB_NAME,process.env.AZURE_BLOB_ENDPOINT);
	    		var containerName = 'images';
	    		var hostName = 'https://nasaphotobooth.blob.core.windows.net';
				var url = blobSvc.getUrl(containerName, lockedMessage.body, null, hostName);
	    		objToJSON.result = url;
				objToJSON.error = error;
				 res.writeHead(200, {"Content-Type": "application/json"});
				 res.write(JSON.stringify(objToJSON));
				 res.end();
				 
	    	
	    	}
	    	//clearInterval(interval);
	        
	    	
       		
	    }else{
	    	if (error) {
	    		var objToJSON ={};
	    		objToJSON.result = error;
				objToJSON.error = true;
	    		res.writeHead(200, {"Content-Type": "application/json"});
				 res.write(JSON.stringify(objToJSON));
				 res.end();
	    		console.log(error);
	    	}
	    	//clearInterval(interval);
	    }



	  	

	  

});


});

module.exports = router;
