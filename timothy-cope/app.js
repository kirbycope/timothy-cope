'use strict';
// Load the external dependencies (from package.json)
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Load the internal dependencies (.js files)
var index = require('./routes/index');
var adminApi = require('./routes/api/admin');
var admin = require('./routes/admin');
var blogApi = require('./routes/api/blog');
var blog = require('./routes/blog');
var reviewsApi = require('./routes/api/reviews');
var reviews = require('./routes/reviews');

// Amazon Web Services config
var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');
AWS.config.update({ endpoint: "https://dynamodb.us-east-1.amazonaws.com" });
var docClient = new AWS.DynamoDB.DocumentClient();
var tableName = "traffic";

// Create an Express application
var app = express();

function dirtyWord(originalURL) {
    if ((originalURL.indexOf('.anti-sec') >= 0)
        || (originalURL.indexOf('.cgi') >= 0)
        || (originalURL.indexOf('.env') >= 0)
        || (originalURL.indexOf('.git') >= 0)
        || (originalURL.indexOf('.html') >= 0)
        || (originalURL.indexOf('.php') >= 0)
        || (originalURL.indexOf('.tar.gz') >= 0)
        || (originalURL.indexOf('.xgi') >= 0)
        || (originalURL.indexOf('.zip') >= 0)
        || (originalURL.indexOf('MyAdmin') >= 0)
        || (originalURL.indexOf('phpMyAdmin') >= 0)
        || (originalURL.indexOf('php-my-admin') >= 0)
        || (originalURL.indexOf('phpmy-admin') >= 0)
        || (originalURL.indexOf('phpmyadmin') >= 0)
        || (originalURL.indexOf('phpstorm') >= 0)
        || (originalURL.indexOf('phpunit') >= 0)
        || (originalURL.indexOf('<php>') >= 0)
        || (originalURL.indexOf('eval-stdin') >= 0)
        || (originalURL.indexOf('xmrlpc') >= 0)
        || (originalURL.indexOf('sql') >= 0)
        || (originalURL.indexOf('sqlmanager') >= 0)
        || (originalURL.indexOf('mysql') >= 0)
        || (originalURL.indexOf('solr') >= 0)
        || (originalURL.indexOf('dbadmin') >= 0)
        || (originalURL.indexOf('wp-admin') >= 0)
        || (originalURL.indexOf('wp-content') >= 0)
        || (originalURL.indexOf('wp-config') >= 0)
        || (originalURL.indexOf('wp-includes') >= 0)
        || (originalURL.indexOf('wp-login') >= 0)
        || (originalURL.indexOf('?a=') >= 0)
        || (originalURL.indexOf('?author=') >= 0)
        || (originalURL.indexOf('?cat=') >= 0)
        || (originalURL.indexOf('?p=') >= 0)
        || (originalURL.indexOf('jsonws') >= 0)
        || (originalURL.indexOf('boaform') >= 0)
        || (originalURL.indexOf('laravel') >= 0)
        || (originalURL.indexOf('nginx_status') >= 0)
        || (originalURL.indexOf('manager') >= 0)
        || (originalURL.indexOf('Execute') >= 0)
        || (originalURL.indexOf('execute') >= 0)
        || (originalURL.indexOf('stalker_portal') >= 0)
        || (originalURL.indexOf('client_area') >= 0)
        || (originalURL.indexOf('PMA') >= 0)
        || (originalURL.indexOf('pma') >= 0)
        || (originalURL.indexOf('old') >= 0)
        || (originalURL.indexOf('console') >= 0)
        || (originalURL.indexOf('shell') >= 0)
        || (originalURL.indexOf('jenkins') >= 0)
        || (originalURL.indexOf('program') >= 0)
        || (originalURL.indexOf('xxtest') >= 0)
        || (originalURL.indexOf('editor') >= 0)
        || (originalURL.indexOf('GponForm') >= 0)
        || (originalURL.indexOf('app') >= 0)
        || (originalURL.indexOf('portal') >= 0)
        || (originalURL.indexOf('script') >= 0)
        || (originalURL.indexOf('setup') >= 0)
        || (originalURL.indexOf('ajax') >= 0)
        || (originalURL.indexOf('function') >= 0)
        || (originalURL.indexOf('cybersec') >= 0)
        || (originalURL.indexOf('tmp') >= 0)
        || (originalURL.indexOf('config') >= 0)
        || (originalURL.indexOf('security') >= 0)
    ) { return true; }
    return false;
}

// Create log mechanism
var logger = function (req, res, next) {
    var originalURL = req.originalUrl;
    // If the URL requested isn't a public resource file...
    if ((originalURL.indexOf('/public/') === -1)
        && (originalURL.indexOf('/favicon') === -1)
        && (originalURL.indexOf('/robots') === -1)
    )
    {
        // Stop attack vectors
        if (dirtyWord(originalURL) === true) {
            setTimeout(() => next(), 42069);
        }
        else {
            console.log();
            // Define DB item
            var item = {
                date: new Date().getTime(),
                path: originalURL
            };
            // DynamoDB Object
            var params = {
                TableName: tableName,
                Item: item
            };
            // POST the Object to the DataBase
            docClient.put(params, function (err, data) {
                // If the DB request returned an error
                if (err) {
                    // Return the error to the user
                    console.log(err);
                    next();
                }
                else {
                    next();
                }
            });
        }
    }
    else {
        next();
    }
}
app.use(logger);

// Set the View Engine for the Express application
app.set('view engine', 'ejs');
app.use('/views', express.static(path.resolve(__dirname, 'views')));
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup web app routes (controllers)
app.use('/', index);
app.use('/api/admin', adminApi);
app.use('/admin', admin);
app.use('/api/blog', blogApi);
app.use('/blog', blog);
app.use('/reviews', reviews);
app.use('/api/reviews', reviewsApi);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
