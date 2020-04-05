'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// Amazon Web Services config
var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
AWS.config.update({ endpoint: "https://dynamodb.us-east-1.amazonaws.com" });
var docClient = new AWS.DynamoDB.DocumentClient();

// POST: "/api/admin/login"
router.post("/login", function (req, res) {

    // Define DB item
    var credentials = {
        email: req.body.email,
        password: req.body.password
    };
    // DynamoDB Object
    var params = {
        TableName: "users",
        Key: {
            "email": credentials.email
        }
    };
    // GET the Object from the DataBase
    docClient.get(params, function (err, data) {
        // If the DB request returned an error
        if (err) {
            // Return the error to the user
            res.send(err);
        }
        else {
            if (data.Item.password === credentials.password) {
                // Response: (200 OK)
                var oneHour = 3600000;
                res.cookie('admin', data.Item.username, { maxAge: oneHour })
                    .status(200)
                    .send();
            }
            else {
                // Response: (401 Unauthorized)
                res.status(Unauthorized).send();
            }
        }
    });

});

// GET: "/api/admin/logout"
router.post("/login", function (req, res) {

    // Response: (200 OK)
    res.clearCookie('admin');
    res.status(200);
    res.send();

});

// Required (https://nodejs.org/api/modules.html#modules_module_exports)
module.exports = router;
