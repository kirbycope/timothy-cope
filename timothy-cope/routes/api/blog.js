'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// Amazon Web Services config
var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
AWS.config.update({ endpoint: "https://dynamodb.us-east-1.amazonaws.com" });
var docClient = new AWS.DynamoDB.DocumentClient();

// #region API - All Blog Posts

// (R)ead all posts
// GET: "/api/blog/"
router.get("/", function (req, res) {
    // DynamoDB Object
    var params = {
        TableName: "blog",
        ProjectionExpression: "category, content, #d, description, slug, thumbnail, title",
        ExpressionAttributeNames: { '#d': 'date' }
    };
    // GET the Object from the DataBase
    docClient.scan(params, function (err, data) {
        // If the DB request returned an error
        if (err) {
            // Return the error to the user
            res.send(err);
        }
        else {
            // Response: (200 OK) Send the data items as the response body.
            res.status(200).send(data.Items);
        }
    });
});

// #endregion

// #region API - Single Blog Post

// (C)reate a post
// POST: "/api/blog/"
router.post("/", function (req, res) {
    // Check for 'admin' cookie
    if (req.cookies.admin) {
        // Define DB item
        var post = {
            slug: req.body.slug,
            title: req.body.title,
            category: req.body.category,
            date: req.date.configuration,
            description: req.body.description,
            thumbnail: req.body.thumbnail,
            content: req.body.content
        };
        // DynamoDB Object
        var params = {
            TableName: "blog",
            Item: post
        };
        // POST the Object to the DataBase
        docClient.put(params, function (err, data) {
            // If the DB request returned an error
            if (err) {
                // Return the error to the user
                res.send(err);
            }
            else {
                // Send the data
                res.status(200).send(data);
            }
        });
    }
    // The 'admin' cookie is not present
    else {
        // Return the error to the user
        res.status(401).send();
    }
});

// (R)ead a post
// GET: "/api/blog/:slug"
router.get("/:slug", function (req, res) {
    // Check for 'admin' cookie
    if (req.cookies.admin) {
        // DynamoDB Object
        var params = {
            TableName: "blog",
            Key: {
                "slug": req.params.slug
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
                // Response: (200 OK) Send the data as the response body.
                res.status(200).send(data.Item);
            }
        });
    }
    // The 'admin' cookie is not present
    else {
        // Return the error to the user
        res.status(401).send();
    }
});

// (U)pdate a post
// Right now the POST acutally does a PUT and inserts if new.

// (D)elete a post
// DELETE: "/api/blog/:slug"
router.delete("/:slug", function (req, res) {
    // Check for 'admin' cookie
    if (req.cookies.admin) {
        // DynamoDB Object
        var params = {
            TableName: "blog",
            Key: {
                "slug": req.params.slug
            }
        };
        // DELETE the Object from the DataBase
        docClient.delete(params, function (err, data) {
            // If the DB request returned an error
            if (err) {
                // Return the error to the user
                res.send(err);
            }
            else {
                // Response: (200 OK) Send the data as the response body.
                res.status(200).send(data);
            }
        });
    }
    // The 'admin' cookie is not present
    else {
        // Return the error to the user
        res.status(401).send();
    }
});

// #endregion

// Required (https://nodejs.org/api/modules.html#modules_module_exports)
module.exports = router;
