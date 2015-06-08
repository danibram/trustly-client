var express = require("express"),
    https = require("https"),
    bodyParser = require('body-parser'),
    util = require("util"),
    fs = require("fs"),
    path = require("path"),
    app = express(),
    Client    = require('../lib/index.js'),
    config    = require('./config.js');

var app = express()

app.use(bodyParser.raw());
app.use(bodyParser.json());

/* serves main page */
app.post("/notification", function(req, res) {
    console.log("- Notification is comming. √");
    var tClient = new Client (config);
    tClient.init()
    .then(function () {
        return tClient.handleNotification(req.body);
    })
    .then(function (data) {
        console.log(util.inspect(data, false,20,true));

        res.send("OK");
    })
    .fail(function (error) {
        console.log('_Error');
        console.log(util.inspect(error, false,20,true));
    });

});

app.get("/success", function(req, res) {
    console.log("- Success payment was arrive.");
    res.send("OK");
});

/* serves all the static files */
app.get("/fail", function(req, res){
    console.log("- Failed payment was arrive.");
    res.send("OK");
});

var port = process.env.PORT || 4343;
app.listen(port, function() {
    console.log("**********************************************");
    console.log("* Trustly Server Tester                      *");
    console.log("*         >> Listening on 127.0.0.1:"+port+"     *");
    console.log("**********************************************");
});
