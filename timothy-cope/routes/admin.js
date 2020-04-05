'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// GET: "/admin"
router.get('/', function (req, res) {
    if (req.cookies.admin) {
        res.redirect('/admin/dashboard');
    }
    else {
        res.redirect('/admin/signin');
    }
});

// GET: "/admin/signin"
router.get('/signin', function (req, res) {
    res.render('signin', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Admin Sign In",
        previewImg: "/public/img/preview-blog.png"
    });
});

// GET: "/admin/dashboard"
router.get('/dashboard', function (req, res) {
    if (req.cookies.admin) {
        res.render('dashboard', {
            static_path: 'public',
            theme: process.env.THEME || 'default',
            flask_debug: process.env.FLASK_DEBUG || 'false',
            title: "Admin Dashboard",
            previewImg: "/public/img/preview-blog.png"
        });
    }
    else {
        res.redirect('/admin/signin');
    }
});

// Required (https://nodejs.org/api/modules.html#modules_module_exports)
module.exports = router;
