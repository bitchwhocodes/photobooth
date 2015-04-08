var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();
var azure = require('azure');
var azures = require('azure-storage');

var qs = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {

	/*
 
var blobSvc = azure.createBlobService(process.env.AZURE_BLOB_NAME,process.env.AZURE_BLOB_ENDPOINT);


var containerName = 'images';
var hostName = 'https://nasaphotobooth.blob.core.windows.net';

var url = blobSvc.getUrl(containerName, 'testimage', null, hostName);


		var urls = [];
		blobSvc.listBlobsSegmented('images', null, function(error, result, response){
			  if(!error){
			    // result contains the entries
			    var len = result.entries.length;
			    for(var i=0;i<len;i++)
			    {
			    	console.log(result.entries[i].name)
			    	var uri = blobSvc.getUrl(containerName, result.entries[i].name, null, hostName);
			    	console.log(uri);

			    	urls.push(uri);
			    	console.log(urls);

			    }


res.render('index', { title: 'Express',urls:urls });
			  }else{
			  	console.log(error);
			  }
			});
/*
serviceBusService.receiveSubscriptionMessage('photos', 'AllMessages', { isPeekLock: true }, function(error, lockedMessage){
    if(!error){
        // Message received and locked
        console.log(lockedMessage);

        
    }else{
    	console.log(error);
    }

});

 */

   
    res.render('index', { title: 'Express',urls:urls });
console.log(urls);	 





});

module.exports = router;
