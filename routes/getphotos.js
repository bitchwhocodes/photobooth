var express = require('express');
var router = express.Router();
var dotenv =require('dotenv').load();
var jf = require('jsonfile')
var util = require('util')

/* GET users listing. */
router.get('/', function(req, res, next) {

	var file = 'images.json';
	console.log(file);
	jf.readFile(file, function(err, obj) {
	  res.writeHead(200, {"Content-Type": "application/json"});
	  res.write(JSON.stringify(obj));
	})

});

module.exports = router;
