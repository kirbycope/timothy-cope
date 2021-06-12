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

// Blacklist words
var dirtyWords = [
    '?a='
    , '?author='
    , '?cat='
    , '?p='
    , '.avi'
    , '.bak'
    , '.cgi'
    , '.env'
    , '.git'
    , '.gz'
    , '.html'
    , '.local'
    , '.php'
    , '.production'
    , '.rar'
    , '.remote'
    , '.tar.gz'
    , '.tgz'
    , '.xgi'
    , '.zip'
    , '<php>'
    , '0bef'
    , 'ajax'
    , 'app'
    , 'boaform'
    , 'client_area'
    , 'config'
    , 'console'
    , 'cybersec'
    , 'dbadmin'
    , 'DialogHandler'
    , 'editor'
    , 'eval-stdin'
    , 'exec'
    , 'Execute'
    , 'execute'
    , 'function'
    , 'GponForm'
    , 'health'
    , 'jenkins'
    , 'invoker'
    , 'jsonws'
    , 'laravel'
    , 'manager'
    , 'MyAdmin'
    , 'mysql'
    , 'nginx_status'
    , 'old'
    , 'php-my-admin'
    , 'phpmy-admin'
    , 'phpMyAdmin'
    , 'phpmyadmin'
    , 'phpstorm'
    , 'phpunit'
    , 'PMA'
    , 'pma'
    , 'portal'
    , 'program'
    , 'ReportServer'
    , 'script'
    , 'security'
    , 'semalt'
    , 'setup'
    , 'shell'
    , 'solr'
    , 'sql'
    , 'sqlmanager'
    , 'stalker_portal'
    , 'Telerik'
    , 'tree'
    , 'tmp'
    , 'version'
    , 'wap-index'
    , 'webfig'
    , 'wp-admin'
    , 'wp-config'
    , 'wp-content'
    , 'wp-includes'
    , 'wp-login'
    , 'xmrlpc'
    , 'xxtest'
];

// Look for a "dirty" word in the Request URL
function dirtyWord(originalURL) {
    var result = false;
    for (var i = 0; i < dirtyWords.length; i++) {
        if (originalURL.indexOf(dirtyWords[i]) >= 0) {
            result = true;
        }
    }
    return result;
}

// Create log mechanism
var logger = function (req, res, next) {
    var originalURL = req.originalUrl;
    // If the URL requested isn't a public resource file...
    if ((originalURL.indexOf('/public/') === -1)
        && (originalURL.indexOf('/favicon') === -1)
        && (originalURL.indexOf('/robots') === -1)
        && (originalURL.indexOf('/humans') === -1)
        && (originalURL.indexOf('/ads') === -1)
    ) {
        // Stop lazy attacks
        if (dirtyWord(originalURL) === true) {
            setTimeout(() => next(), 31337);
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
