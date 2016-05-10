/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var dns = require('dns');

router.get('/countmembers', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.write(JSON.stringify(300));
  res.end();
});

router.post('/search', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.write(JSON.stringify([{name: "Anton"},{name: "Siguash"}]));
  res.end();
});

router.post('/register', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.write(JSON.stringify([{name: "Anton"},{name: "Siguash"}]));
  res.end();
});

module.exports = router;
