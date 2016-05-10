/* jslint node: true */
"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();
var expressSession = require('express-session');
var sharedsession = require('express-socket.io-session');
var port = 8080;
var request = require('request');
var dns = require('dns');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
var session = expressSession({
    secret: "MoveFromHereOrTheSecretWillBeOnGit",
    resave: true,
    saveUninitialized: true
  });
app.use(session);


var httpServer = http.Server(app);
var io = require('socket.io').listen(httpServer);
io.use(sharedsession(session));

var router = require('./routes/httpRoutes.js');
app.use('/API', router);
var socketRoutes = require('./routes/socket.js');
var adminRoutes = require('./routes/admin.js');
var assistantsRoutes = require('./routes/assistant.js');

io.on('connection', function (socket) {
  socketRoutes(socket, io);
  adminRoutes(socket, io);
  assistantsRoutes(socket, io);
});

var queueSystem = require('./model/queueSystem.js');
var utils = require('./utils.js');
var scheduleForEveryNight = utils.scheduleForEveryNight;
scheduleForEveryNight(function () {
  queueSystem.forQueue(function (queue) {
    queue.purgeQueue();
    queue.setMOTD("");
    queue.clearAssistantComments();
    queue.clearCompletions();
    //queue.purgeBookings();
  });
  //queueSystem.updateAllBookings();
});

function getHostname(ip, callback) {
  try {
    if (ip.indexOf("::ffff:") > -1) {
      ip = ip.substring(7);
    }

    dns.reverse(ip, function (err, hostnames) {
      if (err || !hostnames || !hostnames[0]) {
        callback("");
      } else{
        callback(hostnames[0]);
      }
    });
  } catch (err) {
    callback("");
  }
}

app.post('/API/search', function (req, res) {
  console.log("req:\n" + req.body.body);
  res.writeHead(200);
  res.write(JSON.stringify([{name: "Anton"},{name: "Siguash"}]));
  res.end();
});

app.get('/login', function(req, res) {
  console.log(req.query);
  req.session.user = {};
  if (req.query.target) {
    req.session.user.loginTarget = req.query.target;
  }
  else{
    req.session.user.loginTarget = "";
  }
  res.redirect('login2');
});

httpServer.listen(port, function () {
  console.log("server listening on port", port);
});
