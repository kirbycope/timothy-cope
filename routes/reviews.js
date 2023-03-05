'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// GET: "/review"
router.get('/', function (req, res) {
    res.render('reviews', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Reviews",
        previewImg: "/public/img/preview-reviews.png"
    });
});

// Required (https://nodejs.org/api/modules.html#modules_module_exports)
module.exports = router;
