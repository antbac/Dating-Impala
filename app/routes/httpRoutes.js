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
  var ret = [];
  var person1 = {};
  person1.name = "Sarah";
  person1.gender = "Woman";
  person1.hair = "Blonde";
  person1.eye = "Blue";
  person1.ocupation = "Working";
  person1.body = "Standard";
  person1.age = 22;
  person1.living = "Stockholm";
  person1.education = "University";
  person1.money = "> 100.000";
  person1.interests = ["Skiing", "Makeup", "Dinners", "Sport", "History", "Japan"];
  person1.personalities = ["Funny", "Happy", "Lazy", "Reliable", "Good listener"];
  ret.push(person1);
  var person2 = {};
  person2.name = "Olivia";
  person2.gender = "Woman"; // Person 2
  person2.hair = "Black";
  person2.eye = "Brown";
  person2.ocupation = "Working";
  person2.body = "Standard";
  person2.age = 25;
  person2.living = "Stockholm";
  person2.education = "High school";
  person2.money = "> 100.000";
  person2.interests = ["Skiing", "Makeup", "Dinners", "Sport", "History"];
  person2.personalities = ["Funny", "Happy", "Lazy", "Reliable"];
  ret.push(person2);

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.write(JSON.stringify(ret));
  res.end();
});

router.post('/register', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.write(JSON.stringify([{name: "Anton", age: 22},{name: "Siguash", age: 23}]));
  res.end();
});

module.exports = router;
