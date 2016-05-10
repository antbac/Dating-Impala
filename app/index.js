/* jslint node: true */
"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var port = 8080;
var request = require('request');
var dns = require('dns');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var httpServer = http.Server(app);

var router = require('./routes/httpRoutes.js');
app.use('/API', router);

httpServer.listen(port, function () {
  console.log("server listening on port", port);
});
