
var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();
var azure = require("azure");

/* GET users listing. */
router.get('/', function(req, res, next) {
 
  	var serviceBusService = azure.createServiceBusService(process.env.AZURE_SERVICE_ENDPOINT);
  	var message = {
    body: 'take photo',
    customProperties: {
        messagetype: 0
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
	    	if (err) send(req,res,err,500);
	    	//clearInterval(interval);
	    }



	  	

	  

});


});

module.exports = router;
