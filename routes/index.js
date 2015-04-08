var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();
var azure = require('azure');
var azures = require('azure-storage');

/* GET home page. */
router.get('/', function(req, res, next) {
 



var blobSvc = azure.createBlobService(process.env.AZURE_BLOB_NAME,process.env.AZURE_BLOB_ENDPOINT);
	var serviceBusService = azure.createServiceBusService(process.env.AZURE_SERVICE_ENDPOINT);
	console.log(serviceBusService);
	blobSvc.listBlobsSegmented('images', null, function(error, result, response){
		  if(!error){
		    // result contains the entries
		    console.log(result);
		    var len = result.entries.length;
		    for(var i=0;i<len;i++)
		    {
		    	console.log(result.entries[i].name)
		    }
		  }
		});


	var fs = require('fs');
	blobSvc.getBlobToStream('images', 'testimage', fs.createWriteStream('stacey.jpg'), function(error, result, response){
	  if(!error){
	   
	  }
	});
	 res.render('index', { title: 'Express' });
/* res.render('index', { title: 'Express' });
	serviceBusService.createSubscription('photos','AllMessages',function(error){
	    if(!error){
	        // subscription created
	        console.log("subscription created");
	    }else{
	    	console.log(error);
	    	console.log("error");
	    }
	});

*/


serviceBusService.receiveSubscriptionMessage('photos', 'AllMessages', { isPeekLock: true }, function(error, lockedMessage){
    if(!error){
        // Message received and locked
        console.log(lockedMessage);

        
    }else{
    	console.log(error);
    }
});


	 







});

module.exports = router;
