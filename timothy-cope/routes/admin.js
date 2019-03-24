'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// GET: "/" ("admin portal sign-in" page)
router.get('/', function (req, res) {
    res.render('admin', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Admin Portal",
        previewImg: "/public/img/preview-01.png"
    });
});

// Required (https://nodejs.org/api/modules.html#modules_module_exports)
module.exports = router;
