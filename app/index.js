/* jslint node: true */
"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var port = 8080;
var request = require('request');
var dns = require('dns');
var fs = require('fs');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var httpServer = http.Server(app);

var router = require('./routes/httpRoutes.js');
app.use('/API', router);

var interests = [];
function getInterests() {
  var content;
  fs.readFile('data/interests.txt', function read(err, data) {
      if (err) {
          throw err;
      }
      content = data.toString('ascii').split('\n');
      for (var i = 0; i < content.length-1; i++) {
        var temp = content[i].split(',');
        interests.push({id: temp[0], interest: temp.slice(1, temp.length)});
      }
  });
}
getInterests();

var personalities = [];
function getPersonalities() {
  var content;
  fs.readFile('data/personalities.txt', function read(err, data) {
      if (err) {
          throw err;
      }
      content = data.toString('ascii').split('\n');
      for (var i = 0; i < content.length-1; i++) {
        var temp = content[i].split(',');
        personalities.push({id: temp[0], personality: temp.slice(1, temp.length)});
      }
  });
}
getPersonalities();

var people = [];
function getPeople() {
  var content;
  fs.readFile('data/100000.txt', function read(err, data) {
      if (err) {
          throw err;
      }
      content = data.toString('ascii').split('\n');
      for (var i = 0; i < content.length-1; i++) {
        var temp = content[i].split(',');
        people.push({id: temp[0], gender: temp[1], name: temp[2], age: temp[3], hair: temp[4], eye: temp[5], height: temp[6], occupation: temp[7], body: temp[8], living: temp[9], education: temp[10]});
      }
  });
}
getPeople();

httpServer.listen(port, function () {
  console.log("server listening on port", port);
});

exports.interests = interests;
exports.personalities = personalities;
exports.people = people;
