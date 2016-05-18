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
    if (index.people[i].gender == req.body.gender &&
        index.people[i].hair == req.body.hair &&
        index.people[i].eye == req.body.eye &&
        index.people[i].occupation == req.body.occupation &&
        index.people[i].body == req.body.body &&
        index.people[i].age >= req.body.age - 5 && req.body.age + 5 >= index.people[i].age &&
        index.people[i].living == req.body.living &&
        index.people[i].education == req.body.education) {
          var p = index.people[i];
          var score = 0;
          p.interests = [];
          for (var j = 0; j < index.interests.length; j++) {
            if (p.id == index.interests[j].id) { // Correct person
              for (var k = 0; k < index.interests[j].interest.length; k++) { // Loop thourgh persons interests
                for (var l = 0; l < req.body.interests.length; l++) { // Loop through wanted interests
                  if (index.interests[j].interest[k] == req.body.interests[l]) {
                    score++;
                    break;
                  }
                }
                p.interests.push(index.interests[j].interest[k]);
              }
            }
          }
          p.personalities = [];
          for (var m = 0; m < index.personalities.length; m++) {
            if (p.id == index.personalities[m].id) {
              for (var n = 0; n < index.personalities[m].personality.length; n++) {
                for (var o = 0; o < req.body.personalities.length; o++) {
                  if (index.personalities[m].personality[n] == req.body.personalities[o]) {
                    score++;
                    break;
                  }
                }
                p.personalities.push(index.personalities[m].personality[n]);
              }
            }
          }
          p.score = score;
          if (p.score > 0) {
            ret.push(p);
          }
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
