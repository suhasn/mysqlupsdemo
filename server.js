"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var cfenv = require("cfenv");
var route = require('./routes/route');
const dbOp = require('./db/dbOp');

var app = express();

app.use(bodyParser.json());

app.use('/', route);

//var appEnv = cfenv.getAppEnv();
dbOp.initializeDB(function (error) {
	if (error) {
		console.error(`Error initializing database ${error.toString()}`);
		process.exit(-2);
	}
	var APP_PORT = process.env.PORT || 8080;
	app.listen(APP_PORT, () => {
	  console.log('Server listening on port: ', APP_PORT);
	});


// TODO: Add cleanup - https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html
});
