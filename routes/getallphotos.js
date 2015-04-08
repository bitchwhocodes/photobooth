var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();
var azure = require('azure');
var azures = require('azure-storage');

var qs = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {


 
var blobSvc = azure.createBlobService(process.env.AZURE_BLOB_NAME,process.env.AZURE_BLOB_ENDPOINT);
var containerName = 'images';
var hostName = 'https://nasaphotobooth.blob.core.windows.net';
var url = blobSvc.getUrl(containerName, 'testimage', null, hostName);
var urls = [];
var objToJSON ={};

blobSvc.listBlobsSegmented('images', null, function(error, result, response){
if(!error){
			    // result contains the entries
	var len = result.entries.length;
	for(var i=0;i<len;i++)
		{
			    	
			var uri = blobSvc.getUrl(containerName, result.entries[i].name, null, hostName);
			urls.push(uri);
		}


	}else{
			  	
	}

	
	objToJSON.result = urls;
	objToJSON.error = error;
	res.writeHead(200, {"Content-Type": "application/json"});
	res.write(JSON.stringify(objToJSON));

	});





});

module.exports = router;
