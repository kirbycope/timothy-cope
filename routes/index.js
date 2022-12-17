'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// GET: "/" ("home" page)
router.get('/', function (req, res) {
    var projectJSON = require('../data/projects.json');
    res.render('index', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Home",
        previewImg: "/public/img/preview-01.png",
        projects: projectJSON
    });
});

// GET: "/about" ("about" page)
router.get('/about', function (req, res) {
    res.render('about', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "About",
        previewImg: "/public/img/preview-01.png"
    });
});

// Required (https://nodejs.org/api/modules.html#modules_module_exports)
module.exports = router;
