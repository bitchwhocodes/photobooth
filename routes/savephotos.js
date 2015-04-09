var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();

var jf = require('jsonfile')
var util = require('util')

var azure = require('azure');
var azures = require('azure-storage');
var qs = require('querystring');
/* GET users listing. */


exports.savephoto = function(req,res,next){
	//var fs = require('fs');
	//var imageToSave  = req.body.image_save;
	 var sharedAccessPolicy = {
                    AccessPolicy: {
                        Permissions: azure.Constants.BlobConstants.SharedAccessPermissions.WRITE,
                        Expiry: new Date(new Date().getTime() + 5 * 60 * 1000)
                    }
                };
    var sasQueryUrl = 
                blobSvc.generateSharedAccessSignature('images', 
                'testimage', sharedAccessPolicy);

   var sasQueryString = qs.stringify(sasQueryUrl.queryString);
   console.log(sasQueryString);
    var imageUri = sasQueryUrl.baseUrl + sasQueryUrl.path;
    console.log(imageUri);
    /*
	var fileName = 'images/'+imageToSave+'jpg';
	blobSvc.getBlobToStream('images', 'testimage', fs.createWriteStream('stacey.jpg'), function(error, result, response){
		if(!error){
			// need to read the file then write it back. 
			   // need to return that it has been saved. 
		}
	});
*/
response.write(imageUri);

}


