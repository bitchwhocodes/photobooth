var dotenv =require('dotenv').load();
var express = require('express');
var router = express.Router();
var azure = require('azure');
var azures = require('azure-storage');

var qs = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {





var urls=[];
   
    res.render('index', { title: 'Express',urls:urls });
console.log(urls);	 





});

module.exports = router;
