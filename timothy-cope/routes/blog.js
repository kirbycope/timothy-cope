'use strict';
// Load the external dependencies (from package.json)
var express = require('express');
var router = express.Router();

// GET: "/" ("blog" page)
router.get('/', function (req, res) {
    res.render('blog', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Blog",
        previewImg: "/public/img/preview-blog.png"
    });
});

// GET: "/:slug" ("blog post" page)
router.get('/:slug', function (req, res) {
    res.render('blog-post', {
        static_path: 'public',
        theme: process.env.THEME || 'default',
        flask_debug: process.env.FLASK_DEBUG || 'false',
        title: "Blog",
        previewImg: "/public/img/preview-blog.png"
    });
});

// Required (https://nodejs.org/api/modules.html#modules_module_exports)
module.exports = router;
