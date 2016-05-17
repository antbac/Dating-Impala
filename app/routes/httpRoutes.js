/* jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var dns = require('dns');
var index = require('../index.js');

router.get('/countmembers', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.write(JSON.stringify(index.people.length));
  res.end();
});

router.post('/search', function (req, res) {
  var ret = [];
  for (var i = 0; i < index.people.length; i++) {
    var score = 0;
    score = index.people[i].gender == req.body.gender ? score + 100 : score;
    score = index.people[i].hair == req.body.hair ? score + 1 : score;
    score = index.people[i].eye == req.body.eye ? score + 1 : score;
    score = index.people[i].occupation == req.body.occupation ? score + 1 : score;
    score = index.people[i].body == req.body.body ? score + 3 : score;
    score = index.people[i].age >= req.body.age - 5 && req.body.age + 5 >= index.people[i].age ? score + 10 : score;
    score = index.people[i].living == req.body.living ? score + 2 : score;
    score = index.people[i].education == req.body.education ? score + 1 : score;
    // Max score = 119
    // Correct gender >= 100
    // Correct age && gender >= 110
    if (score >= 110) {
      var p = index.people[i];
      p.interests = [];
      for (var j = 0; j < index.interests.length; j++) {
        if (p.id == index.interests[j].id) {
          for (var k = 0; k < index.interests[j].interest.length; k++) {
            p.interests.push(index.interests[j].interest[k]);
          }
        }
      }
      p.personalities = [];
      for (var l = 0; l < index.personalities.length; l++) {
        if (p.id == index.personalities[l].id) {
          for (var m = 0; m < index.personalities[l].personality.length; m++) {
            p.personalities.push(index.personalities[l].personality[m]);
          }
        }
      }
      p.score = score;
      ret.push(p);
    }
  }

  ret.sort(function(a, b) {
    return b.score - a.score;
  });

  if (ret.length > 100) {
    ret = ret.splice(0, 100);
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.write(JSON.stringify(ret));
  res.end();
});

router.post('/register', function (req, res) {
  var id = index.people.length;
  var p = {};
  p.id = id;
  p.name = req.body.name;
  p.gender = req.body.gender;
  p.hair = req.body.hair;
  p.eye = req.body.eye;
  p.occupation = req.body.occupation;
  p.body = req.body.body;
  p.age = req.body.age;
  p.living = req.body.living;
  p.education = req.body.education;

  index.people.push(p);
  index.interests.push({id: id, interest: req.body.interests});
  index.personalities.push({id: id, personality: req.body.personalities});

  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.end();
});

module.exports = router;
